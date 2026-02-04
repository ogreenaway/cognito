import React from "react";

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  return (
    <h1 className="h2 mb-3">
      <span className="text-muted">{title}</span>
      {subtitle && <span> {subtitle}</span>}
    </h1>
  );
};

export default PageTitle;
