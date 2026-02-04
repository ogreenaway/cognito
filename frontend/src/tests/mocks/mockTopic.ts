export const mockTopics = [
  {
    code: "topic-1",
    name: "Forces",
    totalScore: 100,
    learnTotalScore: 50,
    learnElementCount: 10,
    revisionTotalScore: 50,
    revisionElementCount: 5,
    flashcardCount: 20,
    isHidden: false,
    parentSection: "Physics",
    subtopicCount: 3,
  },
  {
    code: "topic-2",
    name: "Energy",
    totalScore: 80,
    learnTotalScore: 40,
    learnElementCount: 8,
    revisionTotalScore: 40,
    revisionElementCount: 4,
    flashcardCount: 15,
    isHidden: false,
    parentSection: "Physics",
    subtopicCount: 2,
  },
];

export const mockTopicsResponse = {
  data: {
    courseTopics: mockTopics,
  },
};
