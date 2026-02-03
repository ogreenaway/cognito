import { screen } from "@testing-library/react";
import { renderApp } from "../../utils/renderApp";

it("renders course name from mocked API", async () => {
  renderApp();
  expect(
    await screen.findByText("GCSE Physics - Edexcel Higher Triple")
  ).toBeInTheDocument();
});
