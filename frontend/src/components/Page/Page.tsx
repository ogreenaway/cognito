import React, { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

function Page({ children }: PageProps) {
  return <div className="container py-5 px-lg-5">{children}</div>;
}

export default Page;
