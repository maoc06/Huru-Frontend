function FavoriteIcon({
  flat = true,
  borderColor = '#828282',
  fillColor = '#333',
  fillOpacity = '0.25',
  width = 24,
  height = 24,
}) {
  if (flat) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill={borderColor}
          d="M17.6 1.039c-2.815 0-4.677 1.537-5.6 2.554-.923-1.017-2.785-2.554-5.6-2.554C2.558 1.039 0 4.61 0 8.613c0 2.994 1.51 8.828 11.622 14.253a.8.8 0 00.756 0C22.49 17.44 24 11.607 24 8.613c0-4.095-2.634-7.574-6.4-7.574zM12 21.25C7.143 18.58 1.6 14.13 1.6 8.613c0-3.07 1.843-5.974 4.8-5.974 2.243 0 4.1 1.375 4.92 2.67a.8.8 0 001.36-.002c.017-.026 1.685-2.668 4.92-2.668 2.979 0 4.8 2.934 4.8 5.974 0 5.518-5.543 9.967-10.4 12.638z"
        ></path>
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 25 24"
    >
      <path
        fill={fillColor}
        fillOpacity={fillOpacity}
        d="M8 7c1.6-1.2 3.333.167 4 1 2-2 4.21-1.79 5-1 1 1 1 3 .5 5-.307 1.227-3 4-5 5-.667-.167-2.9-1.5-4.5-3.5C6 11 6 8.5 8 7z"
      ></path>
      <g filter="url(#filter0_d)">
        <path
          fill={borderColor}
          d="M15.101 6c-1.456 0-2.418.795-2.896 1.32C11.728 6.796 10.765 6 9.31 6 7.323 6 6 7.847 6 9.917c0 1.548.78 4.565 6.01 7.37a.413.413 0 00.391 0c5.229-2.805 6.01-5.822 6.01-7.37C18.41 7.799 17.049 6 15.1 6zm-2.896 10.452C9.694 15.07 6.827 12.77 6.827 9.917c0-1.587.953-3.09 2.483-3.09 1.16 0 2.12.712 2.544 1.381.162.26.542.26.703 0 .009-.014.872-1.38 2.544-1.38 1.54 0 2.482 1.517 2.482 3.089 0 2.853-2.866 5.154-5.378 6.535z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d"
          width="24.411"
          height="23.336"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset></feOffset>
          <feGaussianBlur stdDeviation="3"></feGaussianBlur>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.8 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

export default FavoriteIcon;
