import "./Breadcrumbs.scss";

import HomeIcon from "./components/HomeIcon";
import { Link } from "react-router";
import React from "react";
import Separator from "./components/Separator";

// TODO: match the API's names for subject, examBoard, and level
interface BreadcrumbsProps {
  subject?: string;
  examBoard?: string;
  level?: string;
}

const handleDemoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  window.alert("This link won't be implemented in this demo.");
};

// TODO: convert to bootstrap
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  subject = "Biology",
  examBoard = "AQA",
  level = "GCSE",
}) => {
  const levelLower = level.toLowerCase();
  const subjectLower = subject.toLowerCase();

  return (
    <div className="breadcrumbs mb-4" data-testid="breadcrumbs">
      <div className="breadcrumbs__scroll-wrapper justify-content-start">
        <span className="breadcrumbs__crumb">
          <Link
            className="breadcrumbs__parent text-decoration-underline"
            data-testid="home-link"
            to="/"
          >
            <HomeIcon />
          </Link>
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
            {subject}
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
