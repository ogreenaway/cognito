import React from "react";

interface PageTitleProps {
  name?: string;
}

function PageTitle({ name = "AQA GCSE Biology" }: PageTitleProps) {
  return (
    <h1 className="h2 mb-3">
      <span className="text-secondary">{name} </span>
      Revision Notes
    </h1>
  );
}

export default PageTitle;
