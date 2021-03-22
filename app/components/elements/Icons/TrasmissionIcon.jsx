import React from 'react';

function TransmissionIcon({ color = '#333', width = 24, height = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="11.1"
        stroke={color}
        strokeWidth="1.8"
      ></circle>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.8"
        d="M11.9 4.9L11.9 19.1"
      ></path>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.8"
        d="M17.9 6.9L17.9 17.1"
      ></path>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.8"
        d="M5.9 6.9L5.9 17.1"
      ></path>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.8"
        d="M17.1 11.9L5.9 11.9"
      ></path>
    </svg>
  );
}

export default TransmissionIcon;
