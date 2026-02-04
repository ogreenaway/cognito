import "./CoursePage.scss";

import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Card from "../../components/Card/Card";
import CardGrid from "../../components/CardGrid/CardGrid";
import CategoryAccordion from "../../components/CategoryAccordion/CategoryAccordion";
import ExamCode from "../../components/ExamCode/ExamCode";
import HR from "../../components/HR/HR";
import Page from "../../components/Page/Page";
import PageTitle from "../../components/PageTitle/PageTitle";
import React from "react";
import Spinner from "react-bootstrap/Spinner";
import SubtopicLink from "../../components/SubtopicLink/SubtopicLink";
import { useCourseData } from "../../hooks/useCourseData";
import { useCourseID } from "../../hooks/useCourseID";
import { useTopicData } from "../../hooks/useTopicData";

const CoursePage: React.FC = () => {
  const courseId = useCourseID();
  const { course, loading: courseLoading, error } = useCourseData(courseId);
  const { topicsWithCategories, loading: topicsLoading } =
    useTopicData(courseId);

  if (courseLoading || topicsLoading) {
    return (
      <Page>
        <div className="d-flex justify-content-center align-items-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Page>
    );
  }

  if (error || !course || !topicsWithCategories) {
    return (
      <Page>
        <div className="alert alert-danger" role="alert">
          Failed to load course data. Please try again later.
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <Breadcrumbs
        subject={course.subjectName}
        examBoard={course.examBoardCode}
        level={course.levelCode}
      />
      <PageTitle title={course.name} subtitle="Revision Notes" />
      <ExamCode code={course.code} />
      <HR />
      <CardGrid>
        {/* TODO: have an ID for each loop */}
        {topicsWithCategories.map((topic) => (
          <Card key={topic.code} title={topic.name}>
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
        ))}
      </CardGrid>
    </Page>
  );
};

export default CoursePage;
