import { Category } from "./category";
import { Subtopic } from "./subtopic";

// Minimal topic type from API response
export type SimplifiedTopic = {
  code: string;
  name: string;
};

// Full topic type with categories (after categorization)
export type Topic = {
  code: string;
  name: string;
  categories: Category[];
};

export type TopicsAPIResponse = {
  courseTopics: SimplifiedTopic[];
};

export type TopicsWithSubtopics = {
  topic: SimplifiedTopic;
  subtopics: Subtopic[];
};
