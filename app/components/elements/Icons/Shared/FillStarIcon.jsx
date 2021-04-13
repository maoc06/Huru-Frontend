function FillStarIcon({ color = '#070D9A', width = 24, height = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 10 10"
    >
      <path
        fill={color}
        d="M4.418.53a.259.259 0 01.472 0l.99 2.218a.259.259 0 00.208.152l2.415.255c.223.023.313.3.146.45L6.845 5.23a.259.259 0 00-.08.246l.504 2.376a.259.259 0 01-.382.277L4.783 6.916a.259.259 0 00-.258 0L2.42 8.129a.259.259 0 01-.382-.277l.504-2.376a.259.259 0 00-.08-.246L.659 3.604a.259.259 0 01.146-.449L3.22 2.9a.259.259 0 00.209-.152L4.418.53z"
      ></path>
    </svg>
  );
}

export default FillStarIcon;
