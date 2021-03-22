import React from 'react';

function GasIcon({ color = '#333', width = 24, height = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={color}
        strokeLinecap="square"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M13.27 23H3.09m10.18 0h1.454m-1.454 0V9.556M3.09 23H2m1.09 0V9.556m0 0V1.23c0-.127.104-.231.232-.231h9.716c.128 0 .232.104.232.231v8.325m-10.18 0h10.18M17.632 1.407l1.454 1.648M13.27 12.94h4.13c.128 0 .232.104.232.232v6.745c0 .127.104.231.231.231H21.4a.232.232 0 00.232-.231V8.74m0 0V6.026c0-.057-.02-.111-.058-.154l-2.487-2.817m2.545 5.686h-2.314a.231.231 0 01-.23-.232V3.055"
      ></path>
    </svg>
  );
}

export default GasIcon;
