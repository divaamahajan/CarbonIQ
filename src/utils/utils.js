export function calculateHouseholdVehicleEmissions(
  milesDriven,
  milesPerGallon,
  EF_passenger_vehicle = 19.6,
  nonCO2_vehicle_emissions_ratio = 1.01
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
  const Natural_gas_cost_1000CF = 10.68;
  const Natural_gas_cost_therm = 1.04;
  const EF_natural_gas = 119.58;
  const EF_natural_gas_therm = 11.68890913;

  let emissions = 0;

  // console.log("consumptionUnit", consumptionUnit);
  if (consumptionUnit === "dollars") {
    // dollars
    emissions =
      (naturalGasConsumption / Natural_gas_cost_1000CF) * EF_natural_gas * 12;
  } else if (consumptionUnit === "thousandCubicFeet") {
    // thousand cubic feet (Mcf)
    emissions = EF_natural_gas * naturalGasConsumption * 12;
  } else if (consumptionUnit === "therms") {
    // therms
    emissions = EF_natural_gas_therm * naturalGasConsumption * 12;
  }

  return emissions;
}

export function calculateElectricityEmission(
  electricityUsed,
  consumptionUnit,
  hasGreenPower,
  greenPowerPercentage,
  costPerKWh = 0.1188,
  eFactorValue = 0.6132845
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

export function calculateFuelOilEmission(
  fuelOilUsed,
  consumptionUnit,
  fuelOilCost = 4.02,
  EF_fuel_oil_gallon = 22.61
) {
  if (consumptionUnit === "dollars") {
    // Dollars
    return (fuelOilUsed / fuelOilCost) * EF_fuel_oil_gallon * 12;
  } else if (consumptionUnit === "gallons") {
    // Gallons
    return EF_fuel_oil_gallon * fuelOilUsed * 12;
  }

  return 0;
}
export function calculatePropaneEmission(
  propaneUsed,
  consumptionUnit,
  propaneCost = 2.47,
  EF_propane = 12.43
) {
  if (consumptionUnit === "dollars") {
    // Dollars
    return (propaneUsed / propaneCost) * EF_propane * 12;
  } else if (consumptionUnit === "gallons") {
    // Gallons
    return EF_propane * propaneUsed * 12;
  }

  return 0;
}

export function calculateWasteEmissionsAfterRecycling(
  numPeople,
  recycleAluminumSteel,
  recyclePlastic,
  recycleGlass,
  recycleNewspaper,
  recycleMagazines,
  averageWasteEmissions = 691.5,
  newspaperRecyclingAvoidedEmissions = -113.14,
  metalRecyclingAvoidedEmissions = -89.38,
  plasticRecyclingAvoidedEmissions = -35.56,
  magRecyclingAvoidedEmissions = -27.46,
  glassRecyclingAvoidedEmissions = -25.39
) {
  const aluminumSteelEmissions =
    recycleAluminumSteel === 1 ? numPeople * metalRecyclingAvoidedEmissions : 0;
  const plasticEmissions =
    recyclePlastic === 1 ? numPeople * plasticRecyclingAvoidedEmissions : 0;
  const glassEmissions =
    recycleGlass === 1 ? numPeople * glassRecyclingAvoidedEmissions : 0;
  const newspaperEmissions =
    recycleNewspaper === 1 ? numPeople * newspaperRecyclingAvoidedEmissions : 0;
  const magazinesEmissions =
    recycleMagazines === 1 ? numPeople * magRecyclingAvoidedEmissions : 0;

  const totalWasteEmissions = numPeople * averageWasteEmissions;
  const totalWasteEmissionsAfterRecycling =
    totalWasteEmissions +
    aluminumSteelEmissions +
    plasticEmissions +
    glassEmissions +
    newspaperEmissions +
    magazinesEmissions;

  return totalWasteEmissionsAfterRecycling;
}

export const calculateEmissions = (
  householdVehiclesData,
  homeEnergyData,
  basicData,
  recycleData
) => {
  let vehicleEmissions = 0;

  if (householdVehiclesData.numVehicles > 0) {
    const numVehicles = householdVehiclesData.numVehicles;
    // console.log("numVehicles", numVehicles)
    for (let i = 0; i < numVehicles; i++) {
      vehicleEmissions += calculateHouseholdVehicleEmissions(
        householdVehiclesData[`milesDriven${i}`],
        householdVehiclesData[`unit${i}`]
      );
      // console.log('vehicleEmissions', vehicleEmissions)
    }
  }

  let hasGreenPower = false;
  if (homeEnergyData.portionGreenPower > 0) {
    hasGreenPower = true;
  }

  const homeEnergyEmissions =
    calculateNaturalGasEmission(
      homeEnergyData.naturalGasAmt,
      homeEnergyData["naturalGasAmt-unit"]
    ) +
    calculateFuelOilEmission(
      homeEnergyData.fuelOil,
      homeEnergyData["fuelOil-unit"]
    ) +
    calculateFuelOilEmission(
      homeEnergyData.propaneAmt,
      homeEnergyData["propaneAmt-unit"]
    ) +
    calculateElectricityEmission(
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
    recycleData.recycleNewspaper,
    recycleData.recycleMagazines
  );
  const heatingSource = basicData.heatingSource;
  return {
    heatingSource,
    vehicleEmissions,
    homeEnergyEmissions,
    wasteEmissions,
  };
};
