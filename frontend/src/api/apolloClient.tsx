import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: "https://feature-api.cognitoedu.org/graphql" }),
  cache: new InMemoryCache(),
});
