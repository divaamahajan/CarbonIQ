import { useState } from "react";
import { useRouter } from "next/router";
import Basics from "../components/Basics";
import HouseholdVehicles from "../components/HouseholdVehicles";
import HomeEnergy from "../components/HomeEnergy";
import WasteRecycle from "../components/WasteRecycle";
import "../app/globals.css";
import Header from "@/components/Header";
import PrevButton from "@/components/PrevButton";
import NextButton from "@/components/NextButton";
import { calculateEmissions, totalReduction } from "@/utils/utils";

const QuestionnairePage = () => {
  interface HouseholdVehiclesData {
    numVehicles: number;
    [key: string]: string | number;
  }
  const [step, setStep] = useState(1);
  const [basicData, setBasicData] = useState({});

  const [householdVehiclesData, setHouseholdVehiclesData] =
    useState<HouseholdVehiclesData>({
      numVehicles: 0,
    });
  const [homeEnergyData, setHomeEnergyData] = useState({});
  const [wasteRecycleData, setWasteRecycleData] = useState({});
  const [alert, setAlert] = useState("");
  const router = useRouter();
  const handleNext = () => {
    // console.log("homeEnergyData", homeEnergyData);
    if (
      step === 1 &&
      (!basicData.hasOwnProperty("numPeople") ||
        !basicData.hasOwnProperty("heatingSource"))
    ) {
      console.log("basicData", basicData);
      setAlert("Please enter the missing values");
      return;
    }
    if (step === 2 && householdVehiclesData.hasOwnProperty("numVehicles")) {
      const numVehicles = householdVehiclesData.numVehicles;
      for (let i = 0; i < numVehicles; i++) {
        if (
          !householdVehiclesData.hasOwnProperty(`milesDriven${i}`) ||
          !householdVehiclesData.hasOwnProperty(`unit${i}`)
        ) {
          console.log("householdVehiclesData", householdVehiclesData);
          setAlert("Please enter the missing values");
          return;
        }
      }
    }

    if (
      step === 3 &&
      (!homeEnergyData.hasOwnProperty("electricity") ||
        !homeEnergyData.hasOwnProperty("electricity-unit") ||
        !homeEnergyData.hasOwnProperty("fuelOil") ||
        !homeEnergyData.hasOwnProperty("fuelOil-unit") ||
        !homeEnergyData.hasOwnProperty("naturalGasAmt") ||
        !homeEnergyData.hasOwnProperty("naturalGasAmt-unit") ||
        !homeEnergyData.hasOwnProperty("portionGreenPower") ||
        !homeEnergyData.hasOwnProperty("propaneAmt") ||
        !homeEnergyData.hasOwnProperty("propaneAmt-unit"))
    ) {
      console.log("homeEnergyData", homeEnergyData);
      setAlert("Please enter the missing values");
      return;
    }

    if (
      step === 4 &&
      (!wasteRecycleData.hasOwnProperty("numPeople") ||
        !wasteRecycleData.hasOwnProperty("heatingSource"))
    ) {
      console.log("wasteRecycleData", wasteRecycleData);
      setAlert("Please enter the missing values");
      return;
    }
    setAlert("");
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    if (
      step === 4 &&
      (!wasteRecycleData.hasOwnProperty("recycleAluminumSteel") ||
        !wasteRecycleData.hasOwnProperty("recyclePlastic") ||
        !wasteRecycleData.hasOwnProperty("recycleGlass") ||
        !wasteRecycleData.hasOwnProperty("recycleNewsPaper") ||
        !wasteRecycleData.hasOwnProperty("recycleMagazines"))
    ) {
      console.log("wasteRecycleData", wasteRecycleData);
      setAlert("Please enter the missing values");
      return;
    }
    setAlert("");
    const emissions = calculateEmissions(
      householdVehiclesData,
      homeEnergyData,
      basicData,
      wasteRecycleData
    );
    const reductions = totalReduction(
      householdVehiclesData,
      homeEnergyData,
      basicData,
      wasteRecycleData
    );
    console.log("reductions", reductions);
    const queryData = { ...emissions, ...reductions };
    // Redirect to the result page with the questionnaire data
    router.push({
      pathname: "/results",
      query: queryData,
    });
  };

  const calculateProgress = () => {
    return ((step - 1) / 4) * 100; // Assuming there are 4 steps in total
  };

  const getBackgroundImage = () => {
    switch (step) {
      case 1:
        return "url('/images/Basics.png')";
      case 2:
        return "url('/images/HouseholdVehicles.png')";
      case 3:
        return "url('/images/HomeEnergy.png')";
      case 4:
        return "url('/images/WasteRecycle.png')";
      default:
        return "";
    }
  };
  return (
    <>
      <Header />
      <main
        // p-24
        className="min-h-screen bg-cover bg-center overflow-hidden justify-evenly flex min-h-screen flex-col items-center justify-evenly"
        style={{
          backgroundImage: getBackgroundImage(),
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
          minHeight: "80vh",
        }}
      >
        {step === 1 && (
          <div className="flex flex-col justify-evenly bg-opacity-75 bg-white p-4">
            <h1 className="text-green-900 font-inter text-4xl font-bold mb-8">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Let's get started!
            </h1>
            <p className="font-inter text-2xl leading-relaxed">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Ready to make a difference?
              <br />
              Answer a few questions to understand your environmental footprint
              and get personalized recommendations.
            </p>
          </div>
        )}
        <div>
          <div
            className="rounded-xl flex flex-col justify-center items-center border border-green-600 bg-opacity-75 bg-white p-6"
            style={{ background: "rgba(245, 245, 245, 0.85)" }}
          >
            {step === 1 && (
              <Basics basicData={basicData} setBasic={setBasicData} />
            )}
            {step === 2 && (
              <HouseholdVehicles
                householdVehiclesData={householdVehiclesData}
                setHouseholdVehiclesData={setHouseholdVehiclesData}
              />
            )}
            {step === 3 && (
              <HomeEnergy
                homeEnergyData={homeEnergyData}
                setHomeEnergyData={setHomeEnergyData}
              />
            )}
            {step === 4 && (
              <WasteRecycle
                wasteRecycleData={wasteRecycleData}
                setWasteRecycleData={setWasteRecycleData}
              />
            )}

            {alert && <div className="text-red-500">{alert}</div>}
          </div>
        </div>
        <div className="flex flex-row justify-evenly w-full mt-4 gap-4">
          {step !== 1 && <PrevButton onClick={handlePrev} />}
          <NextButton
            onClick={step === 4 ? handleSubmit : handleNext}
            isLastStep={step === 4}
          />
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
          <div
            className="h-full bg-green-700 rounded-full"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
          {/* </div> */}
        </div>
      </main>
    </>
  );
};

export default QuestionnairePage;
