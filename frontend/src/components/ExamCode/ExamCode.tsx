import React from "react";

interface ExamCodeProps {
  code?: string;
}

function ExamCode({ code = "8461" }: ExamCodeProps) {
  return (
    <p className="d-inline-block p-2 mb-3 border rounded bg-body-secondary text-secondary">
      <strong className="text-body">Exam code:</strong> {code}
    </p>
  );
}

export default ExamCode;
