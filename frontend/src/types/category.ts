import { Subtopic } from "./subtopic";

type CategoryApi = {
  name: string;
  // To avoid hallucinating subtopics, we only get the IDs
  subtopicIds: string[];
};

export type Category = Omit<CategoryApi, "subtopicIds"> & {
  subtopics: Subtopic[];
};
