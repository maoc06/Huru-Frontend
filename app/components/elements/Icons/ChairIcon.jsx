import React from 'react';

function ChairIcon({ color = '#333', width = 24, height = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <g stroke={color} clipPath="url(#clip0)">
        <rect
          width="9.629"
          height="4.663"
          x="7.091"
          y="19.337"
          rx="0.723"
        ></rect>
        <path d="M19.787 19.356a1.265 1.265 0 00-1.992-1.036l-.858.602a.723.723 0 00-.307.592v3.558a.5.5 0 00.775.417l1.813-1.195c.355-.235.57-.631.57-1.057v-1.88zM4 19.356a1.265 1.265 0 011.992-1.036l.858.602a.723.723 0 01.307.592v3.558a.5.5 0 01-.775.417L4.57 22.294A1.265 1.265 0 014 21.237v-1.88zM8.16 6.595h7.49v11.99H8.16V6.596zM9.046 1.95C9.19 1.391 9.694 1 10.27 1h3.077c.584 0 1.091.399 1.23.966l.454 1.866a1.265 1.265 0 01-1.23 1.564h-4.01c-.827 0-1.431-.779-1.226-1.58l.48-1.866z"></path>
        <path d="M6.341 8.376c0-.983.797-1.78 1.78-1.78v0c.22 0 .397.177.397.395V17.97c0 .34-.277.617-.617.617h-.584c-.59 0-1.12-.358-1.342-.905v0a6.178 6.178 0 01-.23-3.96l.212-.767.371-1.93a.723.723 0 00.013-.137v-2.51zM17.47 8.376a1.78 1.78 0 00-1.781-1.78v0a.396.396 0 00-.396.395V17.97c0 .34.277.617.617.617h.584c.59 0 1.12-.358 1.342-.905v0c.51-1.26.59-2.651.229-3.96l-.211-.767-.371-1.93a.727.727 0 01-.013-.137v-2.51z"></path>
      </g>
      <defs>
        <clipPath id="clip0">
          <path fill="#fff" d="M0 0H24V24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default ChairIcon;
