import "./CoursePage.scss";

import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Card from "../../components/Card/Card";
import CardGrid from "../../components/CardGrid/CardGrid";
import CategoryAccordion from "../../components/CategoryAccordion/CategoryAccordion";
import ExamCode from "../../components/ExamCode/ExamCode";
import HR from "../../components/HR/HR";
import Page from "../../components/Page/Page";
import PageTitle from "../../components/PageTitle/PageTitle";
import React from "react";
import Spinner from "react-bootstrap/Spinner";
import SubtopicLink from "../../components/SubtopicLink/SubtopicLink";
import { useCourseData } from "../../hooks/useCourseData";
import { useCourseID } from "../../hooks/useCourseID";

// Static sample data matching the design reference
const sampleCategories = [
  {
    name: "Organisation: Digestion",
    subtopics: [
      { name: "Principles of Organisation", url: "#" },
      { name: "The Stomach", url: "#" },
      { name: "The Human Digestive System", url: "#" },
      { name: "Enzymes & Metabolism", url: "#" },
      { name: "Required Practical: Enzymes", url: "#" },
      { name: "Enzymes & Digestion", url: "#" },
      { name: "Required Practical: Food Tests", url: "#" },
    ],
  },
  {
    name: "Organisation: The Cardiovascular & Respiratory System",
    subtopics: [
      { name: "The Lungs", url: "#" },
      { name: "The Heart", url: "#" },
      { name: "Blood Vessels & Blood", url: "#" },
    ],
  },
  {
    name: "Health & Disease",
    subtopics: [
      { name: "CHD: A Non-Communicable Disease", url: "#" },
      { name: "Health Issues", url: "#" },
      { name: "Lifestyle & Non-Communicable Diseases", url: "#" },
      { name: "Data & Lifestyle Factors", url: "#" },
      { name: "Cancer", url: "#" },
    ],
  },
  {
    name: "Plant Tissues, Organs & Systems",
    subtopics: [
      { name: "Plant Tissues", url: "#" },
      { name: "Plant Organ System", url: "#" },
      { name: "Transpiration", url: "#" },
      { name: "Translocation", url: "#" },
    ],
  },
];

const sampleCategories2 = [
  {
    name: "Cell Biology: Structure",
    subtopics: [
      { name: "Cell Structure", url: "#" },
      { name: "Cell Organelles", url: "#" },
      { name: "Prokaryotes & Eukaryotes", url: "#" },
    ],
  },
  {
    name: "Cell Biology: Transport",
    subtopics: [
      { name: "Diffusion", url: "#" },
      { name: "Osmosis", url: "#" },
      { name: "Active Transport", url: "#" },
    ],
  },
];

const mockData = [
  {
    title: "Organisation",
    categories: sampleCategories,
  },
  {
    title: "Cell Biology",
    categories: sampleCategories2,
  },
];

const CoursePage: React.FC = () => {
  const courseId = useCourseID();
  const { course, loading, error } = useCourseData(courseId);

  if (loading) {
    return (
      <Page>
        <div className="d-flex justify-content-center align-items-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Page>
    );
  }

  if (error || !course) {
    return (
      <Page>
        <div className="alert alert-danger" role="alert">
          Failed to load course data. Please try again later.
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <Breadcrumbs
        subject={course.subjectName}
        examBoard={course.examBoardCode}
        level={course.levelCode}
      />
      <PageTitle title={course.name} subtitle="Revision Notes" />
      <ExamCode code={course.code} />
      <HR />
      <CardGrid>
        {/* TODO: have an ID for each loop */}
        {mockData.map((topic) => (
          <Card key={topic.title} title={topic.title}>
            {topic.categories.map((category) => (
              <CategoryAccordion key={category.name} title={category.name}>
                {category.subtopics.map((subtopic, index) => (
                  <SubtopicLink
                    key={index}
                    name={subtopic.name}
                    // TODO: switch to code
                    code={subtopic.url}
                  />
                ))}
              </CategoryAccordion>
            ))}
          </Card>
        ))}
      </CardGrid>
    </Page>
  );
};

export default CoursePage;
