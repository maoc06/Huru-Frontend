import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useApi from '../../../../hooks/useApi';
import vehicleApi from '../../../../api/VehicleBasicsAPI';
import storageAuth from '../../../../utils/storageAuth';

import GridPhotosLayout from '../../../layouts/GridPhotos/GridPhotos';
import AddPhotoButton from '../../../elements/AddPhotoButton/AddPhotoButton';
import Button from '../../../elements/Button/Button';
import ErrorMessage from '../../../elements/ErrorMessage/ErrorMessage';

import { setPhotos } from '../../../../redux/slices/vehicleRegisterSlice';
import styles from './AddPhotos.module.scss';

export default function AddPhotos({ setStep, next, showButton = true }) {
  const dispatch = useDispatch();
  const vehicleImageApi = useApi(vehicleApi.insertCarImage);
  
  // Get current photos from Redux state
  const currentPhotos = useSelector((state) => state.vehicleRegister.photos);
  
  const [photoUris, setPhotoUris] = useState([]);
  const [photosUploaded, setPhotoUploaded] = useState(currentPhotos || []);
  const [error, setError] = useState(false);

  // Initialize photo URIs from saved photos
  useEffect(() => {
    if (currentPhotos && currentPhotos.length > 0) {
      const uris = currentPhotos.map(photo => photo.url || photo.imageUrl || '');
      setPhotoUris(uris.filter(uri => uri)); // Filter out empty URIs
    }
  }, [currentPhotos]);

  const handleAdd = (uri) => {
    setPhotoUris([...photoUris, uri]);
  };

  const handleUploadSelected = async (form) => {
    const user = storageAuth.getUser();
    console.log('form', form.values);
    form.set('uid', user.info.uid);

    if (photosUploaded.length === 0) {
      form.set('isMain', true);
    } else {
      form.set('isMain', false);
    }

    const pic = await vehicleImageApi.request(form);
    console.log('vehicle image pic', pic);
    if (pic && !vehicleImageApi.error) {
      setPhotoUploaded([...photosUploaded, pic.data.data]);
    }
  };

  const handleRemove = (uri) => {
    setPhotoUris(photoUris.filter((photoUri) => photoUri !== uri));
  };

  const handleSubmit = () => {
    if (!vehicleImageApi.loading) {
      if (photosUploaded.length === 0) {
        setError(true);
        return;
      }
      dispatch(setPhotos(photosUploaded));
      setStep(next);
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.instructions}>
          <p className={styles.tip}>
            💡 <strong>Tip:</strong> Toma fotos desde diferentes ángulos para mostrar mejor tu vehículo
          </p>
        </div>

      <GridPhotosLayout>
        {photoUris.map((uri, index) => (
            <div 
              key={uri} 
              className={`${styles.gridItem} ${index === 0 ? styles.mainPhotoItem : ''} ${!photosUploaded[index] ? styles.gridItemLoading : ''}`}
            >
          <AddPhotoButton
            photoUri={uri}
            onRemovePhoto={handleRemove}
            isLoading={!photosUploaded[index]}
                isMainPhoto={index === 0}
                photoIndex={index}
          />
            </div>
        ))}
          <div className={styles.gridItem}>
        <AddPhotoButton
          onAddPhoto={handleAdd}
          onAddSelect={handleUploadSelected}
              photoIndex={photoUris.length}
        />
          </div>
      </GridPhotosLayout>

      <ErrorMessage
        visible={error}
          message={photosUploaded.length === 0 
            ? 'Debes agregar al menos una foto para continuar' 
            : 'Espera a que las imágenes se carguen para continuar'
          }
      />

      {showButton && (
          <div className={styles.buttonContainer}>
            <Button 
              onClick={handleSubmit} 
              disabled={vehicleImageApi.loading || photosUploaded.length === 0}
            >
              {vehicleImageApi.loading ? 'Cargando...' : 'Continuar'}
        </Button>
          </div>
      )}
      </div>
    </div>
  );
}
