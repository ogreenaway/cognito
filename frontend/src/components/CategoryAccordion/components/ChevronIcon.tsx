import React from "react";

interface ChevronIconProps {
  isExpanded: boolean;
}

const ChevronIcon: React.FC<ChevronIconProps> = ({ isExpanded }) => {
  return (
    <div
      className={`category-accordion__chevron ${
        isExpanded ? "category-accordion__chevron--expanded" : ""
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" />
      </svg>
    </div>
  );
};

export default ChevronIcon;
