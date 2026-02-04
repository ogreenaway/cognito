import { Route, Routes } from "react-router";

import CoursePageWrapper from "./CoursePage/CoursePageWrapper";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Home from "./Home/Home";
import PageNotFound from "./PageNotFound/PageNotFound";

const AppRoutes = () => (
  <Routes>
    <Route
      path="/courseoverview/:courseId/lessons"
      element={
        <ErrorBoundary>
          <CoursePageWrapper />
        </ErrorBoundary>
      }
    />
    <Route path="/" element={<Home />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

export default AppRoutes;
