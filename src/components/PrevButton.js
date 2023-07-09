import React from "react";

const PrevButton = ({ onClick }) => {
  return (
    <button
      className="flex items-center p-4 gap-2 rounded-md border border-green-800 bg-green-800 text-white inline-flex justify-center"
      onClick={onClick}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Icon">
          <path
            id="Icon (Stroke)"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.1629 3.6558C13.4894 3.98012 13.4912 4.50776 13.1669 4.8343L7.94079 10.0963L13.2028 15.3224C13.5293 15.6467 13.5311 16.1744 13.2068 16.5009C12.8825 16.8274 12.3548 16.8293 12.0283 16.5049L6.17505 10.6916C5.8485 10.3672 5.84669 9.83961 6.17102 9.51306L11.9844 3.65983C12.3087 3.33328 12.8363 3.33148 13.1629 3.6558Z"
            fill="white"
          />
        </g>
      </svg>
    </button>
  );
};

export default PrevButton;
