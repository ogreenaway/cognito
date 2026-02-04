import { Link } from "react-router";
import Page from "../../components/Page/Page";
import PageTitle from "../../components/PageTitle/PageTitle";

const PageNotFound = () => {
  return (
    <Page>
      <PageTitle title="Page not found" />
      <Link to="/">Go to home</Link>
    </Page>
  );
};

export default PageNotFound;
