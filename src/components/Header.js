// import React, { useEffect, useState } from "react";
// import Modal from "./Modal";
// import { useAuth } from "../context/AuthContext";
import Link from "next/link";

export default function Header() {
  //   const [openModal, setOpenModal] = useState(false);
  //   const { logout, currentUser } = useAuth();
  //   let user = "User";
  //   if (currentUser && currentUser.displayName) {
  //     user = currentUser.displayName;
  //   }
  function getGreeting() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    let greeting = "";

    if (currentHour < 12) {
      greeting = "Good Morning";
    } else if (currentHour < 18) {
      greeting = "Good Afternoon";
    } else {
      greeting = "Good Evening";
    }

    return greeting;
  }

  return (
    <>
      <div
        className="sticky top-0 w-full left-0 bg-inherit p-4 flex items-center justify-between border-b border-solid border-green-600"
        style={{
          display: "inline-flex",
          // paddingTop: "30px",
          alignItems: "center",
          gap: "21.807px",
        }}
      >
        <Link href="/">
          <div className="flex items-center">
            <img
              src="./images/logo.png"
              alt="CarbonIQ Logo"
              className="w-47 h-39.4 mr-2"
              style={{ width: "47px", height: "39px" }}
            />
            <h1
              style={{
                color: "rgba(0, 0, 0, 0.70)",
                fontFamily: "Prompt",
                // fontSize: "33.668px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              CarbonIQ
            </h1>
          </div>
        </Link>
      </div>

      <h1 className="text-1xl select-none sm:text-2xl items-center">
        {getGreeting()}!
      </h1>
    </>
  );
}
