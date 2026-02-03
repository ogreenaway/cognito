import "./CoursePage.scss";

import TopicCard, { Category } from "../../components/TopicCard/TopicCard";

import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ExamCode from "../../components/ExamCode/ExamCode";
import HR from "../../components/HR/HR";
import Page from "../../components/Page/Page";
import PageTitle from "../../components/PageTitle/PageTitle";
import React from "react";
import Spinner from "react-bootstrap/Spinner";
import TopicCardGrid from "../../components/TopicCardGrid/TopicCardGrid";
import { useCourseData } from "../../hooks/useCourseData";
import { useCourseID } from "../../hooks/useCourseID";

// Static sample data matching the design reference
const sampleCategories: Category[] = [
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

const sampleCategories2: Category[] = [
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

function CoursePage() {
  const courseId = useCourseID();
  const { course, loading, error } = useCourseData(courseId || "");

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
      <PageTitle name={course.name} />
      <ExamCode code={course.code} />
      <HR />
      <TopicCardGrid>
        <TopicCard topicName="Organisation" categories={sampleCategories} />
        <TopicCard topicName="Cell Biology" categories={sampleCategories2} />
      </TopicCardGrid>
    </Page>
  );
}

export default CoursePage;
