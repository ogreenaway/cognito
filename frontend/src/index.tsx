import "./index.scss";

import { BrowserRouter, Route, Routes } from "react-router";

import { ApolloProvider } from "@apollo/client/react";
import CoursePage from "./pages/CoursePage/CoursePage";
import Home from "./pages/Home/Home";
import ReactDOM from "react-dom/client";
import { apolloClient } from "./api/apolloClient";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <Routes>
        <Route
          path="/courseoverview/:courseId/lessons"
          element={<CoursePage />}
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);
