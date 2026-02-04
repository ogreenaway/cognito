import React, { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  return <div className="container py-5 px-lg-5">{children}</div>;
};

export default Page;
