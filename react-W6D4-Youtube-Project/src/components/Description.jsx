import React, { useState } from "react";

function Description({ desc }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-[#f2f2f2] w-full h-auto rounded-xl p-3 text-black flex items-center justify-between">
      <p className="flex-1">
        {isExpanded || desc.length <= 100
          ? desc
          : `${desc.substring(0,200)}...`}
      </p>
      <button
        className="ml-3 bg-blue-500 text-white rounded px-2 py-1"
        onClick={handleToggle}
      >
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
}

export default Description;
