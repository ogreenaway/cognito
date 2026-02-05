import {
  getCachedCategories,
  getCachedVersion,
} from "../../utils/localStorage";

import CourseContent from "./components/CourseContent";
import CourseHeader from "./components/CourseHeader";
import CoursePageCreateCategories from "./components/CoursePageCreateCategories";
import Page from "../../components/Page/Page";
import React from "react";
import { useCourseCode } from "../../hooks/useCourseCode";
import { useCourseData } from "../../hooks/useCourseData";

const CoursePageWrapper: React.FC = () => {
  const courseCode = useCourseCode();
  const { course, loading: courseLoading, error } = useCourseData(courseCode);

  if (courseLoading) {
    return null;
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
      <Page>
        <CourseHeader
          subjectName={course.subjectName}
          examBoardCode={course.examBoardCode.toUpperCase()}
          levelCode={course.levelCode.toUpperCase()}
          courseCode={course.code}
        />
        <CourseContent
          courseCode={course.code}
          topicsWithCategories={cachedCategories}
        />
      </Page>
    );
  }

  return <CoursePageCreateCategories course={course} />;
};

export default CoursePageWrapper;
