function KeylessEntryIcon({ color = '#828282' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      fill="none"
      viewBox="0 0 100 100"
    >
      <rect
        width="27.875"
        height="48.264"
        x="55.86"
        y="28.778"
        stroke={color}
        strokeWidth="1.736"
        rx="7.813"
        transform="rotate(30 55.86 28.778)"
      ></rect>
      <path
        stroke={color}
        strokeWidth="1.736"
        d="M43.533 49.364L67.916 63.442"
      ></path>
      <rect
        width="10.885"
        height="7.972"
        x="44.812"
        y="62.477"
        stroke={color}
        strokeWidth="1.736"
        rx="2.026"
        transform="rotate(30 44.812 62.477)"
      ></rect>
      <rect
        width="10.885"
        height="7.972"
        x="57.724"
        y="43.026"
        stroke={color}
        strokeWidth="1.736"
        rx="2.026"
        transform="rotate(30 57.724 43.026)"
      ></rect>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.736"
        d="M56.556 70.498c1.273-2.206 3.519-6.096.79-7.672-3.064-1.489-4.372 1.261-5.646 3.467"
      ></path>
      <path
        stroke={color}
        strokeWidth="1.736"
        d="M64.787 47.503c1.273-2.206 3.155-5.465.426-7.04-3.065-1.49-4.372 1.26-5.646 3.466"
      ></path>
      <path
        fill={color}
        d="M26 51.764c-2.142-8.029 2.62-16.277 10.644-18.436a1.075 1.075 0 00-.557-2.077c-9.17 2.468-14.612 11.893-12.165 21.07A1.075 1.075 0 0026 51.763z"
      ></path>
      <path
        fill={color}
        d="M32.23 50.094a8.612 8.612 0 016.083-10.535 1.075 1.075 0 00-.556-2.077c-5.732 1.543-9.133 7.434-7.603 13.169a1.075 1.075 0 002.076-.557z"
      ></path>
    </svg>
  );
}

export default KeylessEntryIcon;
