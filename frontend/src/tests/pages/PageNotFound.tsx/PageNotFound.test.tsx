import { renderApp } from "../../utils/renderApp";
import { screen } from "@testing-library/react";

describe("PageNotFound", () => {
  it("renders page not found message", async () => {
    renderApp("/non-existent-path");
    expect(await screen.findByText("Page not found")).toBeInTheDocument();
  });
});
