import "./Breadcrumbs.scss";

import HomeIcon from "./components/HomeIcon";
import React from "react";
import Separator from "./components/Separator";

const handleDemoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  window.alert("This link won't be implemented in this demo.");
};

const Breadcrumbs = () => {
  return (
    <div className="breadcrumbs" data-testid="breadcrumbs">
      <div className="breadcrumbs__scroll-wrapper">
        <span className="breadcrumbs__crumb">
          <a className="breadcrumbs__parent" href="/">
            <HomeIcon />
          </a>
          <Separator />
        </span>
        <span className="breadcrumbs__crumb">
          <a
            className="breadcrumbs__parent"
            href="/gcse/"
            onClick={handleDemoClick}
          >
            GCSE
          </a>
          <Separator />
        </span>
        <span className="breadcrumbs__crumb">
          <a
            className="breadcrumbs__parent"
            href="/gcse/biology/"
            onClick={handleDemoClick}
          >
            Biology
          </a>
          <Separator />
        </span>
        <span className="breadcrumbs__crumb">
          <a
            className="breadcrumbs__parent"
            href="/gcse/biology/aqa/"
            onClick={handleDemoClick}
          >
            AQA
          </a>
          <Separator />
        </span>
        <span className="breadcrumbs__crumb">
          <span className="breadcrumbs__current">Revision Notes</span>
        </span>
      </div>
    </div>
  );
};

export default Breadcrumbs;
