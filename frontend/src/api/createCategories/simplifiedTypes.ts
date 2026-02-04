export type SimplifiedSubtopic = {
  code: string;
  name: string;
};

export type SimplifiedCategory = {
  name: string;
  subtopics: SimplifiedSubtopic[];
};

export type SimplifiedTopic = {
  code: string;
  name: string;
  categories: SimplifiedCategory[];
};
