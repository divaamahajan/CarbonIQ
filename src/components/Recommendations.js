import React from "react";

const recommendations = ({
  heatingSource,
  vehicleEmissions,
  homeEnergyEmissions,
  wasteEmissions,
}) => {
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
            stroke="#0FA958"
            stroke-width="1.5"
          />
          <path
            d="M15.9998 9.52539L17.8998 12.9587L21.3332 14.8587L17.8998 16.7587L15.9998 20.1921L14.0998 16.7587L10.6665 14.8587L14.0998 12.9587L15.9998 9.52539Z"
            stroke="#0FA958"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <h1 className="ml-2 text-green-700 font-semibold text-2xl leading-tight my-3">
          Reccomandations
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center ">
        <span className="text-green-700 font-bold">
          Thank you for making a positive impact on the environment!
        </span>
      </div>
    </div>
  );
};

export default recommendations;
