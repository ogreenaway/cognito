import "./index.scss";

import { ApolloProvider } from "@apollo/client/react";
import { BrowserRouter } from "react-router";
import ReactDOM from "react-dom/client";
import Routes from "./pages/Routes";
import { apolloClient } from "./api/apolloClient";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ApolloProvider>
);
