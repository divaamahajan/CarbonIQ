import React from "react";

const CalcAgainButton = ({onClick}) => {
  return (
    <button className="flex items-center p-4 gap-2 rounded-md border border-green-800 bg-green-800 text-white inline-flex justify-center"

    onClick={onClick}>
      Calculate Again
    </button>
  );
};

export default CalcAgainButton;
