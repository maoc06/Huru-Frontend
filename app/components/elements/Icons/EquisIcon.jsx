function EquisIcon({ width = 24, height = 24, color = '#070D9A' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 34 34"
    >
      <rect
        width="2.005"
        height="31.889"
        fill={color}
        rx="0.5"
        transform="matrix(1 .00137 .00137 1 15.927 1.048)"
      ></rect>
      <rect
        width="2.005"
        height="31.889"
        fill={color}
        rx="0.5"
        transform="rotate(89.922 8.477 24.476) skewX(-.157)"
      ></rect>
    </svg>
  );
}

export default EquisIcon;
