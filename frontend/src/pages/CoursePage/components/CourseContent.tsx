import "./CoursePage.scss";

import Card from "../../../components/Card/Card";
import CardGrid from "../../../components/CardGrid/CardGrid";
import CategoryAccordion from "../../../components/CategoryAccordion/CategoryAccordion";
import CourseNotes from "../../../components/CourseNotes/CourseNotes";
import FavouriteButton from "../../../components/FavouriteButton/FavouriteButton";
import React from "react";
import SubtopicLink from "../../../components/SubtopicLink/SubtopicLink";
import { Topic } from "../../../types/topic";

interface CourseContentProps {
  courseCode: string;
  topicsWithCategories: Topic[];
}

const CourseContent: React.FC<CourseContentProps> = ({
  courseCode,
  topicsWithCategories,
}) => {
  return (
    <>
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
                      className="subtopic-row d-flex align-items-center px-3"
                    >
                      <FavouriteButton
                        courseCode={courseCode}
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
      <CourseNotes courseCode={courseCode} />
    </>
  );
};

export default CourseContent;
