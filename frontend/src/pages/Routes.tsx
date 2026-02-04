import { Route, Routes } from "react-router";

import CoursePage from "./CoursePage/CoursePage";
import Home from "./Home/Home";

const AppRoutes = () => (
  <Routes>
    <Route path="/courseoverview/:courseId/lessons" element={<CoursePage />} />
    <Route path="/" element={<Home />} />
  </Routes>
);

export default AppRoutes;
