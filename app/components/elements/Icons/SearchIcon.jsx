function SearchIcon({ color = '#828282', width = 24, height = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M23.854 22.44l-6.972-6.972A9.451 9.451 0 0019 9.5C19 4.262 14.738 0 9.5 0S0 4.262 0 9.5 4.262 19 9.5 19c2.26 0 4.335-.796 5.968-2.118l6.971 6.972a.5.5 0 00.708 0l.707-.707a.5.5 0 000-.707zM9.5 17C5.364 17 2 13.636 2 9.5S5.364 2 9.5 2 17 5.364 17 9.5 13.636 17 9.5 17z"
      ></path>
    </svg>
  );
}

export default SearchIcon;
