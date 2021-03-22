import React from 'react';

function RenaultLogo({ color = '#828282' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      fill="none"
      viewBox="0 0 100 100"
    >
      <g fill={color} clipPath="url(#clip0)">
        <path d="M69.454 48.473L57.78 27.998l-7.035 12.37 5.462 9.574-5.725 10.03v.003l-7.483 13.156.68 1.192c.253.452.378.677 1.305.677h10.098c.788 0 1.03-.183 1.369-.78l12.823-22.49c.56-.988.733-2.286.181-3.257z"></path>
        <path d="M49.513 59.544l-5.48-9.602 6.1-10.64 7.038-12.369-.586-1.029c-.35-.61-.808-.904-1.535-.904H45.015c-.727 0-1.182.296-1.53.904l-12.87 22.569c-.434.762-.582 1.92-.138 2.7l11.913 20.89 7.123-12.52z"></path>
      </g>
      <defs>
        <clipPath id="clip0">
          <path
            fill="#fff"
            d="M0 0H50V50H0z"
            transform="translate(25 25)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default RenaultLogo;
