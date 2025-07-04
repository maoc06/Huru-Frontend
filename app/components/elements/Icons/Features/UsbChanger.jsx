function UsbChangerIcon({ color = '#828282' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      fill="none"
      viewBox="0 0 100 100"
    >
      <path
        fill={color}
        d="M49.751 53.579a.973.973 0 001.288-.5l2.111-4.785a.976.976 0 00-.893-1.37H49.51l1.514-3.413a.976.976 0 10-1.785-.792l-2.124 4.785a.976.976 0 00.893 1.373h2.75l-1.507 3.414a.976.976 0 00.499 1.288z"
      ></path>
      <path
        fill={color}
        fillRule="evenodd"
        d="M58.922 35.547h1.367c.54 0 .977.437.977.976v15.902c0 4.232-2.374 7.92-5.86 9.802v5.036c0 .54-.437.977-.976.977h-1.367v5.783c0 .54-.438.977-.977.977H48.18a.977.977 0 01-.977-.977V68.24h-1.367a.977.977 0 01-.977-.977v-5.036C41.374 60.345 39 56.657 39 52.425V36.523c0-.539.437-.976.977-.976h1.367v-9.57c0-.54.437-.977.976-.977h15.625c.54 0 .977.437.977.977v9.57zm-5.307 31.177v-3.235c-1.05.329-2.165.506-3.32.506-1.157 0-2.272-.177-3.32-.506v3.235h6.64zm-2.344 6.76v-4.807h-1.953v4.807h1.953zm8.041-23.777v2.718c0 5.062-4.117 9.18-9.18 9.18-5.06 0-9.179-4.118-9.179-9.18V37.5h18.36V49.708zM49.35 27.158h-5.872v8.594h5.872v-8.594zm1.682 0h5.872v8.594h-5.872v-8.594z"
        clipRule="evenodd"
      ></path>
      <circle cx="46.245" cy="31.245" r="0.975" fill={color}></circle>
      <circle cx="53.975" cy="31.245" r="0.975" fill={color}></circle>
    </svg>
  );
}

export default UsbChangerIcon;
