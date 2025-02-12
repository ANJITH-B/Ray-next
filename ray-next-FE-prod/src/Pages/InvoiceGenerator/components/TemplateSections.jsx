import React from "react";

export const HeaderSection = ({ content, onUpdate }) => {
  return (
    <div className="text-center p-4">
      {content.logo && (
        <img src={content.logo} alt="Company Logo" className="h-16 mx-auto mb-4" />
      )}
      <h1 className="text-2xl font-bold">{content.companyName || "Company Name"}</h1>
      <h2 className="text-xl">{content.title}</h2>
    </div>
  );
};

// Add other section components as needed 