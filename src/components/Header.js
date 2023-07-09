import Link from "next/link";

export default function Header() {
  return (
    <div
      className="sticky top-0 w-full left-0 bg-inherit p-4 flex items-center justify-between 
        border-b border-solid border-green-600"
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
  );
}
