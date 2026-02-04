import "./CoursePage.scss";

import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import Card from "../../../components/Card/Card";
import CardGrid from "../../../components/CardGrid/CardGrid";
import CategoryAccordion from "../../../components/CategoryAccordion/CategoryAccordion";
import { Course } from "../../../types/course";
import ExamCode from "../../../components/ExamCode/ExamCode";
import HR from "../../../components/HR/HR";
import Page from "../../../components/Page/Page";
import PageTitle from "../../../components/PageTitle/PageTitle";
import React from "react";
import SubtopicLink from "../../../components/SubtopicLink/SubtopicLink";
import { TopicType } from "../../../hooks/useTopicData";

interface CoursePageProps {
  course: Course;
  //   TODO: move to types
  topicsWithCategories: TopicType[];
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
                    <SubtopicLink
                      key={subtopic.code}
                      name={subtopic.name}
                      code={subtopic.code}
                    />
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
