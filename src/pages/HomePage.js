import React from "react";
import Link from "next/link";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="font-inter flex flex-col min-h-screen relative text-white">
      <div className="justify-between">
        <div className="w-1/2">
          <div className="p-7 flex items-center pl-0">
              <img
                src="./images/logo.png"
                alt="CarbonIQ Logo"
                className="w-12 h-12 mr-2"
                style={{ width: "92.662px", height: "76.303px" }}
              />
              <h1
                style={{
                  color: "rgba(0, 0, 0, 0.70)",
                  fontFamily: "Prompt",
                  fontSize: "33.668px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                }}
              >
                CarbonIQ
              </h1>
          </div>
          <h1 className="text-green-500 text-3xl font-bold mb-8">
            Welcome to CarbonIQ!
          </h1>
          <p className="text-gray-700 text-lg font-medium mb-8">
            Calculate your footprint and make a positive impact. Understand your
            carbon footprint, get personalized reduction tips, and join us in
            creating a sustainable future.
          </p>
          <Link href="/questionnaire">
            <button className="calculateButton">Calculate Now</button>
          </Link>
        </div>
        <div className="backgroundImage" />
      </div>
    </div>
  );
};

export default HomePage;
