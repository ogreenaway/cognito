import "./Breadcrumbs.scss";

import HomeIcon from "./components/HomeIcon";
import React from "react";
import Separator from "./components/Separator";

interface BreadcrumbsProps {
  subject?: string;
  examBoard?: string;
  level?: string;
}

const handleDemoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  window.alert("This link won't be implemented in this demo.");
};

const capitalizeFirst = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  subject = "Biology",
  examBoard = "AQA",
  level = "GCSE",
}) => {
  const levelLower = level.toLowerCase();
  const subjectLower = subject.toLowerCase();
  const subjectDisplay = capitalizeFirst(subject);

  return (
    <div className="breadcrumbs mb-4" data-testid="breadcrumbs">
      <div className="breadcrumbs__scroll-wrapper justify-content-start">
        <span className="breadcrumbs__crumb">
          <a className="breadcrumbs__parent text-decoration-underline" href="/">
            <HomeIcon />
          </a>
          <Separator />
        </span>
        <span className="breadcrumbs__crumb">
          <a
            className="breadcrumbs__parent text-decoration-underline"
            href={`/${levelLower}/`}
            onClick={handleDemoClick}
          >
            {level.toUpperCase()}
          </a>
          <Separator />
        </span>
        <span className="breadcrumbs__crumb">
          <a
            className="breadcrumbs__parent text-decoration-underline"
            href={`/${levelLower}/${subjectLower}/`}
            onClick={handleDemoClick}
          >
            {subjectDisplay}
          </a>
          <Separator />
        </span>
        <span className="breadcrumbs__crumb">
          <a
            className="breadcrumbs__parent text-decoration-underline"
            href={`/${levelLower}/${subjectLower}/${examBoard.toLowerCase()}/`}
            onClick={handleDemoClick}
          >
            {examBoard.toUpperCase()}
          </a>
          <Separator />
        </span>
        <span className="breadcrumbs__crumb">
          <span className="breadcrumbs__current fw-bold">Revision Notes</span>
        </span>
      </div>
    </div>
  );
};

export default Breadcrumbs;
