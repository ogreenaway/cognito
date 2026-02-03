import React from "react";

interface TopicCardGridProps {
  children: React.ReactNode;
}

const TopicCardGrid: React.FC<TopicCardGridProps> = ({ children }) => {
  return (
    <div className="row gy-4 my-5">
      {React.Children.map(children, (child) => (
        <div className="col-md-6">{child}</div>
      ))}
    </div>
  );
};

export default TopicCardGrid;
