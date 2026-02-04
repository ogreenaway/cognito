export type Subtopic = {
  code: string;
  name: string;
};

export type SubtopicsAPIResponse = {
  courseSubtopics: Subtopic[];
};
