function GoogleIcon({ width = 24, height = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <g fillRule="evenodd" clipPath="url(#clip0)" clipRule="evenodd">
        <path
          fill="#4285F4"
          d="M23.52 12.273c0-.851-.076-1.67-.218-2.455H12v4.642h6.458a5.52 5.52 0 01-2.394 3.622v3.01h3.878c2.269-2.088 3.578-5.165 3.578-8.82z"
        ></path>
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.956-1.075 7.942-2.907l-3.878-3.011c-1.075.72-2.45 1.145-4.064 1.145-3.125 0-5.77-2.11-6.715-4.947H1.276v3.11A11.995 11.995 0 0012 24z"
        ></path>
        <path
          fill="#FBBC05"
          d="M5.285 14.28A7.213 7.213 0 014.91 12c0-.79.136-1.56.376-2.28V6.611H1.276A11.995 11.995 0 000 12.001c0 1.936.464 3.768 1.276 5.388l4.01-3.109z"
        ></path>
        <path
          fill="#EA4335"
          d="M12 4.773c1.762 0 3.344.605 4.587 1.794l3.442-3.442C17.951 1.19 15.235 0 12 0 7.31 0 3.25 2.69 1.276 6.61l4.01 3.11C6.228 6.884 8.874 4.773 12 4.773z"
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

export default GoogleIcon;
