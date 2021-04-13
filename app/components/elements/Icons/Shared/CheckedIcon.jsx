function CheckedIcon({ width = 24, height = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="12" fill="#070D9A"></circle>
      <path
        fill="#fff"
        d="M10.115 14.374a.5.5 0 01-.707 0l-2.226-2.226a.5.5 0 00-.707 0l-.288.288a.5.5 0 000 .707l3.221 3.221a.5.5 0 00.707 0l7.734-7.733a.5.5 0 000-.707l-.289-.288a.5.5 0 00-.707 0l-6.738 6.738z"
      ></path>
    </svg>
  );
}

export default CheckedIcon;
