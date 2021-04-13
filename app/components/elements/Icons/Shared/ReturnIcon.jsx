function ReturnIcon({ width = 24, height = 24, color = '#E7ECF3' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <g clipPath="url(#clip0)">
        <path
          fill={color}
          d="M17.981 4.698l-1.14 1.465a8.554 8.554 0 013.2 8.078 8.488 8.488 0 01-3.41 5.579 8.482 8.482 0 01-6.357 1.532c-4.652-.732-7.843-5.114-7.111-9.767a8.486 8.486 0 013.41-5.578 8.478 8.478 0 015.498-1.624l-1.604 1.683 1.19 1.135 2.532-2.658v.001l1.135-1.191-1.19-1.135-2.657-2.532L10.342.877l1.731 1.65a10.319 10.319 0 00-6.592 1.98 10.33 10.33 0 00-4.15 6.79C.44 16.961 4.322 22.294 9.985 23.185a10.32 10.32 0 007.736-1.866 10.33 10.33 0 004.151-6.79 10.41 10.41 0 00-3.892-9.83z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0">
          <path fill="#fff" d="M0 0H24V24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default ReturnIcon;
