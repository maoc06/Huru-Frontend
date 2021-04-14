function EmptyStarIcon({ width = 24, height = 24, color = '#070D9A' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 35 36"
    >
      <path
        stroke={color}
        strokeWidth="2"
        d="M17.316 1.412a.201.201 0 01.368 0l4.603 10.328a.2.2 0 00.163.118l11.245 1.187a.201.201 0 01.113.35l-8.4 7.569a.201.201 0 00-.062.191l2.347 11.062a.201.201 0 01-.298.215l-9.794-5.649a.201.201 0 00-.201 0l-9.795 5.65a.201.201 0 01-.298-.216l2.346-11.062a.201.201 0 00-.062-.191l-8.4-7.57a.201.201 0 01.114-.35l11.245-1.186a.2.2 0 00.163-.118l4.603-10.328z"
      ></path>
    </svg>
  );
}

export default EmptyStarIcon;
