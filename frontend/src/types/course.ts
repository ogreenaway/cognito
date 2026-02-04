// TODO: move to a separate file in the types directory and rename to Course
type CourseApi = {
  id: string;
  code: string;
  name: string;
  version: number;
  totalScore: number;
  subtopicCount: number;
  flashcardCount: number;
  subjectCode: string;
  subjectName: string;
  learnTotalScore: number;
  learnElementCount: number;
  revisionTotalScore: number;
  keywords: string[];
  higherFoundation: string;
  tripleCombined: string;
  alternateHigherFoundationCourse: string;
  levelCode: string;
  examBoardCode: string;
  includeYearSections: boolean;
  includesSections: boolean;
  alternativeTopicName: string;
  hasPastPapers: boolean;
  hasQsByTopic: boolean;
  hasExamQsCourse: boolean;
  hasExamMCQsCourse: boolean;
  examQs: number;
  pastPapersCategoryKey: string;
  qsByTopicCategoryKey: string;
  pastPapersOnly: boolean;
  courseVersion: number;
};

export type CourseAPIResponse = {
  course: CourseApi;
};

export type Course = CourseApi;
