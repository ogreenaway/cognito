import "./index.scss";

import { BrowserRouter, Route, Routes } from "react-router";

import CoursePage from "./pages/CoursePage/CoursePage";
import Home from "./pages/Home/Home";
import ReactDOM from "react-dom/client";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/courseoverview/:courseId/lessons"
        element={<CoursePage />}
      />
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
);
