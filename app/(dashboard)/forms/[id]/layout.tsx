import React from "react";

const BuilderLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col w-full flex-grow mx-auto">{children}</div>;
};

export default BuilderLayout;
