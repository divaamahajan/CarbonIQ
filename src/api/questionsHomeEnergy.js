const questionsHomeEnergy = [
  {
    id:"naturalGasAmt",
    label:"How much natural gas does your household use per month?",
    type:"number",
    unitType:"select",
    options: [
      { value:"dollars", label:"Dollars"},
      { value:"thousandCubicFeet", label:"Thousand cubic feet"},
      { value:"therms", label:"Therms"},
    ],
  },
  // {
  //   id:"purchaseGreenPower",
  //   label:"Does your household currently purchase green power?",
  //   type:"select",
  //   options: [
  //     { value: true, label:"Yes"},
  //     { value: false, label:"No"},
  //   ],
  // },
  {
    id:"portionGreenPower",
    label:
    "If your household purchases green power, enter the portion of your total purchased electricity that is green power. If not, enter zero.",    type:"number",
    unitType:"text",
    unit:"%",
  },

  {
    id:"electricity",
    label:"How much electricity does your household use per month?",
    type:"number",
    unitType:"select",
    options: [
      { value:"dollars", label:"Dollars"},
      { value:"kilowattHours", label:"Kilowatt-hours"},
    ],
  },
  {
    id:"fuelOil",
    label:"How much fuel oil does your household use per month?",
    type:"number",
    unitType:"select",
    options: [
      { value:"dollars", label:"Dollars"},
      { value:"gallons", label:"Gallons"},
    ],
  },
  {
    id:"propaneAmt",
    label:"How much propane does your household use per month?",
    type:"number",
    unitType:"select",
    options: [
      { value:"dollars", label:"Dollars"},
      { value:"gallons", label:"Gallons"},
    ],
  },
];
export default questionsHomeEnergy;
