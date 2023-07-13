import { useState } from "react";

const recommendations = ({
  recommend,
  showAllRecommendations,
  setShowAllRecommendations,
}) => {
  const {
    vehicleEmissions,
    naturalGasEmission,
    fuelOilEmission,
    propaneEmission,
    electricityEmission,
    vehicleReduction,
    perDegreeThermostatReduction,
    perDegreeACReduction,
    computerSleep,
    perLoadLaundry,
    perDryerLaundry,
    perPercentGreenPower,
    recycleMaterial,
    totalWasteReduction,
  } = recommend;
  let recommendList = [];

  const handleShowLessRecommendations = () => {
    setShowAllRecommendations(false);
  };
  const handleShowAllRecommendations = () => {
    setShowAllRecommendations(true);
  };

  const generateWordSentence = (wordList) => {
    if (!Array.isArray(wordList)) {
      return "";
    }
    const length = wordList.length;
    if (length === 0) {
      return "";
    } else if (length === 1) {
      return wordList[0];
    } else if (length === 2) {
      return wordList.join(" and ");
    } else {
      const lastItem = wordList[length - 1];
      const otherItems = wordList.slice(0, length - 1).join(", ");
      return `${otherItems}, and ${lastItem}`;
    }
  };
  // Recycle
  const recycleMaterialSentence = generateWordSentence(recycleMaterial);
  if (recycleMaterialSentence) {
    recommendList.push(`We recommend that you start recycling ${recycleMaterialSentence}. 
  By doing so, you can reduce your annual CO2 emissions by ${Number(
    totalWasteReduction
  ).toFixed(2)} pounds.`);
  }

  // Vehicle
  if (vehicleEmissions <= 10484) {
    recommendList.push(`Your annual vehicle emissions amount to ${Number(
      vehicleEmissions
    ).toFixed(2)} pounds. 
    Great job! This is about the average emissions per vehicle over a year in United States, 
    which is 10,484 pounds.`);
  } else {
    recommendList.push(`Your annual vehicle emissions amount to ${Number(
      vehicleEmissions
    ).toFixed(2)} pounds, 
    which exceeds the average of 10,484 pounds per vehicle over a year in the United States. 
    We recommend reducing your weekly mileage to lower your emissions. 
    Additionally, you may consider switching to a vehicle with better fuel efficiency as an alternative measure.`);
    Object.entries(vehicleReduction).forEach(([vehicle, value]) => {
      const [reductionMilesDriven, reductionMilesPerGallon] = value;
      let rec = `For every mile you eliminate from your weekly driving with ${vehicle}, 
    you can reduce your annual CO2 emissions by ${Number(
      reductionMilesDriven
    ).toFixed(2)}} pounds. 
    Alternatively, increasing your vehicle's mileage per gallon by one will reduce your annual CO2 emissions by ${reductionMilesPerGallon} pounds`;
      recommendList.push(rec);
    });

    console.log("recommendList", recommendList);
    recommendList.push(
      `Walking, biking, carpooling, telecommuting, and using mass transit are good options.`
    );
  }

  // Home Energy
  const averageNaturalGasEmission = 3071;
  const averageFuelOilEmission = 4848;
  const averagePropaneEmission = 2243;
  const averageElectricityEmission = 5455;

  const recommendations = [
    {
      emission: Number(naturalGasEmission).toFixed(2),
      average: averageNaturalGasEmission,
      type: "Natural Gas",
    },
    {
      emission: Number(fuelOilEmission).toFixed(2),
      average: averageFuelOilEmission,
      type: "Fuel Oil",
    },
    {
      emission: Number(propaneEmission).toFixed(2),
      average: averagePropaneEmission,
      type: "Propane",
    },
    {
      emission: Number(electricityEmission).toFixed(2),
      average: averageElectricityEmission,
      type: "Electricity",
    },
  ];

  recommendations.forEach(({ emission, average, type }) => {
    if (emission <= average) {
      recommendList.push(
        `Your annual ${type} emissions amount to ${emission} pounds. Great job! ${average} pounds is about average for a household of one person over a year.`
      );
    } else {
      recommendList.push(
        `Your annual ${type} emissions amount to ${emission} pounds, which exceeds the average of ${average} pounds for a household of one person over a year. We recommend exploring energy-efficient options and reducing your ${type} usage.`
      );
    }

    // Add specific recommendations for each type of emissions
    switch (type) {
      case "Natural Gas":
        recommendList.push(
          "Consider improving the insulation of your home and upgrading to an energy-efficient heating system to reduce your natural gas consumption."
        );
        break;
      case "Fuel Oil":
        recommendList.push(
          "Explore alternative heating options such as geothermal or solar energy to decrease your reliance on fuel oil."
        );
        break;
      case "Propane":
        recommendList.push(
          "Upgrade to energy-efficient appliances and consider using propane sparingly for optimal emission reduction."
        );
        break;
      case "Electricity":
        recommendList.push(
          "Switch to energy-efficient lighting, appliances, and electronics to lower your electricity consumption."
        );
        break;
      default:
        break;
    }
  });

  // Genral
  recommendList.push(`For every degree Fahrenheit you lower your household's heating thermostat on winter nights, 
  you can reduce your annual CO2 emissions by ${Number(
    perDegreeThermostatReduction
  ).toFixed(2)} pounds.`);
  recommendList.push(`For every degree Fahrenheit you raise your household's air conditioner thermostat in summer, 
  you can reduce your annual CO2 emissions by ${Number(
    perDegreeACReduction
  ).toFixed(2)} pounds.`);
  recommendList.push(`By enabling the sleep feature on your computer and monitor, 
  you can reduce your annual CO2 emissions by ${Number(computerSleep).toFixed(
    2
  )} pounds.`);
  recommendList.push(`We recommend washing clothes in cold water instead of hot. 
  By doing so, for each weekly load, you can reduce your annual CO2 emissions by ${Number(
    perLoadLaundry
  ).toFixed(2)} pounds.`);
  recommendList.push(`Consider using a clothesline or drying rack for 50% of your laundry instead of relying solely on your dryer. 
  By doing so, you can reduce your annual CO2 emissions by ${Number(
    perDryerLaundry
  ).toFixed(2)} pounds.`);
  recommendList.push(`For every percentage point of your household's current electricity use that you substitute with green power, 
  you can reduce your annual CO2 emissions by ${Number(
    perPercentGreenPower
  ).toFixed(2)} pounds.`);

  return (
    <div>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="33"
          viewBox="0 0 32 33"
          fill="none"
        >
          <path
            d="M4 4.99214C4 4.77997 4.08429 4.57648 4.23431 4.42645C4.38434 4.27642 4.58783 4.19214 4.8 4.19214H27.2C27.4122 4.19214 27.6157 4.27642 27.7657 4.42645C27.9157 4.57648 28 4.77997 28 4.99214V23.3921C28 23.4972 27.9793 23.6012 27.9391 23.6983C27.8989 23.7953 27.84 23.8835 27.7657 23.9578C27.6914 24.0321 27.6032 24.091 27.5061 24.1312C27.4091 24.1714 27.3051 24.1921 27.2 24.1921H21.68C21.5706 24.192 21.4623 24.2143 21.3619 24.2576C21.2614 24.3009 21.1709 24.3644 21.096 24.4441L16.5827 29.2401C16.5079 29.3196 16.4176 29.383 16.3174 29.4263C16.2172 29.4696 16.1092 29.492 16 29.492C15.8908 29.492 15.7828 29.4696 15.6826 29.4263C15.5824 29.383 15.4921 29.3196 15.4173 29.2401L10.904 24.4441C10.8291 24.3644 10.7386 24.3009 10.6381 24.2576C10.5377 24.2143 10.4294 24.192 10.32 24.1921H4.8C4.58783 24.1921 4.38434 24.1079 4.23431 23.9578C4.08429 23.8078 4 23.6043 4 23.3921V4.99214Z"
            stroke="darkgreen"
            stroke-width="1.5"
          />
          <path
            d="M15.9998 9.52539L17.8998 12.9587L21.3332 14.8587L17.8998 16.7587L15.9998 20.1921L14.0998 16.7587L10.6665 14.8587L14.0998 12.9587L15.9998 9.52539Z"
            stroke="darkgreen"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <h1 className="ml-2 text-green-900 font-semibold text-2xl leading-tight my-3">
          Reccomandations
        </h1>
      </div>
      <div className="flex flex-col justify-center">
        <ul className="list-disc text-justify">
          {recommendList.slice(0, 7).map((item) => (
            <li key={item}>{item}</li>
          ))}
          {showAllRecommendations &&
            recommendList.map((item) => <li key={item}>{item}</li>)}
        </ul>

        <div className="flex justify-end items-center mt-4">
          {!showAllRecommendations && recommendList.length > 5 && (
            <button
              onClick={handleShowAllRecommendations}
              className="text-green-900 font-inter text-16 font-semibold underline inline-flex justify-end"
            >
              Show more recommendations
            </button>
          )}
          {showAllRecommendations && (
            <button
              onClick={handleShowLessRecommendations}
              className="text-green-900 font-inter text-16 font-semibold underline inline-flex text-end"
            >
              Show less recommendations
            </button>
          )}
        </div>
        <span className="text-green-900 font-bold mt-6  text-center">
          {"Thank you for making a positive impact on the environment!"}
        </span>
      </div>
    </div>
  );
};

export default recommendations;
