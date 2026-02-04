import { Link } from "react-router";
import Page from "../../components/Page/Page";
import PageTitle from "../../components/PageTitle/PageTitle";

const courses = [
  { id: "b2-gcse-aqa-h-t", name: "GCSE Biology - AQA Higher Triple" },
  { id: "b2-gcse-edexcel-h-t", name: "GCSE Biology - Edexcel Higher Triple" },
  { id: "c2-gcse-aqa-h-t", name: "GCSE Chemistry - AQA Higher Triple" },
  { id: "c2-gcse-edexcel-h-t", name: "GCSE Chemistry - Edexcel Higher Triple" },
  { id: "p2-gcse-aqa-h-t", name: "GCSE Physics - AQA Higher Triple" },
  { id: "p2-gcse-edexcel-h-t", name: "GCSE Physics - Edexcel Higher Triple" },
];

const Home: React.FC = () => {
  return (
    <Page>
      <PageTitle title="Courses available in this demo" />
      <ul className="list-unstyled">
        {courses.map((course) => (
          <li key={course.id} className="mb-2">
            <Link to={`/courseoverview/${course.id}/lessons`}>
              {course.name}
            </Link>
          </li>
        ))}
      </ul>
    </Page>
  );
};

export default Home;
