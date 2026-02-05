import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import ExamCode from "../../../components/ExamCode/ExamCode";
import HR from "../../../components/HR/HR";
import PageTitle from "../../../components/PageTitle/PageTitle";
import React from "react";

interface CourseHeaderProps {
  subjectName: string;
  examBoardCode: string;
  levelCode: string;
  courseCode: string;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  subjectName,
  examBoardCode,
  levelCode,
  courseCode,
}) => {
  return (
    <>
      <Breadcrumbs
        subject={subjectName}
        examBoard={examBoardCode}
        level={levelCode}
      />
      <PageTitle
        title={`${examBoardCode} ${levelCode} ${subjectName}`}
        subtitle="Revision Notes"
      />
      <ExamCode code={courseCode} />
      <HR />
    </>
  );
};

export default CourseHeader;
