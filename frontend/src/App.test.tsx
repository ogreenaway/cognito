import { render, screen } from "@testing-library/react";

import App from "./App";
import React from "react";

it("renders welcome message", () => {
  render(<App />);
  expect(screen.getByText("Learn React")).toBeInTheDocument();
});
