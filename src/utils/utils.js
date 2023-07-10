const EF_passenger_vehicle = 19.6;
const nonCO2_vehicle_emissions_ratio = 1.01;
const Natural_gas_cost_1000CF = 10.68;
const EF_natural_gas = 119.58;
const EF_natural_gas_therm = 11.68890913;
const costPerKWh = 0.1188;
const eFactorValue = 0.6132845;
const fuelOilCost = 4.02;
const EF_fuel_oil_gallon = 22.61;
const propaneCost = 2.47;
const EF_propane = 12.43;
const averageWasteEmissions = 691.5;
const newspaperRecyclingAvoidedEmissions = -113.14;
const metalRecyclingAvoidedEmissions = -89.38;
const plasticRecyclingAvoidedEmissions = -35.56;
const magRecyclingAvoidedEmissions = -27.46;
const glassRecyclingAvoidedEmissions = -25.39;
const heating_percent_electricity = 0.09;
const heating_percent_fuel_oil = 0.87;
const heating_percent_NG = 0.63;
const heating_percent_propane = 0.7;
const AC_electricity_percent = 0.14;
const thermostat_cooling_savings = 0.06;
const thermostat_heating_savings = 0.03;
const computer_sleep_savings = 107.1;
const kWh_per_load_laundry = 0.96;
const dryer_energy = 769;
export function calculateHouseholdVehicleEmissions(
  milesDriven,
  milesPerGallon
) {
  if (milesDriven === 0) {
    return 0;
  } else {
    const weeksInYear = 52;
    return (
      (milesDriven * weeksInYear) /
      (milesPerGallon * EF_passenger_vehicle * nonCO2_vehicle_emissions_ratio)
    );
  }
}

export function calculateNaturalGasEmission(
  naturalGasConsumption,
  consumptionUnit
) {
  let emissions = 0;

  if (consumptionUnit === "dollars") {
    emissions =
      (naturalGasConsumption / Natural_gas_cost_1000CF) * EF_natural_gas * 12;
  } else if (consumptionUnit === "thousandCubicFeet") {
    emissions = EF_natural_gas * naturalGasConsumption * 12;
  } else if (consumptionUnit === "therms") {
    emissions = EF_natural_gas_therm * naturalGasConsumption * 12;
  }

  return emissions;
}

export function calculateElectricityEmission(
  electricityUsed,
  consumptionUnit,
  hasGreenPower,
  greenPowerPercentage
) {
  const portionGreenPower = greenPowerPercentage / 100;
  if (hasGreenPower) {
    if (consumptionUnit === "kilowattHours") {
      return (
        (electricityUsed / costPerKWh) *
        eFactorValue *
        12 *
        (1 - portionGreenPower)
      );
    }
    if (consumptionUnit === "dollars") {
      return electricityUsed * 12 * (1 - portionGreenPower) * eFactorValue;
    }
  } else {
    if (consumptionUnit === "kilowattHours") {
      return (electricityUsed / costPerKWh) * eFactorValue * 12;
    }
    if (consumptionUnit === "dollars") {
      return electricityUsed * eFactorValue * 12;
    }
  }

  return 0;
}

export function calculateFuelOilEmission(fuelOilUsed, consumptionUnit) {
  if (consumptionUnit === "dollars") {
    // Dollars
    return (fuelOilUsed / fuelOilCost) * EF_fuel_oil_gallon * 12;
  } else if (consumptionUnit === "gallons") {
    // Gallons
    return EF_fuel_oil_gallon * fuelOilUsed * 12;
  }

  return 0;
}

export function calculatePropaneEmission(propaneUsed, consumptionUnit) {
  if (consumptionUnit === "dollars") {
    return (propaneUsed / propaneCost) * EF_propane * 12;
  } else if (consumptionUnit === "gallons") {
    return EF_propane * propaneUsed * 12;
  }

  return 0;
}

