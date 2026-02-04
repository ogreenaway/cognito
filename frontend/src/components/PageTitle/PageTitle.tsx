import React from "react";

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <h1 className="h2 mb-3">
      <span className="text-secondary">{title} </span>
      {subtitle && <span>{subtitle}</span>}
    </h1>
  );
}

export default PageTitle;
