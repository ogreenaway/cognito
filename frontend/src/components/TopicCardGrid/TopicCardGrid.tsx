import "./TopicCardGrid.scss";

import React from "react";

interface TopicCardGridProps {
  children: React.ReactNode;
}

const TopicCardGrid: React.FC<TopicCardGridProps> = ({ children }) => {
  return <div className="topic-card-grid">{children}</div>;
};

export default TopicCardGrid;
