import { useState } from 'react';
import { useDispatch } from 'react-redux';

import useApi from '../../../../hooks/useApi';
import vehicleApi from '../../../../api/VehicleBasicsAPI';
import storageAuth from '../../../../utils/storageAuth';

import GridPhotosLayout from '../../../layouts/GridPhotos/GridPhotos';
import AddPhotoButton from '../../../elements/AddPhotoButton/AddPhotoButton';
import Button from '../../../elements/Button/Button';
import ErrorMessage from '../../../elements/ErrorMessage/ErrorMessage';

import { setPhotos } from '../../../../redux/slices/vehicleRegisterSlice';

export default function AddPhotos({ setStep, next, showButton = true }) {
  const dispatch = useDispatch();
  const vehicleImageApi = useApi(vehicleApi.insertCarImage);
  const [photoUris, setPhotoUris] = useState([]);
  const [photosUploaded, setPhotoUploaded] = useState([]);
  const [error, setError] = useState(false);

  const handleAdd = (uri) => {
    setPhotoUris([...photoUris, uri]);
  };

  const handleUploadSelected = async (form) => {
    const user = storageAuth.getUser();
    form.set('uid', user.info.uid);

    const pic = await vehicleImageApi.request(form);
    setPhotoUploaded([...photosUploaded, pic.data.data]);
  };

  const handleRemove = (uri) => {
    setPhotoUris(photoUris.filter((photoUri) => photoUri !== uri));
  };

  // const handleRemoveSelect = (file) => {
  //   setSelected(selected.filter((item) => item !== file));
  // };

  const handleSubmit = () => {
    if (!vehicleImageApi.loading) {
      dispatch(setPhotos(photosUploaded));
      setStep(next);
    } else {
      setError(true);
    }
  };

  return (
    <>
      {/* <h3>Exhibe tu carro</h3>

      <section>
        <p>Toma fotos de alta calidad de tu carro.</p>

        <br />

        <p>
          Recuerda que unas buenas fotos pueden aumentar tus ingresos
          potenciales atrayendo a más clientes.
        </p>
      </section> */}

      <GridPhotosLayout>
        {photoUris.map((uri, index) => (
          <AddPhotoButton
            key={uri}
            photoUri={uri}
            onRemovePhoto={handleRemove}
            isLoading={!photosUploaded[index]}
          />
        ))}
        <AddPhotoButton
          onAddPhoto={handleAdd}
          onAddSelect={handleUploadSelected}
        />
      </GridPhotosLayout>

      <ErrorMessage
        visible={error}
        message={'Espera a que las imagenes se cargen para continuar'}
      />

      {showButton && (
        <Button onClick={handleSubmit} marginTop>
          Continuar
        </Button>
      )}
    </>
  );
}
