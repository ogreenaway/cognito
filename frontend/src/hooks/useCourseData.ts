import { COURSE_QUERY } from "../api/courseQuery";
import { CourseAPIResponse } from "../types/course";
import { useQuery } from "@apollo/client/react";

export function useCourseData(courseCode: string) {
  const { data, loading, error } = useQuery<CourseAPIResponse>(COURSE_QUERY, {
    variables: { code: courseCode },
  });

  return {
    course: data?.course,
    loading,
    error,
  };
}
