import "./SubtopicLink.scss";

import React from "react";

interface SubtopicLinkProps {
  name: string;
  code: string;
}

const SubtopicLink: React.FC<SubtopicLinkProps> = ({ name, code }) => {
  return (
    <div>
      <a
        className="my-4 mx-3 d-block text-decoration-none subtopic-link"
        href={`https://feature.cognitoedu.org/coursesubtopic/${code}`}
        target="_blank"
        rel="noreferrer"
      >
        {name}
      </a>
    </div>
  );
};

export default SubtopicLink;
