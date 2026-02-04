import React from "react";

interface CardGridProps {
  children: React.ReactNode;
}

const CardGrid: React.FC<CardGridProps> = ({ children }) => {
  return (
    <div className="row gy-4 my-5">
      {React.Children.map(children, (child) => (
        <div className="col-md-6">{child}</div>
      ))}
    </div>
  );
};

export default CardGrid;
