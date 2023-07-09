import React from "react";

const NextButton = ({ onClick, isLastStep }) => (
  <button
    className="flex items-center p-4 gap-2 rounded-md border border-green-800 bg-green-800 text-white inline-flex justify-center"
    onClick={onClick}
  >
    <span className="text-white">{isLastStep ? "Submit" : "Next"}</span>
    {!isLastStep && (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Icon">
          <path
            id="Icon (Stroke)"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.9107 16.4227C6.58527 16.0972 6.58527 15.5696 6.9107 15.2442L12.1548 10.0001L6.9107 4.756C6.58527 4.43057 6.58527 3.90293 6.9107 3.57749C7.23614 3.25206 7.76378 3.25206 8.08921 3.57749L13.9225 9.41083C14.248 9.73626 14.248 10.2639 13.9225 10.5893L8.08922 16.4227C7.76378 16.7481 7.23614 16.7481 6.9107 16.4227Z"
            fill="white"
          />
        </g>
      </svg>
    )}
  </button>
);

export default NextButton;
