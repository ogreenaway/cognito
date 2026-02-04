// TODO: remove everything we don't need

import { Subtopic } from "./subtopic";

export type Topic = {
  code: string;
  name: string;
  totalScore: number;
  learnTotalScore: number;
  learnElementCount: number;
  revisionTotalScore: number;
  revisionElementCount: number;
  flashcardCount: number;
  isHidden: boolean;
  parentSection: string | null;
  subtopicCount: number;
};

export type TopicsAPIResponse = {
  courseTopics: Topic[];
};

export type TopicsWithSubtopics = {
  topic: Topic;
  subtopics: Subtopic[];
};
