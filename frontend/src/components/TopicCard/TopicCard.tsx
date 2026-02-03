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
    <div className="bg-white border rounded">
      <div className="py-4 px-3 border-bottom">
        <h2 className="h6 mb-0">{topicName}</h2>
      </div>
      <div className="p-3 pb-0">
        {categories.map((category, index) => (
          <CategoryAccordion key={index} category={category} />
        ))}
      </div>
    </div>
  );
};

export default TopicCard;
