import React from "react";
import BorderLessInput from "../../../CommonComponents/FormInputs/BorderLessInput";

export const HeaderEditor = ({ content, onUpdate }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <BorderLessInput
          value={content.companyName}
          onChange={(e) => onUpdate("companyName", e.target.value)}
          placeholder="Enter company name"
        />
      </div>
      <div ></div>
      {/* Add other header settings */}
    </div>
  );
};

// Add other section editors as needed 