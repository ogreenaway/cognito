import { HttpResponse, graphql } from "msw";

import { mockCourseResponse } from "./mockCourse";

export const handlers = [
  graphql.query("course", () => {
    return HttpResponse.json(mockCourseResponse);
  }),
];
