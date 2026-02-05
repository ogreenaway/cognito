import { Course } from "../../../types/course";
import CourseContent from "./CourseContent";
import CourseHeader from "./CourseHeader";
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
        <CourseHeader
          subjectName={course.subjectName}
          examBoardCode={course.examBoardCode.toUpperCase()}
          levelCode={course.levelCode.toUpperCase()}
          courseCode={course.code}
        />
        <div className="alert alert-info mt-5 text-center" role="alert">
          {topicsLoadingState || "Loading..."}
        </div>
      </Page>
    );
  }

  if (!topicsWithCategories) {
    return (
      <Page>
        <CourseHeader
          subjectName={course.subjectName}
          examBoardCode={course.examBoardCode.toUpperCase()}
          levelCode={course.levelCode.toUpperCase()}
          courseCode={course.code}
        />
        <div className="alert alert-danger" role="alert">
          Failed to load course data. Please try again later.
        </div>
      </Page>
    );
  }

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
        topicsWithCategories={topicsWithCategories}
      />
    </Page>
  );
};

export default CoursePageCreateCategories;
