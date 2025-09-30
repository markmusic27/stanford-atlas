import { useCallback, useEffect, useState } from "react";
import type { CourseProps } from "~/components/ui/course-grid/components/CourseCard";
import {
  type ApiCourseResponse,
  type CourseCardData,
} from "~/lib/courseSchema";
import formatCourseData from "~/lib/formatCourse";

const ENDPOINT = "/api/course";

type IdleState = { state: "idle"; data: null; error: null };
type LoadingState = { state: "loading"; data: null; error: null };
type OkState<T> = { state: "ok"; data: T; error: null };
type ErrorState = { state: "error"; data: null; error: string };

type RequestState<T> = IdleState | LoadingState | OkState<T> | ErrorState;

const useCourseServer = ({ courseId, classId }: CourseProps) => {
  const [result, setResult] = useState<RequestState<CourseCardData>>({
    state: "idle",
    data: null,
    error: null,
  });

  const refetch = useCallback(async () => {
    setResult({ state: "loading", data: null, error: null });

    try {
      // Construct endpoint to internal proxy (avoids CORS)
      const url = new URL(ENDPOINT, window.location.origin);
      url.searchParams.set("id", String(courseId));
      url.searchParams.set("class_id", String(classId));

      // Make request (no auth header needed; server route adds it)
      const res = await fetch(url.toString(), {
        method: "GET",
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
      }

      const data = (await res.json()) as ApiCourseResponse;
      console.log(data.message);

      const formatted = formatCourseData(data);

      setResult({ state: "ok", data: formatted, error: null });
    } catch (err) {
      console.log(err);
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setResult({ state: "error", data: null, error: message });
    }
  }, [courseId, classId]);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return {
    ...result,
    refetch,
  };
};

export default useCourseServer;
