import "./TopicCard.scss";

import CategoryAccordion from "./components/CategoryAccordion";
import React from "react";

export interface Subtopic {
  name: string;
  url: string;
}

export interface Category {
  name: string;
  subtopics: Subtopic[];
}

interface TopicCardProps {
  topicName: string;
  categories: Category[];
}

const TopicCard: React.FC<TopicCardProps> = ({ topicName, categories }) => {
  return (
    <div className="topic-card">
      <div className="topic-card__header">
        <h2 className="topic-card__title">{topicName}</h2>
      </div>
      <div className="topic-card__body">
        {categories.map((category, index) => (
          <CategoryAccordion key={index} category={category} />
        ))}
      </div>
    </div>
  );
};

export default TopicCard;
