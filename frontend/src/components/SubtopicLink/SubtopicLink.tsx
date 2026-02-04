import React from "react";

interface SubtopicLinkProps {
  name: string;
  code: string;
}

const SubtopicLink: React.FC<SubtopicLinkProps> = ({ name, code }) => {
  return (
    <div>
      <a
        className="my-4 mx-3 d-block link-body-emphasis"
        href={`https://feature.cognitoedu.org/coursesubtopic/${code}`}
      >
        {name}
      </a>
    </div>
  );
};

export default SubtopicLink;
