import "./CoursePage.scss";

import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import Card from "../../../components/Card/Card";
import CardGrid from "../../../components/CardGrid/CardGrid";
import CategoryAccordion from "../../../components/CategoryAccordion/CategoryAccordion";
import { Course } from "../../../types/course";
import ExamCode from "../../../components/ExamCode/ExamCode";
import FavouriteButton from "../../../components/FavouriteButton/FavouriteButton";
import HR from "../../../components/HR/HR";
import Page from "../../../components/Page/Page";
import PageTitle from "../../../components/PageTitle/PageTitle";
import React from "react";
import SubtopicLink from "../../../components/SubtopicLink/SubtopicLink";
import { Topic } from "../../../types/topic";

interface CoursePageProps {
  course: Course;
  topicsWithCategories: Topic[];
}

const CoursePage: React.FC<CoursePageProps> = ({
  course,
  topicsWithCategories,
}) => {
  const examBoardCode = course.examBoardCode.toUpperCase();
  const levelCode = course.levelCode.toUpperCase();

  return (
    <Page>
      <Breadcrumbs
        subject={course.subjectName}
        examBoard={examBoardCode}
        level={levelCode}
      />
      <PageTitle
        title={`${examBoardCode} ${levelCode} ${course.subjectName}`}
        subtitle="Revision Notes"
      />
      <ExamCode code={course.code} />
      <HR />
      <CardGrid>
        {topicsWithCategories.map((topic) => {
          const topicName = topic.name.split("- ")[1] || topic.name;
          return (
            <Card key={topic.code} title={topicName}>
              {topic.categories.map((category) => (
                <CategoryAccordion key={category.name} title={category.name}>
                  {category.subtopics.map((subtopic) => (
                    <div
                      key={subtopic.code}
                      className="subtopic-row d-flex align-items-center"
                    >
                      <FavouriteButton
                        courseCode={course.code}
                        subtopicCode={subtopic.code}
                      />
                      <SubtopicLink name={subtopic.name} code={subtopic.code} />
                    </div>
                  ))}
                </CategoryAccordion>
              ))}
            </Card>
          );
        })}
      </CardGrid>
    </Page>
  );
};

export default CoursePage;

// TODO:Split into CourseHeader and CourseContent components
