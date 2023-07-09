import React, { useState } from "react";
import questionsBasics from "../api/questionsBasics";

const Basics = ({ basicData, setBasic }) => {
  const handleChange = (e) => {
    setBasic((prevFormData) => ({
      ...prevFormData,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div>
      <div className="flex items-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="file-icons:realbasic" clipPath="url(#clip0_100_1952)">
            <path
              id="Vector"
              d="M7.26562 15.1875C6.53152 15.9216 4.52911 17.9636 2.81198 19.718C1.05745 17.6316 0 14.9394 0 12C0 9.06356 1.0553 6.37402 2.80655 4.28841C4.22414 5.72784 6.24352 7.7752 7.29867 8.83036C9.03103 10.5627 8.64844 13.8047 7.26562 15.1875ZM15.2812 7.21875L19.6643 2.76661C17.5855 1.03912 14.9142 0 12 0C9.07702 0 6.39853 1.0455 4.317 2.78241L8.4375 6.9375C10.7599 9.12403 13.5025 8.74106 15.2812 7.21875ZM21.1607 4.24969C19.7414 5.69095 17.6952 7.76564 16.6305 8.83031C14.8981 10.5627 15.2807 13.8047 16.6635 15.1875C17.4031 15.927 19.4296 17.9939 21.1552 19.7568C22.9293 17.6649 24 14.9577 24 12C24 9.04537 22.9315 6.34069 21.1607 4.24969ZM19.7011 21.2024L15.2812 16.7128C13.5025 15.1905 10.7599 14.8075 8.4375 16.9941L4.28016 21.1864C6.3668 22.9419 9.05962 24 12 24C14.9315 24 17.617 22.9483 19.7011 21.2024Z"
              fill="#0FA958"
            />
          </g>
          <defs>
            <clipPath id="clip0_100_1952">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span className="ml-2 text-green-700 font-semibold text-3xl leading-tight my-3">
          Basics
        </span>
      </div>

      <form>
        {questionsBasics.map((question) => (
          <div key={question.id} className="mb-4">
            <label htmlFor={question.id} className="text-lg font-semibold mr-5">
              {question.label}
            </label>
            {question.type === "number" ? (
              <input
                type="number"
                min={1}
                step={1}
                // defaultValue={1}
                id={question.id}
                className="rounded-md border border-neutral-400 bg-white p-2 pl-2 mt-1"
                onChange={handleChange}
                value={basicData[question.id] || ""}
              />
            ) : (
              <select
                id={question.id}
                className="rounded-md border border-neutral-400 bg-white p-2 mr-2"
                onChange={handleChange}
                value={basicData[question.id] || ""}
              >
                <option value="">Select a value</option>
                {question.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </form>
    </div>
  );
};

export default Basics;
