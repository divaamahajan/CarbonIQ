import React, { useState } from "react";
import "../app/globals.css";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import CalcAgainButton from "@/components/CalcAgainButton";
import Overview from "@/components/Overview";
import Recommendations from "@/components/Recommendations";
const Results = () => {
  const router = useRouter();
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);
  const {
    numVehicles,
    vehicleEmissions,
    naturalGasEmission,
    fuelOilEmission,
    propaneEmission,
    electricityEmission,
    wasteEmissions,
    perDegreeThermostatReduction,
    perDegreeACReduction,
    computerSleep,
    perLoadLaundry,
    perDryerLaundry,
    perPercentGreenPower,
    recycleMaterial,
    totalWasteReduction,
  } = router.query; // Access the emissions query parameter

  const handleQuestionPage = () => {
    router.push({
      pathname: "/questionnaire",
    });
  };

  let vehicleReduction: Record<string, string[]> = {};
  const count = Number(numVehicles) || 0;

  if (count > 0) {
    for (let i = 0; i < count; i++) {
      const vehicleKey = `Vehicle${i}`;
      if (router.query.hasOwnProperty(vehicleKey)) {
        const value = router.query[vehicleKey];
        if (Array.isArray(value)) {
          vehicleReduction[vehicleKey] = value;
        }
      }
    }
  }

  // console.log("numVehicles:", numVehicles);
  // console.log("vehicleEmissions:", vehicleEmissions);
  // console.log("homeEnergyEmissions:", homeEnergyEmissions);
  // console.log("wasteEmissions:", wasteEmissions);
  // console.log("vehicleReduction", vehicleReduction)
  // console.log("perDegreeThermostatReduction:", perDegreeThermostatReduction);
  // console.log("perDegreeACReduction:", perDegreeACReduction);
  // console.log("computerSleep:", computerSleep);
  // console.log("perLoadLaundry:", perLoadLaundry);
  // console.log("perDryerLaundry:", perDryerLaundry);
  // console.log("perPercentGreenPower:", perPercentGreenPower);
  // console.log("recycleMaterial:", recycleMaterial);
  // console.log("totalWasteReduction:", totalWasteReduction);

  const recommend = {
    vehicleEmissions,
    naturalGasEmission,
    fuelOilEmission,
    propaneEmission,
    electricityEmission,
    wasteEmissions,
    vehicleReduction,
    perDegreeThermostatReduction,
    perDegreeACReduction,
    computerSleep,
    perLoadLaundry,
    perDryerLaundry,
    perPercentGreenPower,
    recycleMaterial,
    totalWasteReduction,
  };

  const totalEmissions = (
    (parseFloat(vehicleEmissions as string) || 0) +
    (parseFloat(naturalGasEmission as string) || 0) +
    (parseFloat(fuelOilEmission as string) || 0) +
    (parseFloat(propaneEmission as string) || 0) +
    (parseFloat(electricityEmission as string) || 0) +
    (parseFloat(wasteEmissions as string) || 0)
  ).toFixed(2);

  return (
    <>
      <Header />
      <main
        className="min-h-screen bg-cover bg-center overflow-hidden container mx-auto px-4 py-8 justify-evenly items-center min-h-screen"
        style={{
          backgroundImage: "url('/images/results.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
          minHeight: "80vh",
        }}
      >
        <div className="flex flex-col  justify-evenly bg-opacity-75 bg-white p-4">
          <h1 className="text-green-900 font-inter text-4xl font-bold leading-relaxed mb-4">
            {"Your carbon footprint Results"}
          </h1>
          <p className="font-inter text-2xl leading-relaxed">
            <span className="text-green-900 font-bold">
              {"Congratulations!"}
            </span>{" "}
            {
              "It's time to unveil the results of your efforts. Get ready to see the impact you've made on reducing your carbon footprint."
            }
          </p>
        </div>

        <div
          className="rounded-xl flex flex-col justify-evenly items-center border border-green-600 bg-opacity-75 bg-white p-6 mb-4"
          style={{ background: "rgba(245, 245, 245, 0.85)" }}
        >
          <div className="flex justify-evenly items-center">
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="129"
                height="129"
                viewBox="0 0 129 129"
                fill="none"
              >
                <path
                  d="M90.7394 51.1524L66.5519 36.8415C65.9306 36.4734 65.2216 36.2796 64.4994 36.2803C63.7773 36.281 63.0687 36.4762 62.4481 36.8455L38.2606 51.1565C37.6575 51.5122 37.1577 52.0191 36.8106 52.6271C36.4634 53.2351 36.281 53.9232 36.2813 54.6234V82.439C36.2813 83.866 37.0351 85.1843 38.2606 85.9058L62.4481 100.217C63.0679 100.589 63.7771 100.785 64.5 100.785C65.2229 100.785 65.9321 100.589 66.5519 100.217L90.7394 85.9058C91.3425 85.5502 91.8423 85.0433 92.1894 84.4352C92.5366 83.8272 92.719 83.1391 92.7188 82.439V54.6234C92.7189 53.9227 92.5364 53.2341 92.1894 52.6254C91.8423 52.0168 91.3425 51.5091 90.7394 51.1524ZM84.6562 80.1412L64.5 92.0656L44.3438 80.1412V56.9212L64.5 44.9967L84.6562 56.9212V80.1412Z"
                  fill="darkgreen"
                />
                <path
                  d="M24.1875 81.3668V44.6259L49.1812 29.8554L45.0815 22.9136L18.1043 38.8572C17.5012 39.2139 17.0015 39.7215 16.6544 40.3302C16.3073 40.9388 16.1248 41.6275 16.125 42.3281V81.3668C13.7738 82.1955 11.7368 83.7315 10.2932 85.764C8.84971 87.7965 8.07049 90.2258 8.0625 92.7188C8.0625 99.3864 13.4886 104.812 20.1562 104.812C26.8239 104.812 32.25 99.3864 32.25 92.7188C32.242 90.2258 31.4628 87.7965 30.0193 85.764C28.5757 83.7315 26.5387 82.1955 24.1875 81.3668ZM20.1562 96.75C19.1183 96.7036 18.1382 96.2586 17.4201 95.5076C16.7021 94.7567 16.3013 93.7578 16.3013 92.7188C16.3013 91.6797 16.7021 90.6808 17.4201 89.9299C18.1382 89.1789 19.1183 88.7339 20.1562 88.6875C21.1942 88.7339 22.1743 89.1789 22.8924 89.9299C23.6104 90.6808 24.0112 91.6797 24.0112 92.7188C24.0112 93.7578 23.6104 94.7567 22.8924 95.5076C22.1743 96.2586 21.1942 96.7036 20.1562 96.75ZM108.844 80.625C102.176 80.625 96.75 86.0511 96.75 92.7188C96.75 94.1418 97.0402 95.4882 97.4958 96.7581L64.5 116.253L38.6839 100.999L34.5841 107.941L62.4481 124.404C63.0687 124.774 63.7773 124.969 64.4994 124.97C65.2216 124.97 65.9306 124.776 66.5519 124.408L102.672 103.063C104.486 104.147 106.582 104.812 108.844 104.812C115.511 104.812 120.938 99.3864 120.938 92.7188C120.938 86.0511 115.511 80.625 108.844 80.625ZM108.844 96.75C107.806 96.7036 106.826 96.2586 106.108 95.5076C105.39 94.7567 104.989 93.7578 104.989 92.7188C104.989 91.6797 105.39 90.6808 106.108 89.9299C106.826 89.1789 107.806 88.7339 108.844 88.6875C109.882 88.7339 110.862 89.1789 111.58 89.9299C112.298 90.6808 112.699 91.6797 112.699 92.7188C112.699 93.7578 112.298 94.7567 111.58 95.5076C110.862 96.2586 109.882 96.7036 108.844 96.75ZM64.5 28.2188C67.4468 28.2188 70.1115 27.1182 72.2118 25.3646L104.812 44.63V72.5625H112.875V42.3281C112.875 41.6275 112.693 40.9388 112.346 40.3302C111.999 39.7215 111.499 39.2139 110.896 38.8572L76.3599 18.451C76.5051 17.6972 76.5938 16.9232 76.5938 16.125C76.5938 9.45731 71.1677 4.03125 64.5 4.03125C57.8323 4.03125 52.4062 9.45731 52.4062 16.125C52.4062 22.7927 57.8323 28.2188 64.5 28.2188ZM64.5 12.0938C65.2984 12.093 66.0792 12.329 66.7434 12.7721C67.4076 13.2152 67.9254 13.8454 68.2314 14.5829C68.5373 15.3204 68.6175 16.1321 68.462 16.9153C68.3064 17.6984 67.922 18.4178 67.3574 18.9824C66.7928 19.547 66.0734 19.9314 65.2903 20.087C64.5071 20.2425 63.6954 20.1623 62.9579 19.8564C62.2204 19.5505 61.5902 19.0326 61.1471 18.3684C60.704 17.7042 60.468 16.9234 60.4688 16.125C60.4688 13.8997 62.2788 12.0938 64.5 12.0938Z"
                  fill="darkgreen"
                />
              </svg>
            </div>
            <div className="text-green-900 font-inter text-2xl font-bold">
              {"19,702 Pounds of CO2"}
            </div>
            <div className="text-gray-700 font-inter text-lg">
              {
                "is about average in the United States for a household of one person over a year."
              }
              <div className="text-green-900 font-inter text-xl font-bold">
                {"Your emission is "} {totalEmissions} {" Pounds of CO2"}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-evenly items-center">
          <div
            className="rounded-xl items-center border border-green-600 bg-opacity-75 bg-white p-6 mr-4"
            style={{ background: "rgba(245, 245, 245, 0.85)" }}
          >
            <Overview
              emissions={{
                vehicleEmissions,
                naturalGasEmission,
                fuelOilEmission,
                propaneEmission,
                electricityEmission,
                wasteEmissions,
              }}
            />
          </div>
          <div
            className="rounded-xl border border-green-600 bg-opacity-75 bg-white p-6 ml-4"
            style={{ background: "rgba(245, 245, 245, 0.85)" }}
          >
            <Recommendations
              recommend={recommend}
              showAllRecommendations={showAllRecommendations}
              setShowAllRecommendations={setShowAllRecommendations}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <CalcAgainButton onClick={handleQuestionPage} />
        </div>
      </main>
    </>
  );
};

export default Results;
