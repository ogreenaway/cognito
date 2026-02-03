import React, { useRef, useState } from "react";

import { Category } from "../TopicCard";
import ChevronIcon from "./ChevronIcon";
import SubtopicLink from "./SubtopicLink";

interface CategoryAccordionProps {
  category: Category;
}

const CategoryAccordion: React.FC<CategoryAccordionProps> = ({ category }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (contentRef.current) {
      if (!isExpanded) {
        setContentHeight(contentRef.current.scrollHeight);
      } else {
        setContentHeight(0);
      }
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="rounded bg-body-tertiary mb-3 border">
      <button
        className="category-accordion__header btn btn-link w-100 d-flex align-items-center justify-content-between p-3 text-start text-decoration-none"
        onClick={handleToggle}
        aria-expanded={isExpanded}
        type="button"
      >
        <span className="fw-medium text-body">{category.name}</span>
        <ChevronIcon isExpanded={isExpanded} />
      </button>
      <div
        ref={contentRef}
        className="category-accordion__content"
        style={{ height: contentHeight }}
      >
        <div className="border-bottom" />
        {category.subtopics.map((subtopic, index) => (
          <SubtopicLink key={index} name={subtopic.name} url={subtopic.url} />
        ))}
      </div>
    </div>
  );
};

export default CategoryAccordion;
