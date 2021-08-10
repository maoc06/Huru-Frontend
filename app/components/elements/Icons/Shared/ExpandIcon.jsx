function ExpandIcon({ width = 50, height = 50, color = '#070d9a', deg = 180 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      x="0"
      y="0"
      enableBackground="new 0 0 306 306"
      version="1.1"
      viewBox="0 0 306 306"
      xmlSpace="preserve"
    >
      <path
        fill={color}
        transform-origin={'50% 50%'}
        transform={`rotate(${deg})`}
        d="M153 58.65L0 211.65 35.7 247.35 153 130.05 270.3 247.35 306 211.65z"
      ></path>
    </svg>
  );
}

export default ExpandIcon;
