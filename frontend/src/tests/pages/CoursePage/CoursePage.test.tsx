import { renderApp } from "../../utils/renderApp";
import { screen } from "@testing-library/react";

describe("CoursePage", () => {
  it("renders course name from mocked API", async () => {
    renderApp("/courseoverview/p2-gcse-edexcel-h-t/lessons");
    expect(
      await screen.findByText("GCSE Physics - Edexcel Higher Triple")
    ).toBeInTheDocument();
  });
});
