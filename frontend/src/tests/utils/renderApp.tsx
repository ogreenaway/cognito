import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

import { ApolloProvider } from "@apollo/client/react";
import { MemoryRouter } from "react-router";
import Routes from "../../pages/Routes";
import { render } from "@testing-library/react";

const createTestClient = () =>
  new ApolloClient({
    link: new HttpLink({ uri: "https://feature-api.cognitoedu.org/graphql" }),
    cache: new InMemoryCache(),
  });

export function renderApp(
  path = "/courseoverview/p2-gcse-edexcel-h-t/lessons"
) {
  const client = createTestClient();

  return render(
    <ApolloProvider client={client}>
      <MemoryRouter initialEntries={[path]}>
        <Routes />
      </MemoryRouter>
    </ApolloProvider>
  );
}

// TODO: consider switching to Vitest Browser Mode
