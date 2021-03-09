import { useEffect, useState } from 'react';
import styles from './AddPhotoButton.module.scss';

export default function AddPhotoButton({
  onAddSelect,
  onAddPhoto,
  onRemovePhoto,
  photoUri,
  isLoading,
}) {
  const [uri, setUri] = useState();

  useEffect(() => {
    if (uri !== undefined && !photoUri) {
      onAddPhoto(uri);
    }
  }, [uri]);

  const handleCapture = (event) => {
    const capture = event.target;
    if (capture.files) {
      if (capture.files.length !== 0) {
        const file = capture.files[0];

        const formData = new FormData();
        formData.append('file', file);
        onAddSelect(formData);

        setUri(URL.createObjectURL(file));
      }
    }
  };

  const handleClick = () => {
    if (photoUri) {
      onRemovePhoto(photoUri);
    } else {
      document.getElementById('photo-input').click();
    }
  };

  return (
    <div
      className={`${styles.container} ${!photoUri && styles.without_image}`}
      onClick={handleClick}
    >
      {!photoUri && (
        <>
          <input
            accept="image/*"
            id="photo-input"
            type="file"
            capture="environment"
            onChange={handleCapture}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="41"
            height="41"
            fill="none"
            viewBox="0 0 41 41"
          >
            <path
              stroke="#070D9A"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              d="M20.143 5.036v15.107m0 15.107V20.143m0 0H35.25m-15.107 0H5.036"
            ></path>
          </svg>
        </>
      )}

      {photoUri && (
        <img
          src={photoUri}
          className={`${styles.image} ${isLoading && styles.loading}`}
        />
      )}
    </div>
  );
}
