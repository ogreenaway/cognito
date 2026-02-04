import React from "react";

interface SubtopicLinkProps {
  name: string;
  url: string;
}

const SubtopicLink: React.FC<SubtopicLinkProps> = ({ name, url }) => {
  return (
    <div>
      <a className="my-4 mx-3 d-block link-body-emphasis" href={url}>
        {name}
      </a>
    </div>
  );
};

export default SubtopicLink;
