import { COURSE_QUERY } from "../api/courseQuery";
import { CourseAPIResponse } from "../types/course";
import { setCachedVersion } from "../utils/localStorage";
import { useEffect } from "react";
import { useQuery } from "@apollo/client/react";

export function useCourseData(courseCode: string) {
  const { data, loading, error } = useQuery<CourseAPIResponse>(COURSE_QUERY, {
    variables: { code: courseCode },
  });

  useEffect(() => {
    if (data?.course) {
      setCachedVersion(courseCode, data.course.version);
    }
  }, [data?.course, courseCode]);

  return {
    course: data?.course,
    loading,
    error,
  };
}
