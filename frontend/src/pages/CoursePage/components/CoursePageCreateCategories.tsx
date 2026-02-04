import { Course } from "../../../types/course";
import CoursePage from "./CoursePage";
import Page from "../../../components/Page/Page";
import React from "react";
import { useTopicData } from "../../../hooks/useTopicData";

interface CoursePageCreateCategoriesProps {
  course: Course;
}

const CoursePageCreateCategories: React.FC<CoursePageCreateCategoriesProps> = ({
  course,
}) => {
  const { topicsWithCategories, loadingState: topicsLoadingState } =
    useTopicData(course.code);

  if (topicsLoadingState) {
    return (
      <Page>
        <div className="d-flex justify-content-center align-items-center py-5">
          {topicsLoadingState || "Loading..."}
        </div>
      </Page>
    );
  }

  if (!topicsWithCategories) {
    return (
      <Page>
        <div className="alert alert-danger" role="alert">
          Failed to load course data. Please try again later.
        </div>
      </Page>
    );
  }

  return (
    <CoursePage course={course} topicsWithCategories={topicsWithCategories} />
  );
};

export default CoursePageCreateCategories;
