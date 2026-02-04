// TODO: move to a separate file in the types directory and rename to Course
type CourseApi = {
  code: string;
  version: number;
  subjectName: string;
  levelCode: string;
  examBoardCode: string;
};

export type CourseAPIResponse = {
  course: CourseApi;
};

export type Course = CourseApi;
