import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";

import { ApolloProvider } from "@apollo/client/react";

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: process.env.REACT_APP_API_URL }),
  cache: new InMemoryCache(),
});
