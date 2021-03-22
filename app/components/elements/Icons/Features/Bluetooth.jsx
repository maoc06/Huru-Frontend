function BluetoothIcon({ color = '#828282' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      fill="none"
      viewBox="0 0 100 100"
    >
      <g clipPath="url(#clip0)">
        <path
          fill={color}
          d="M50 75a1.042 1.042 0 01-1.042-1.042V52.37l-10.754 9.858a1.042 1.042 0 11-1.408-1.536l11.662-10.691-11.666-10.69a1.042 1.042 0 111.408-1.535l10.758 9.856V26.044a1.042 1.042 0 011.78-.738l12.499 12.5a1.042 1.042 0 01-.034 1.504L51.541 50l11.667 10.69a1.041 1.041 0 01.033 1.504l-12.5 12.5A1.041 1.041 0 0150 75zm1.041-22.63v19.074l9.952-9.952-9.952-9.122zm0-23.812v19.074l9.952-9.122-9.952-9.952z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0">
          <path
            fill="#fff"
            d="M0 0H50V50H0z"
            transform="translate(25 25)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default BluetoothIcon;
