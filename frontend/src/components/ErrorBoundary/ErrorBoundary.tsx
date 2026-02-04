import { Component, ReactNode } from "react";

import { Link } from "react-router";
import Page from "../Page/Page";
import PageTitle from "../PageTitle/PageTitle";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <Page>
          <PageTitle title="Error:" subtitle={error.message} />
          {/* TODO: style the code block */}
          {error.stack && (
            <code>
              <p>{String(error.stack)}</p>
            </code>
          )}
          <Link to="/">Go to home</Link>
        </Page>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
