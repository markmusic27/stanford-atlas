import { useCallback, useEffect, useState } from "react";
import type { CourseProps } from "~/components/ui/course-grid/components/CourseCard";
import type { CourseCardData } from "~/lib/courseSchema";

const ENDPOINT = "https://course-api-280200773515.us-west1.run.app/";

type IdleState = { state: "idle"; data: null; error: null };
type LoadingState = { state: "loading"; data: null; error: null };
type OkState<T> = { state: "ok"; data: T; error: null };
type ErrorState = { state: "error"; data: null; error: string };

type RequestState<T> = IdleState | LoadingState | OkState<T> | ErrorState;

const useCourseServer = async ({ courseId, classId }: CourseProps) => {
  const [result, setRestult] = useState<RequestState<CourseCardData>>({
    state: "idle",
    data: null,
    error: null,
  });

  const refetch = useCallback(async () => {}, [courseId, classId]);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return {
    ...result,
    refetch,
  };
};

export default useCourseServer;
