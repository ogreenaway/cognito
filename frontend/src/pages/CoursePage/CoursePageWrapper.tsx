import {
  getCachedCategories,
  getCachedVersion,
} from "../../utils/localStorage";

import CoursePage from "./components/CoursePage";
import CoursePageCreateCategories from "./components/CoursePageCreateCategories";
import Page from "../../components/Page/Page";
import React from "react";
import { useCourseCode } from "../../hooks/useCourseCode";
import { useCourseData } from "../../hooks/useCourseData";

const CoursePageWrapper: React.FC = () => {
  const courseCode = useCourseCode();
  const { course, loading: courseLoading, error } = useCourseData(courseCode);

  if (courseLoading) {
    return (
      <Page>
        <div className="d-flex justify-content-center align-items-center py-5">
          "Loading..."
        </div>
      </Page>
    );
  }

  if (error || !course) {
    return (
      <Page>
        <div className="alert alert-danger" role="alert">
          Failed to load course data. Please try again later.
        </div>
      </Page>
    );
  }

  const cachedVersion = getCachedVersion(courseCode);
  const cachedCategories = getCachedCategories(courseCode);

  if (
    cachedVersion === course.version &&
    cachedCategories &&
    cachedCategories.length > 0
  ) {
    return (
      <CoursePage course={course} topicsWithCategories={cachedCategories} />
    );
  }

  return <CoursePageCreateCategories course={course} />;
};

export default CoursePageWrapper;
