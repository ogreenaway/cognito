import { useParams } from "react-router";

export function useCourseID(): string {
  const { courseId } = useParams<{ courseId: string }>();
  if (courseId === undefined) {
    throw new Error("Course ID is not found in the URL");
  }
  return courseId;
}
