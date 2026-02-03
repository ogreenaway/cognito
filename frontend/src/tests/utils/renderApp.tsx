import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { RouterProvider, createMemoryRouter } from "react-router";

import { ApolloProvider } from "@apollo/client/react";
import CoursePage from "../../pages/CoursePage/CoursePage";
import Home from "../../pages/Home/Home";
import { render } from "@testing-library/react";

// Re-export server for test overrides
export { server } from "../mocks/server";

// Create a test Apollo client
const createTestClient = () =>
  new ApolloClient({
    link: new HttpLink({ uri: "https://feature-api.cognitoedu.org/graphql" }),
    cache: new InMemoryCache(),
  });

const routes = [
  { path: "/courseoverview/:courseId/lessons", element: <CoursePage /> },
  { path: "/", element: <Home /> },
];

/**
 * Renders the app with all necessary providers at the specified path.
 * @param path - The URL path to render at. Defaults to "/courseoverview/p2-gcse-edexcel-h-t/lessons"
 */
export function renderApp(
  path = "/courseoverview/p2-gcse-edexcel-h-t/lessons"
) {
  const client = createTestClient();
  const router = createMemoryRouter(routes, {
    initialEntries: [path],
  });

  return render(
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}
