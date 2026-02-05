import { renderApp } from "../../utils/renderApp";
import { screen } from "@testing-library/react";

describe("CoursePage", () => {
  it("renders course data from mocked API", async () => {
    renderApp("/courseoverview/p2-gcse-edexcel-h-t/lessons");
    // Check the page title renders with exam board, level and subject
    expect(
      await screen.findByText("EDEXCEL GCSE Physics")
    ).toBeInTheDocument();
    // Check the exam code renders
    expect(screen.getByText("p2-gcse-edexcel-h-t")).toBeInTheDocument();
  });

  it("renders topics and categories from mocked API and OpenAI", async () => {
    renderApp("/courseoverview/p2-gcse-edexcel-h-t/lessons");
    // Check topic names from mockTopic
    expect(await screen.findByText("Forces")).toBeInTheDocument();
    expect(screen.getByText("Energy")).toBeInTheDocument();
    // Check category names from OpenAI mock
    expect(screen.getByText("Newton's Laws of Motion")).toBeInTheDocument();
    expect(screen.getByText("Energy Types")).toBeInTheDocument();
  });
});
