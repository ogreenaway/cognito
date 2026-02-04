import "./ExamCode.scss";

import React from "react";

interface ExamCodeProps {
  code: string;
}

const ExamCode: React.FC<ExamCodeProps> = ({ code }) => {
  return (
    <p className="exam-code d-inline-block border rounded bg-body m-0">
      <strong className="text-body">Exam code:</strong> {code}
    </p>
  );
};

export default ExamCode;
