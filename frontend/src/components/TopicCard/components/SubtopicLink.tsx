import React from "react";

interface SubtopicLinkProps {
  name: string;
  url: string;
}

const SubtopicLink: React.FC<SubtopicLinkProps> = ({ name, url }) => {
  return (
    <div className="category-accordion__link-wrapper">
      <a className="category-accordion__link" href={url}>
        {name}
      </a>
    </div>
  );
};

export default SubtopicLink;
