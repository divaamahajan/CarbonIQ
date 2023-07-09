const questionsBasics = [
    {
        id:"numPeople",
        label:"How many people live in your home?",
        type:"number",
      },
    
    {
        id:"heatingSource",
        label:"What is your household's primary heating source?",
        type:"select",
        options: [
          { value:"naturalGas", label:"Natural Gas"},
          { value:"electricHeat", label:"Electric Heat"},
          { value:"oil", label:"Oil"},
          { value:"propane", label:"Propane"},
          { value:"wood", label:"Wood"},
          { value:"noHeat", label:"Do not heat your house"},
        ],
      },];
    export default questionsBasics;
    