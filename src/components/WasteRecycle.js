import React from "react";
import questionsRecycle from "../api/questionsRecycle";

const WasteRecycle = ({ wasteRecycleData, setWasteRecycleData }) => {
  const handleChange = (e) => {
    setWasteRecycleData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <g clip-path="url(#clip0_100_1651)">
            <path
              d="M31.5058 22.0577L27.8695 28.3557C27.1568 29.6066 25.8332 30.2611 24.4951 30.1739H21.5861V33.0829L17.9498 26.5376L21.5861 19.9923V22.9013H25.6878L22.4588 17.3015L28.7568 13.6652L31.3749 18.2033C32.1312 19.3233 32.233 20.8214 31.5058 22.0577ZM13.1645 4.08008H20.437C21.8624 4.08008 23.0988 4.90914 23.6951 6.10184L25.1496 8.63267L27.6659 7.17817L23.826 13.5925L16.3353 13.7234L18.8516 12.2689L16.8008 8.7054L13.5863 14.3052L7.27376 10.669L9.89187 6.13093C10.4882 4.92369 11.7245 4.08008 13.1645 4.08008ZM7.11377 28.3703L3.47751 22.0723C2.76481 20.8359 2.86662 19.3524 3.60842 18.2324L5.06292 15.7161L2.54663 14.2616L10.0228 14.378L13.8772 20.8069L11.3609 19.3524L9.31007 22.9013H15.7681V30.1739H10.5318C9.85042 30.2232 9.16883 30.0803 8.56458 29.7614C7.96033 29.4426 7.45767 28.9606 7.11377 28.3703Z"
              fill="#0FA958"
            />
          </g>
          <defs>
            <clipPath id="clip0_100_1651">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span className="ml-2 text-green-700 font-semibold text-3xl leading-tight my-3">
          Waste Recycle
        </span>
      </div>

      <div>
      {questionsRecycle.map((question) => (
        <div key={question.id} className="flex items-center mb-4">
          <label htmlFor={question.id} className="text-lg font-semibold">
            {question.label}
          </label>
          <div className="flex items-center ml-7">
            <select
              id={question.id}
              className="rounded-md border border-neutral-400 bg-white p-2 mr-2"
              onChange={handleChange}
              value={wasteRecycleData[question.id] || ""}
            >
              <option value="">Select an option</option>
              {question.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default WasteRecycle;
