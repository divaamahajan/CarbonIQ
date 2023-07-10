import React from "react";
import questionsHomeEnergy from "../api/questionsHomeEnergy";

const HomeEnergy = ({ homeEnergyData, setHomeEnergyData }) => {
  const handleChange = (e) => {
    setHomeEnergyData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 21H3.6V11.4H0L12 0.599976L15.336 3.59998H14.4V5.60398C13.008 6.09598 12 7.43998 12 8.99998V21ZM15.6 7.79998H16.8V5.99998H21.6V7.79998H22.8C23.46 7.79998 24 8.33997 24 8.99998V22.2C24 22.86 23.46 23.4 22.8 23.4H15.6C14.94 23.4 14.4 22.86 14.4 22.2V8.99998C14.4 8.33997 14.94 7.79998 15.6 7.79998ZM16.8 10.2V13.8H21.6V10.2H16.8Z"
            fill="#0FA958"
          />
        </svg>
        <span className="ml-2 text-green-700 font-semibold text-3xl leading-tight my-3">
          Home Energy
        </span>
      </div>
      <div className="grid grid-cols-2 gap-7">
        {questionsHomeEnergy.map((question) => (
          <div key={question.id} className="mb-4">
            <div className="mb-4">
              {/* Question */}
              <label htmlFor={question.id} className="text-lg font-semibold">
                {question.label}
              </label>
              <div className="flex items-center">
                {/* Answer */}
                {question.type === "number" && (
                  <div className="flex items-center ml-2">
                    <input
                      type={question.type}
                      id={question.id}
                      className="rounded-md border border-neutral-400 bg-white p-2 pl-2"
                      onChange={handleChange}
                      min={0.1}
                      step={0.1}
                      value={homeEnergyData[question.id] || ""}
                    />
                    {/* Unit */}
                    {question.unit && (
                      <label
                        htmlFor={`${question.id}-unit`}
                        className="ml-2 text-gray-600"
                      >
                        {question.unit}
                      </label>
                    )}
                  </div>
                )}
                {question.type === "select" && (
                  <div className="flex items-center ml-2">
                    <select
                      id={question.id}
                      className="rounded-md border border-neutral-400 bg-white p-2 mr-2"
                      onChange={handleChange}
                      value={homeEnergyData[question.id] || ""}
                    >
                      <option value="">Select a value</option>
                      {question.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {/* Unit */}
                    {question.unit && (
                      <label
                        htmlFor={`${question.id}-unit`}
                        className="ml-2 text-gray-600"
                      >
                        {question.unit}
                      </label>
                    )}
                  </div>
                )}
                {question.type === "text" && (
                  <div className="flex items-center ml-2">
                    <input
                      type={question.type}
                      id={question.id}
                      className="rounded-md border border-neutral-400 bg-white p-2 pl-2"
                      onChange={handleChange}
                      value={homeEnergyData[question.id] || ""}
                    />
                    {/* Unit */}
                    {question.unit && (
                      <label
                        htmlFor={`${question.id}-unit`}
                        className="ml-2 text-gray-600"
                      >
                        {question.unit}
                      </label>
                    )}
                  </div>
                )}
                {/* Unit (for select and text types) */}
                {question.unitType === "select" && (
                  <div className="ml-2">
                    <select
                      id={`${question.id}-unit`}
                      className="rounded-md border border-neutral-400 bg-white p-2"
                      onChange={handleChange}
                      value={homeEnergyData[`${question.id}-unit`] || ""}
                    >
                      <option value="">Select a value</option>
                      {question.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {question.unitType === "number" && (
                  <div className="flex items-center ml-2">
                    <input
                      id={`${question.id}-unit`}
                      className="rounded-md border border-neutral-400 bg-white p-2"
                      onChange={handleChange}
                      value={homeEnergyData[`${question.id}-unit`] || ""}
                      type={question.unitType}
                      min={0}
                      step={0.1}
                    />
                    {/* Unit */}
                    {question.unit && (
                      <label
                        htmlFor={`${question.id}-unit`}
                        className="ml-2 text-gray-600"
                      >
                        {question.unit}
                      </label>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Note */}
            {question.id === "naturalGasAmt" && (
              <div className="bg-gray-200 p-4 rounded-md">
                <span className="text-xs text-gray-700">
                  <b>NOTE:</b> If you enter dollars, our calculations assume you
                  pay $10.68/thousand cubic feet.
                  <br />
                  $23 is about average in the United States for a household of
                  one person.
                </span>
              </div>
            )}
            {question.id === "electricity" && (
              <div className="bg-gray-200 p-4 rounded-md">
                <span className="text-xs text-gray-700">
                  <b>NOTE:</b> If you enter dollars, our calculations assume
                  that you pay 11.9 cents/kWh.
                  <br />
                  $44 is about average in the United States for a household of
                  one person.
                </span>
              </div>
            )}
            {question.id === "fuelOil" && (
              <div className="bg-gray-200 p-4 rounded-md">
                <span className="text-xs text-gray-700">
                  <b>NOTE:</b> If you enter your monthly fuel oil use in
                  gallons, you&apos;ll get a more accurate estimate. If you enter
                  dollars, our calculations assume that you pay $4.02/gallon.
                  <br />
                  $72 is about average in the United States for a household of
                  one person.
                </span>
              </div>
            )}
            {question.id === "propaneAmt" && (
              <div className="bg-gray-200 p-4 rounded-md">
                <span className="text-xs text-gray-700">
                  <b>NOTE:</b> If you enter dollars, our calculations assume
                  that you pay $2.47/gallon.
                  <br />
                  $37 is about average in the United States for a household of
                  one person.
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeEnergy;
