import { render, screen } from "@testing-library/react";

import CoursePage from "./CoursePage";
import React from "react";

it("renders welcome message", () => {
  render(<CoursePage />);
  expect(screen.getByText("AQA GCSE Biology")).toBeInTheDocument();
});