export function calculateWasteEmissionsAfterRecycling(
  numPeople,
  recycleAluminumSteel,
  recyclePlastic,
  recycleGlass,
  recycleNewsPaper,
  recycleMagazines
) {
  recycleAluminumSteel = recycleAluminumSteel === "false" ? false : true;
  recyclePlastic = recyclePlastic === "false" ? false : true;
  recycleGlass = recycleGlass === "false" ? false : true;
  recycleNewsPaper = recycleNewsPaper === "false" ? false : true;
  recycleMagazines = recycleMagazines === "false" ? false : true;

  console.log(
    recycleAluminumSteel,
    recyclePlastic,
    recycleGlass,
    recycleNewsPaper,
    recycleMagazines
  );
  const aluminumSteelEmissions = recycleAluminumSteel
    ? metalRecyclingAvoidedEmissions
    : 0;
  const plasticEmissions = recyclePlastic
    ? plasticRecyclingAvoidedEmissions
    : 0;
  const glassEmissions = recycleGlass ? glassRecyclingAvoidedEmissions : 0;
  const newspaperEmissions = recycleNewsPaper
    ? newspaperRecyclingAvoidedEmissions
    : 0;
  const magazinesEmissions = recycleMagazines
    ? magRecyclingAvoidedEmissions
    : 0;

  const totalWasteEmissionsAfterRecycling =
    numPeople *
    (averageWasteEmissions +
      aluminumSteelEmissions +
      plasticEmissions +
      glassEmissions +
      newspaperEmissions +
      magazinesEmissions);
  console.log("averageWasteEmissions:", averageWasteEmissions);
  console.log("aluminumSteelEmissions:", aluminumSteelEmissions);
  console.log("plasticEmissions:", plasticEmissions);
  console.log("glassEmissions:", glassEmissions);
  console.log("newspaperEmissions:", newspaperEmissions);
  console.log("magazinesEmissions:", magazinesEmissions);

  console.log(
    "totalWasteEmissionsAfterRecycling",
    totalWasteEmissionsAfterRecycling
  );
  return totalWasteEmissionsAfterRecycling;
}

export const calculateEmissions = (
  householdVehiclesData,
  homeEnergyData,
  basicData,
  recycleData
) => {
  let vehicleEmissions = 0;
  const numVehicles = householdVehiclesData.numVehicles;

  if (numVehicles > 0) {
    for (let i = 0; i < numVehicles; i++) {
      vehicleEmissions += calculateHouseholdVehicleEmissions(
        householdVehiclesData[`milesDriven${i}`],
        householdVehiclesData[`unit${i}`]
      );
    }
  }

  let hasGreenPower = false;
  if (homeEnergyData.portionGreenPower > 0) {
    hasGreenPower = true;
  }

  // const homeEnergyEmissions =
  //   calculateNaturalGasEmission(
  //     homeEnergyData.naturalGasAmt,
  //     homeEnergyData["naturalGasAmt-unit"]
  //   ) +
  //   calculateFuelOilEmission(
  //     homeEnergyData.fuelOil,
  //     homeEnergyData["fuelOil-unit"]
  //   ) +
  //   calculatePropaneEmission(
  //     homeEnergyData.propaneAmt,
  //     homeEnergyData["propaneAmt-unit"]
  //   ) +
  //   calculateElectricityEmission(
  //     homeEnergyData.electricity,
  //     homeEnergyData["electricity-unit"],
  //     hasGreenPower,
  //     homeEnergyData.portionGreenPower
  //   );
  const naturalGasEmission = calculateNaturalGasEmission(
    homeEnergyData.naturalGasAmt,
    homeEnergyData["naturalGasAmt-unit"]
  );
  const fuelOilEmission = calculateFuelOilEmission(
    homeEnergyData.fuelOil,
    homeEnergyData["fuelOil-unit"]
  );
  const propaneEmission = calculatePropaneEmission(
    homeEnergyData.propaneAmt,
    homeEnergyData["propaneAmt-unit"]
  );
  const electricityEmission = calculateElectricityEmission(
    homeEnergyData.electricity,
    homeEnergyData["electricity-unit"],
    hasGreenPower,
    homeEnergyData.portionGreenPower
  );
  const wasteEmissions = calculateWasteEmissionsAfterRecycling(
    basicData.numPeople,
    recycleData.recycleAluminumSteel,
    recycleData.recyclePlastic,
    recycleData.recycleGlass,
    recycleData.recycleNewsPaper,
    recycleData.recycleMagazines
  );
  return {
    numVehicles,
    vehicleEmissions,
    naturalGasEmission,
    fuelOilEmission,
    propaneEmission,
    electricityEmission,
    wasteEmissions,
  };
};

export const calculateVehiclesReduction = (householdVehiclesData) => {
  let vehiclesReduction = {};
  if (householdVehiclesData.numVehicles > 0) {
    const numVehicles = householdVehiclesData.numVehicles;
    for (let i = 0; i < numVehicles; i++) {
      // Reduce Miles Driven
      const reductionMilesDriven =
        (52 / householdVehiclesData[`unit${i}`]) *
        EF_passenger_vehicle *
        nonCO2_vehicle_emissions_ratio;

      // Increase miles per Gallon
      const reductionMilesPerGallon =
        householdVehiclesData[`milesDriven${i}`] *
        52 *
        EF_passenger_vehicle *
        nonCO2_vehicle_emissions_ratio *
        (1 / householdVehiclesData[`unit${i}`] -
          1 / (householdVehiclesData[`unit${i}`] + 1));

      vehiclesReduction[`Vehicle${i}`] = [
        reductionMilesDriven,
        reductionMilesPerGallon,
      ];
    }
  }
  return vehiclesReduction;
};

