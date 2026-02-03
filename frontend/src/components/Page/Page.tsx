import "./Page.scss";

import React, { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

function Page({ children }: PageProps) {
  return <div className="page">{children}</div>;
}

export default Page;
