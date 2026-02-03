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
    <div className="category-accordion">
      <button
        className="category-accordion__header"
        onClick={handleToggle}
        aria-expanded={isExpanded}
        type="button"
      >
        <span className="category-accordion__name">{category.name}</span>
        <ChevronIcon isExpanded={isExpanded} />
      </button>
      <div
        ref={contentRef}
        className="category-accordion__content"
        style={{ height: contentHeight }}
      >
        <div className="category-accordion__divider" />
        {category.subtopics.map((subtopic, index) => (
          <SubtopicLink key={index} name={subtopic.name} url={subtopic.url} />
        ))}
      </div>
    </div>
  );
};

export default CategoryAccordion;