export const calculateHomeEnergyReduction = (homeEnergyData, heatingSource) => {
  let hasGreenPower = false;
  if (homeEnergyData.portionGreenPower > 0) {
    hasGreenPower = true;
  }

  const electricEmission = calculateElectricityEmission(
    homeEnergyData.electricity,
    homeEnergyData["electricity-unit"],
    hasGreenPower,
    homeEnergyData.portionGreenPower
  );

  let perDegreeThermostatReduction = 0;
  let perDegreeACReduction = 0;
  let computerSleep = 0;
  let perLoadLaundry = 0;
  let perDryerLaundry = 0;
  let perPercentGreenPower = 0;

  switch (heatingSource) {
    case "naturalGas":
      perDegreeThermostatReduction =
        calculateNaturalGasEmission(
          homeEnergyData.naturalGasAmt,
          homeEnergyData["naturalGasAmt-unit"]
        ) *
        heating_percent_NG *
        thermostat_heating_savings;
      break;

    case "electricHeat":
      perDegreeThermostatReduction =
        electricEmission *
        heating_percent_electricity *
        thermostat_heating_savings;
      break;

    case "oil":
      perDegreeThermostatReduction =
        calculateFuelOilEmission(
          homeEnergyData.fuelOil,
          homeEnergyData["fuelOil-unit"]
        ) *
        heating_percent_fuel_oil *
        thermostat_heating_savings;
      break;

    case "propane":
      perDegreeThermostatReduction =
        calculatePropaneEmission(
          homeEnergyData.propaneAmt,
          homeEnergyData["propaneAmt-unit"]
        ) *
        heating_percent_propane *
        thermostat_heating_savings;
      break;

    default:
      perDegreeThermostatReduction = 0;
      break;
  }
  perDegreeACReduction =
    electricEmission * AC_electricity_percent * thermostat_cooling_savings;
  computerSleep = computer_sleep_savings * eFactorValue;
  perLoadLaundry = kWh_per_load_laundry * eFactorValue * 52;
  perDryerLaundry = (dryer_energy / 2) * eFactorValue;
  perPercentGreenPower = electricEmission;
  const homeReduction = {
    perDegreeThermostatReduction,
    perDegreeACReduction,
    computerSleep,
    perLoadLaundry,
    perDryerLaundry,
    perPercentGreenPower,
  };
  return homeReduction;
};

const calculateWasteRedcuction = (numPeople, recycleData) => {
  let recycleMaterial = [];
  recycleData.recycleAluminumSteel =
    recycleData.recycleAluminumSteel === "false" ? false : true;
  recycleData.recyclePlastic =
    recycleData.recyclePlastic === "false" ? false : true;
  recycleData.recycleGlass =
    recycleData.recycleGlass === "false" ? false : true;
  recycleData.recycleNewsPaper =
    recycleData.recycleNewsPaper === "false" ? false : true;
  recycleData.recycleMagazines =
    recycleData.recycleMagazines === "false" ? false : true;

  const aluminumSteelEmissions = recycleData.recycleAluminumSteel
    ? 0
    : metalRecyclingAvoidedEmissions;
  const plasticEmissions = recycleData.recyclePlastic
    ? 0
    : plasticRecyclingAvoidedEmissions;

  const glassEmissions = recycleData.recycleGlass
    ? 0
    : glassRecyclingAvoidedEmissions;

  const newspaperEmissions = recycleData.recycleNewsPaper
    ? 0
    : newspaperRecyclingAvoidedEmissions;
  const magazinesEmissions = recycleData.recycleMagazines
    ? 0
    : magRecyclingAvoidedEmissions;

  aluminumSteelEmissions && recycleMaterial.push("Aluminum & Steel");
  plasticEmissions && recycleMaterial.push("Plastic");
  glassEmissions && recycleMaterial.push("Glass");
  newspaperEmissions && recycleMaterial.push("Newspaper");
  magazinesEmissions && recycleMaterial.push("Magazines");

  const totalWasteReduction =
    numPeople *
    (averageWasteEmissions +
      aluminumSteelEmissions +
      plasticEmissions +
      glassEmissions +
      newspaperEmissions +
      magazinesEmissions);

  return { recycleMaterial, totalWasteReduction };
};

export function totalReduction(
  householdVehiclesData,
  homeEnergyData,
  basicData,
  recycleData
) {
  const vehiclesReduction = calculateVehiclesReduction(householdVehiclesData);
  const homeReduction = calculateHomeEnergyReduction(
    homeEnergyData,
    basicData.heatingSource
  );
  const WasteReduction = calculateWasteRedcuction(
    basicData.numPeople,
    recycleData
  );
  const allVehicles = { ...vehiclesReduction };
  console.log("allVehicles", allVehicles);
  const allReductions = {
    ...allVehicles,
    ...homeReduction,
    ...WasteReduction,
  };
  console.log("allReductions", allReductions);

  return allReductions;
}
