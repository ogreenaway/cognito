import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

// TODO: only get the fields we need
const COURSE_QUERY = gql`
  query course($code: String!) {
    course(code: $code) {
      id
      code
      name
      version
      totalScore
      subtopicCount
      flashcardCount
      subjectCode
      subjectName
      learnTotalScore
      learnElementCount
      revisionTotalScore
      keywords
      higherFoundation
      tripleCombined
      alternateHigherFoundationCourse
      levelCode
      examBoardCode
      includeYearSections
      includesSections
      alternativeTopicName
      hasPastPapers
      hasQsByTopic
      hasExamQsCourse
      hasExamMCQsCourse
      examQs
      pastPapersCategoryKey
      qsByTopicCategoryKey
      pastPapersOnly
      courseVersion
    }
  }
`;

export interface CourseData {
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
}

interface CourseQueryResult {
  course: CourseData;
}

export function useCourseData(courseCode: string) {
  const { data, loading, error } = useQuery<CourseQueryResult>(COURSE_QUERY, {
    variables: { code: courseCode },
    skip: !courseCode,
  });

  return {
    course: data?.course,
    loading,
    error,
  };
}
