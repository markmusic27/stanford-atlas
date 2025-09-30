// Minimal, strict YAML guidance for the model
export const YAML_FORMAT_INSTRUCTIONS = `
Output strictly as YAML. No JSON, no code fences, no prose.

Rules:
- Top-level key: blocks
- Indentation: 2 spaces
- Emit blocks incrementally (one by one)
- Allowed blocks: markdown | course-card | course-list

Examples:
blocks:
  - type: markdown
    data: |
      <markdown text>

  - type: course-card
    data:
      courseId: number
      classId: number

  - type: course-list
    data:
      - courseId: number
        classId: number
`;

// Helper: count leading spaces
const countLeadingSpaces = (s: string) => {
  let i = 0;
  while (i < s.length && s[i] === " ") i++;
  return i;
};

// Helper: parse integer
const parseInteger = (value: string): number | null => {
  const m = value.trim().match(/^[-+]?[0-9]+$/);
  if (!m) return null;
  const n = Number(value.trim());
  return Number.isFinite(n) ? n : null;
};

// Parse a minimal YAML subset for our specific schema; returns only fully parsed blocks
export const parseBlocksFromYamlish = (yamlText: string): unknown[] => {
  const lines = yamlText.split(/\r?\n/);
  let i = 0;
  // Seek top-level 'blocks:'
  while (i < lines.length) {
    const curr = lines[i] ?? "";
    if (curr.trim() === "") {
      i++;
      continue;
    }
    break;
  }
  if (i >= lines.length) return [];
  const firstLine = lines[i] ?? "";
  if (firstLine.trim() !== "blocks:") return [];
  i++;

  const blocks: unknown[] = [];

  const isTypeLine = (line: string) =>
    /^(\s*)-\s*type:\s*(markdown|course-card|course-list)\s*$/.test(line);
  const getTypeFromLine = (
    line: string,
  ): "markdown" | "course-card" | "course-list" | null => {
    const m = line.match(
      /^(\s*)-\s*type:\s*(markdown|course-card|course-list)\s*$/,
    );
    return m ? (m[2] as any) : null;
  };

  while (i < lines.length) {
    const line = lines[i] ?? "";
    if (!isTypeLine(line)) {
      // Skip unrelated or incomplete content until next type line
      i++;
      continue;
    }

    const typeIndent = countLeadingSpaces(line);
    const type = getTypeFromLine(line)!;
    i++;

    // Expect data line
    if (i >= lines.length) break; // incomplete
    const dataLine = lines[i] ?? "";
    const dataIndent = countLeadingSpaces(dataLine);
    const dataKey = dataLine.trim();

    // Must be indented 2 spaces more than type line
    if (dataIndent !== typeIndent + 2 || !dataKey.startsWith("data:")) {
      // malformed/incomplete; try to resync at next block
      continue;
    }

    if (type === "markdown") {
      // Expect 'data: |' then block scalar lines indented more
      if (dataKey !== "data: |") {
        // not complete yet
        i++;
        continue;
      }
      i++;
      const contentLines: string[] = [];
      while (i < lines.length) {
        const l = lines[i] ?? "";
        const indent = countLeadingSpaces(l);
        // Markdown content lines must be indented at least 4 spaces beyond 'data: |'
        if (indent >= dataIndent + 2) {
          contentLines.push(l.slice(dataIndent + 2));
          i++;
        } else {
          break;
        }
      }
      if (contentLines.length === 0) {
        // Incomplete block scalar; skip until more arrives
        continue;
      }
      const data = contentLines.join("\n").replace(/[\s\n]+$/g, "");
      blocks.push({ type: "markdown", data });
      continue;
    }

    if (type === "course-card") {
      // Expect 'data:' then 2 fields indented more
      if (dataKey !== "data:") {
        i++;
        continue;
      }
      i++;
      let courseId: number | null = null;
      let classId: number | null = null;
      while (i < lines.length) {
        const l = lines[i] ?? "";
        const indent = countLeadingSpaces(l);
        if (indent < dataIndent + 2 || isTypeLine(l)) break;
        const trimmed = l.trim();
        const kv = trimmed.match(/^(courseId|classId)\s*:\s*(.+)$/);
        if (kv) {
          const key = kv[1];
          const valRaw = kv[2] ?? "";
          const num = parseInteger(valRaw);
          if (num !== null) {
            if (key === "courseId") courseId = num;
            if (key === "classId") classId = num;
          }
        }
        i++;
      }
      if (courseId !== null && classId !== null) {
        blocks.push({ type: "course-card", data: { courseId, classId } });
      }
      continue;
    }

    if (type === "course-list") {
      // Expect 'data:' then a list of items
      if (dataKey !== "data:") {
        i++;
        continue;
      }
      i++;
      const items: Array<{ courseId: number; classId: number }> = [];
      while (i < lines.length) {
        const l = lines[i] ?? "";
        if (isTypeLine(l)) break; // next block
        const indent = countLeadingSpaces(l);
        if (indent < dataIndent + 2) break; // out of list scope

        // Two supported forms:
        // 1) inline:   - courseId: 105750, classId: 7511
        // 2) nested:
        //      -
        //        courseId: 105750
        //        classId: 7511

        const inline = l.match(
          /^\s*-\s*courseId\s*:\s*([0-9]+)\s*,\s*classId\s*:\s*([0-9]+)\s*$/,
        );
        if (inline) {
          const ciParsed = parseInteger(inline[1] ?? "");
          const clParsed = parseInteger(inline[2] ?? "");
          if (ciParsed == null || clParsed == null) {
            i++;
            continue;
          }
          const ci = ciParsed;
          const cl = clParsed;
          items.push({ courseId: ci, classId: cl });
          i++;
          continue;
        }

        const itemStart = l.match(/^\s*-\s*$/);
        if (itemStart) {
          // Parse nested fields indented further
          i++;
          let courseId: number | null = null;
          let classId: number | null = null;
          while (i < lines.length) {
            const li = lines[i] ?? "";
            const ind = countLeadingSpaces(li);
            if (ind < indent + 2 || /^\s*-\s*/.test(li)) break;
            const kv = li.trim().match(/^(courseId|classId)\s*:\s*(.+)$/);
            if (kv) {
              const key = kv[1];
              const raw = kv[2] ?? "";
              const num = parseInteger(raw);
              if (num !== null) {
                if (key === "courseId") courseId = num;
                if (key === "classId") classId = num;
              }
            }
            i++;
          }
          if (courseId !== null && classId !== null) {
            items.push({ courseId, classId });
          }
          continue;
        }

        // Unrecognized line in list; advance
        i++;
      }
      if (items.length > 0) {
        blocks.push({ type: "course-list", data: items });
      }
      continue;
    }
  }

  return blocks;
};
