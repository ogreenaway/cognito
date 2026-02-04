export const mockSubtopics = [
  {
    id: "subtopic-1",
    key: "sub-1",
    code: "subtopic-1",
    name: "Newton's Laws",
    masterCourseSubtopicCode: null,
    subjectCode: "physics",
    totalScore: 30,
    learnTotalScore: 15,
    learnElementCount: 3,
    revisionTotalScore: 15,
    revisionElementCount: 2,
    flashcardCount: 5,
    isHidden: false,
    examQs: 10,
  },
];

export const mockSubtopicsResponse = {
  data: {
    courseSubtopics: mockSubtopics,
  },
};
