import { useEffect, useState } from 'react';
import { Close } from '@material-ui/icons';

import UploadingIndicator from '../UploadingIndicator/UploadingIndicator';
import styles from './AddPhotoButton.module.scss';

export default function AddPhotoButton({
  onAddSelect,
  onAddPhoto,
  onRemovePhoto,
  photoUri,
  isLoading,
  isMainPhoto = false,
  photoIndex = 0,
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

        const objectUrl = URL.createObjectURL(file);
        setUri(objectUrl);
        onAddSelect(formData);
      }
    }
  };

  const handleClick = () => {
    if (!photoUri) {
      document.getElementById('photo-input').click();
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (photoUri) {
      onRemovePhoto(photoUri);
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
            type="file"
            accept="image/*"
            onChange={handleCapture}
            id="photo-input"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="41"
            height="41"
            fill="none"
            viewBox="0 0 41 41"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20.143 5.036v15.107m0 15.107V20.143m0 0H35.25m-15.107 0H5.036"
            ></path>
          </svg>
          <p className={styles.addText}>Agregar foto</p>
        </>
      )}

      {photoUri && (
        <div className={styles.imageContainer}>
          <UploadingIndicator visible={isLoading} />
          
          {/* Main photo indicator */}
          {isMainPhoto && !isLoading && (
            <div className={styles.mainPhotoIndicator}>
              Principal
            </div>
          )}
          
          {/* Enhanced image */}
          <img
            src={photoUri}
            alt={`Foto del vehículo ${photoIndex + 1}`}
            className={`${styles.image} ${isLoading && styles.loading}`}
          />
          
          {/* Image overlay with info */}
          {!isLoading && (
            <div className={styles.imageOverlay}>
              <div className={styles.imageInfo}>
                Foto {photoIndex + 1}{isMainPhoto ? ' - Principal' : ''}
              </div>
            </div>
          )}
          
          {/* Enhanced remove button */}
          {!isLoading && (
            <button
              className={styles.removeButton}
              onClick={handleRemove}
              aria-label="Eliminar foto"
            >
              <Close />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
