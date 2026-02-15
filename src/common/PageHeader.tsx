import React from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const PageHeader = ({ title, description, children }: PageHeaderProps) => {
  return (
    <div className="text-center py-10">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <p className="mt-2 text-gray-300">{description}</p>
      {children}
    </div>
  );
};

export default PageHeader;
