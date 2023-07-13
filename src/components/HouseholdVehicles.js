import React, { useState } from "react";
import questionsHouseholdVehicles from "../api/questionsHouseholdVehicles";

const HouseholdVehicles = ({
  householdVehiclesData,
  setHouseholdVehiclesData,
}) => {
  const [numVehicles, setNumVehicles] = useState(
    householdVehiclesData.numVehicles || 0
  );

  const handleNumVehiclesChange = (e) => {
    const value = parseInt(e.target.value);
    setNumVehicles(value);
    setHouseholdVehiclesData((prevData) => ({
      ...prevData,
      numVehicles: value,
    }));
  };

  const handleMilesDrivenChange = (e, vehicleIndex) => {
    const value = e.target.value;
    const field = `milesDriven${vehicleIndex}`;
    setHouseholdVehiclesData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleUnitChange = (e, vehicleIndex) => {
    const value = e.target.value;
    const field = `unit${vehicleIndex}`;
    setHouseholdVehiclesData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="29"
          height="29"
          viewBox="0 0 29 29"
          fill="none"
        >
          <path
            d="M25.375 9.96871C25.1168 9.96954 24.8619 10.0258 24.6273 10.1336L22.5058 8.61839C22.6012 8.32247 22.6519 8.01397 22.6563 7.70308C22.6519 7.39219 22.6012 7.0837 22.5058 6.78777L24.6273 5.27252C24.9837 5.43359 25.3825 5.47498 25.7643 5.39051C26.1461 5.30605 26.4903 5.10026 26.7454 4.80392C27.0005 4.50758 27.1529 4.13662 27.1796 3.74652C27.2064 3.35641 27.1062 2.96812 26.8939 2.63972C26.6817 2.31131 26.3688 2.06044 26.0021 1.92463C25.6354 1.78881 25.2346 1.77534 24.8597 1.88623C24.4847 1.99713 24.1557 2.22643 23.9219 2.53984C23.6881 2.85325 23.562 3.23393 23.5625 3.62496C23.5625 3.68296 23.5743 3.73733 23.5797 3.79352L21.5026 5.27705C20.9387 4.79852 20.224 4.53439 19.4844 4.53121C18.6431 4.53121 17.8364 4.86539 17.2415 5.46023C16.6467 6.05507 16.3125 6.86185 16.3125 7.70308C16.3125 8.54432 16.6467 9.35109 17.2415 9.94594C17.8364 10.5408 18.6431 10.875 19.4844 10.875C20.224 10.8718 20.9387 10.6076 21.5026 10.1291L23.5797 11.6126C23.5743 11.6688 23.5625 11.7232 23.5625 11.7812C23.5625 12.1397 23.6688 12.4901 23.868 12.7882C24.0671 13.0862 24.3502 13.3186 24.6814 13.4557C25.0126 13.5929 25.377 13.6288 25.7286 13.5589C26.0802 13.4889 26.4032 13.3163 26.6566 13.0628C26.9101 12.8094 27.0827 12.4864 27.1527 12.1348C27.2226 11.7832 27.1867 11.4188 27.0495 11.0876C26.9123 10.7564 26.68 10.4733 26.382 10.2742C26.0839 10.075 25.7335 9.96871 25.375 9.96871ZM19.4844 9.06246C19.2155 9.06246 18.9527 8.98273 18.7291 8.83336C18.5056 8.68399 18.3314 8.47169 18.2285 8.22329C18.1256 7.9749 18.0987 7.70157 18.1511 7.43788C18.2036 7.17419 18.333 6.93197 18.5232 6.74186C18.7133 6.55175 18.9555 6.42228 19.2192 6.36983C19.4829 6.31737 19.7562 6.3443 20.0046 6.44718C20.253 6.55007 20.4653 6.72431 20.6147 6.94785C20.764 7.1714 20.8438 7.43422 20.8438 7.70308C20.8433 8.06346 20.6999 8.40895 20.4451 8.66378C20.1902 8.9186 19.8448 9.06198 19.4844 9.06246ZM26.5876 18.0651L19.5804 15.5467L16.6514 11.8691C16.3968 11.5577 16.0759 11.307 15.7123 11.135C15.3486 10.963 14.9512 10.8742 14.5489 10.875H7.30256C6.85938 10.8748 6.42288 10.9831 6.03114 11.1903C5.6394 11.3976 5.3043 11.6975 5.05506 12.064L2.59731 15.6735C2.08542 16.4248 1.81191 17.3129 1.8125 18.2219V23.5625C1.8125 23.8028 1.90798 24.0333 2.07794 24.2033C2.24789 24.3732 2.4784 24.4687 2.71875 24.4687H4.65994C4.85708 25.2465 5.30793 25.9363 5.94117 26.4291C6.57441 26.9218 7.35388 27.1894 8.15625 27.1894C8.95862 27.1894 9.73809 26.9218 10.3713 26.4291C11.0046 25.9363 11.4554 25.2465 11.6526 24.4687H17.3474C17.5446 25.2465 17.9954 25.9363 18.6287 26.4291C19.2619 26.9218 20.0414 27.1894 20.8438 27.1894C21.6461 27.1894 22.4256 26.9218 23.0588 26.4291C23.6921 25.9363 24.1429 25.2465 24.3401 24.4687H26.2813C26.5216 24.4687 26.7521 24.3732 26.9221 24.2033C27.092 24.0333 27.1875 23.8028 27.1875 23.5625V18.9179C27.1875 18.7313 27.1298 18.5492 27.0225 18.3966C26.9151 18.244 26.7632 18.1282 26.5876 18.0651ZM8.15625 25.375C7.79777 25.375 7.44734 25.2687 7.14928 25.0695C6.85122 24.8703 6.6189 24.5873 6.48172 24.2561C6.34454 23.9249 6.30864 23.5604 6.37858 23.2089C6.44851 22.8573 6.62114 22.5343 6.87462 22.2808C7.1281 22.0273 7.45106 21.8547 7.80265 21.7848C8.15424 21.7148 8.51867 21.7507 8.84986 21.8879C9.18106 22.0251 9.46413 22.2574 9.66329 22.5555C9.86245 22.8535 9.96875 23.204 9.96875 23.5625C9.96803 24.0429 9.77684 24.5035 9.43709 24.8433C9.09733 25.183 8.63673 25.3742 8.15625 25.375ZM20.8438 25.375C20.4853 25.375 20.1348 25.2687 19.8368 25.0695C19.5387 24.8703 19.3064 24.5873 19.1692 24.2561C19.032 23.9249 18.9961 23.5604 19.0661 23.2089C19.136 22.8573 19.3086 22.5343 19.5621 22.2808C19.8156 22.0273 20.1386 21.8547 20.4902 21.7848C20.8417 21.7148 21.2062 21.7507 21.5374 21.8879C21.8686 22.0251 22.1516 22.2574 22.3508 22.5555C22.5499 22.8535 22.6563 23.204 22.6563 23.5625C22.6558 24.043 22.4647 24.5038 22.1249 24.8436C21.785 25.1834 21.3243 25.3745 20.8438 25.375ZM25.375 22.6562H24.3401C24.1429 21.8784 23.6921 21.1886 23.0588 20.6958C22.4256 20.2031 21.6461 19.9355 20.8438 19.9355C20.0414 19.9355 19.2619 20.2031 18.6287 20.6958C17.9954 21.1886 17.5446 21.8784 17.3474 22.6562H11.6526C11.4554 21.8784 11.0046 21.1886 10.3713 20.6958C9.73809 20.2031 8.95862 19.9355 8.15625 19.9355C7.35388 19.9355 6.57441 20.2031 5.94117 20.6958C5.30793 21.1886 4.85708 21.8784 4.65994 22.6562H3.625V18.2219C3.6249 17.6763 3.78911 17.1432 4.09625 16.6922L6.55309 13.0844C6.63617 12.9621 6.7479 12.862 6.87853 12.7928C7.00916 12.7237 7.15474 12.6875 7.30256 12.6875H14.5489C14.6808 12.6869 14.8112 12.7154 14.9308 12.7708C15.0505 12.8263 15.1565 12.9073 15.2413 13.0083L18.3226 16.877C18.4274 17.0086 18.5667 17.1084 18.7249 17.1652L25.375 19.555V22.6562Z"
            fill="darkgreen"
            stroke="darkgreen"
            strokeWidth="1"
          />
        </svg>
        <span className="ml-2 text-green-900 font-semibold text-3xl leading-tight my-3">
          Household Vehicles
        </span>
      </div>
      <div>
        <label htmlFor="numVehicles" className="text-lg font-normal mr-2">
          How many vehicles does your household have?
        </label>
        <input
          type="number"
          min={0}
          step={1}
          value={numVehicles}
          onChange={handleNumVehiclesChange}
          className="rounded-md border border-neutral-400 bg-white p-2 mr-2"
        />
      </div>
      {Array.from({ length: numVehicles }).map((_, index) => (
        <div key={index}>
          <div className="mb-7">
            <span className="text-lg font-normal mb-2">
              Vehicle {index + 1}
            </span>

            <div className="flex items-center mb-2">
              <input
                type="number"
                min={1}
                step={1}
                id={`milesDriven${index}`}
                value={householdVehiclesData[`milesDriven${index}`] || ""}
                onChange={(e) => handleMilesDrivenChange(e, index)}
                className="rounded-md border border-neutral-400 bg-white p-2 mr-2"
              />
              <label htmlFor={`milesDriven${index}`} className="ml-2">
                Miles driven per week
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="number"
                min={1}
                step={1}
                id={`unit${index}`}
                value={householdVehiclesData[`unit${index}`] || ""}
                onChange={(e) => handleUnitChange(e, index)}
                className="rounded-md border border-neutral-400 bg-white p-2 mr-2"
              />
              <label htmlFor={`unit${index}`} className="ml-2">
                Fuel economy (Miles per Gallon)
              </label>
            </div>
          </div>
        </div>
      ))}
      {numVehicles > 0 && (
        <div className="bg-gray-200 p-4 rounded-md">
          <span className="text-xs text-gray-700">
            <b>NOTE:</b> If you don’t know your car’s fuel economy (Miles per
            Gallon), you can look it up at{" "}
            <a
              href="https://www.fueleconomy.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              fueleconomy.gov
            </a>
            .<br /> The national average is 21.6 miles per gallon.
          </span>
        </div>
      )}
    </div>
  );
};

export default HouseholdVehicles;
