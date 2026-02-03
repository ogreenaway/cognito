import { useParams } from "react-router";

export function useCourseID(): string | undefined {
  const { courseId } = useParams<{ courseId: string }>();
  return courseId;
}
