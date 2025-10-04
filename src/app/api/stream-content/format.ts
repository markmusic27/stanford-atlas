import type { Block } from "./schemas";

// Types for better type safety
interface CourseData {
  courseId: number;
  classId: number;
}

interface ParserState {
  blocks: Block[];
  position: number;
  markdownBuffer: string;
}

// Constants
const BLOCK_TAGS = {
  COURSE_CARD: "course-card",
  COURSE_LIST: "course-list",
} as const;

const CODE_BLOCK_FENCE = "```";

// Validation functions
const validateCourseData = (course: unknown): course is CourseData => {
  return (
    typeof course === "object" &&
    course !== null &&
    typeof (course as CourseData).courseId === "number" &&
    typeof (course as CourseData).classId === "number"
  );
};

const validateCourseArray = (data: unknown): CourseData[] => {
  if (!Array.isArray(data)) {
    throw new Error("course-list data must be an array");
  }

  for (const course of data) {
    if (!validateCourseData(course)) {
      throw new Error(
        `Invalid course data: courseId and classId must be numbers, got courseId: ${typeof (
          course as any
        )?.courseId}, classId: ${typeof (course as any)?.classId}`,
      );
    }
  }

  return data;
};

const validateCourseObject = (data: unknown): CourseData => {
  if (!validateCourseData(data)) {
    throw new Error(
      `Invalid course data: courseId and classId must be numbers, got courseId: ${typeof (
        data as any
      )?.courseId}, classId: ${typeof (data as any)?.classId}`,
    );
  }
  return data;
};

// JSON parsing utilities
const cleanJsonString = (jsonString: string): string => {
  return jsonString
    .replace(/\/\/.*$/gm, "") // Remove comments
    .replace(/,\s*}/g, "}") // Remove trailing commas before }
    .replace(/,\s*]/g, "]"); // Remove trailing commas before ]
};

const parseJsonFromLines = (lines: string[]): string => {
  let jsonContent = "";
  let inJsonBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith("[")) {
      inJsonBlock = true;
    }
    if (inJsonBlock) {
      jsonContent += line + "\n";
    }
    if (line.trim().endsWith("]")) {
      break;
    }
  }

  return jsonContent.trim();
};

// Markdown cleaning utilities
const cleanMarkdownContent = (content: string): string => {
  return content
    .trim()
    .replace(/\n```[\s]*$/, "") // Remove trailing code block fence
    .replace(/^```[^\n]*\n?/, "") // Remove leading code block fence
    .replace(/```[\s]*$/, ""); // Remove standalone backticks at end
};

const removeBlockTagFromMarkdown = (content: string, tag: string): string => {
  return content
    .replace(/```[\s]*$/, "")
    .replace(new RegExp(`\\\`\\\`\\\`${tag}[\\s]*$`, ""), "");
};

// Main parsing function
const formatMarkdown = (buffer: string): Block[] => {
  const state: ParserState = {
    blocks: [],
    position: 0,
    markdownBuffer: "",
  };

  const saveMarkdownBlock = (content: string) => {
    const cleanedContent = cleanMarkdownContent(content);
    if (cleanedContent) {
      state.blocks.push({
        type: "markdown",
        data: cleanedContent,
      });
    }
    state.markdownBuffer = "";
  };

  const parseSpecialBlock = (
    tag: string,
    blockType: "course-list" | "course-card",
  ): void => {
    // Clean up accumulated markdown content
    const cleanedMarkdown = removeBlockTagFromMarkdown(
      state.markdownBuffer,
      tag,
    );
    saveMarkdownBlock(cleanedMarkdown);

    // Consume the special block content
    let blockContent = "";
    let shouldContinue = true;

    while (shouldContinue && state.position < buffer.length) {
      blockContent += buffer[state.position];
      if (
        buffer.substring(state.position + 1, state.position + 4) ===
        CODE_BLOCK_FENCE
      ) {
        shouldContinue = false;
      }
      state.position++;
    }

    try {
      if (blockType === "course-list") {
        const lines = blockContent.split("\n");
        const jsonContent = parseJsonFromLines(lines);

        if (!jsonContent) {
          throw new Error("No valid JSON array found in course-list block");
        }

        const cleanedJson = cleanJsonString(jsonContent);
        const courseData = JSON.parse(cleanedJson);
        const validatedData = validateCourseArray(courseData);

        state.blocks.push({
          type: "course-list",
          data: validatedData,
        });
      } else if (blockType === "course-card") {
        const jsonMatch = blockContent.match(/\{[\s\S]*?\}/);
        if (!jsonMatch) {
          throw new Error("No valid JSON object found in course-card block");
        }

        const courseData = JSON.parse(jsonMatch[0]);
        const validatedData = validateCourseObject(courseData);

        state.blocks.push({
          type: "course-card",
          data: validatedData,
        });
      }
    } catch (error) {
      throw new Error(
        `Failed to parse ${blockType} block: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    }
  };

  // Main parsing loop
  while (state.position < buffer.length) {
    // Check for course-list block
    if (
      state.position >= BLOCK_TAGS.COURSE_LIST.length &&
      buffer.substring(
        state.position - BLOCK_TAGS.COURSE_LIST.length,
        state.position,
      ) === BLOCK_TAGS.COURSE_LIST
    ) {
      parseSpecialBlock(BLOCK_TAGS.COURSE_LIST, "course-list");
    }
    // Check for course-card block
    else if (
      state.position >= BLOCK_TAGS.COURSE_CARD.length &&
      buffer.substring(
        state.position - BLOCK_TAGS.COURSE_CARD.length,
        state.position,
      ) === BLOCK_TAGS.COURSE_CARD
    ) {
      parseSpecialBlock(BLOCK_TAGS.COURSE_CARD, "course-card");
    }
    // Regular character processing
    else {
      state.markdownBuffer += buffer[state.position];
      state.position++;
    }
  }

  // Save any remaining markdown content
  if (state.markdownBuffer.length > 0) {
    saveMarkdownBlock(state.markdownBuffer);
  }

  return state.blocks;
};
