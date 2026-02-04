import "./TopicCard.scss";

import React from "react";

// TODO: move
export interface Subtopic {
  name: string;
  url: string;
}

export interface Category {
  name: string;
  subtopics: Subtopic[];
}

interface TopicCardProps {
  title: string;
  children: React.ReactNode;
}

const TopicCard: React.FC<TopicCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white border rounded">
      <div className="py-4 px-3 border-bottom">
        <h2 className="h6 mb-0">{title}</h2>
      </div>
      <div className="p-3 pb-0">{children}</div>
    </div>
  );
};

export default TopicCard;
