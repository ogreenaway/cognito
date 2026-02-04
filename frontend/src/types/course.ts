export type Course = {
  code: string;
  version: number;
  subjectName: string;
  levelCode: string;
  examBoardCode: string;
};

export type CourseAPIResponse = {
  course: Course;
};
