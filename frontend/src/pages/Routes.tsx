import { Route, Routes } from "react-router";

import CoursePage from "./CoursePage/CoursePage";
import Home from "./Home/Home";
import PageNotFound from "./PageNotFound/PageNotFound";

const AppRoutes = () => (
  <Routes>
    <Route path="/courseoverview/:courseId/lessons" element={<CoursePage />} />
    <Route path="/" element={<Home />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

export default AppRoutes;
