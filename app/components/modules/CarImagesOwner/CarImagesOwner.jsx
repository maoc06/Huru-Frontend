import { useEffect, useState } from 'react';

import useApi from '../../../hooks/useApi';
import vehicleApi from '../../../api/VehicleBasicsAPI';
import storageAuth from '../../../utils/storageAuth';

import AddPhotoButton from '../../elements/AddPhotoButton/AddPhotoButton';
import MainCarImage from '../../elements/MainCarImage/MainCarImage';
import GridPhotosLayout from '../../layouts/GridPhotos/GridPhotos';

export default function CarImagesOwner({ carId, images = [] }) {
  const vehicleImageApi = useApi(vehicleApi.insertCarImage);
  const deleteImageApi = useApi(vehicleApi.removeCarImage);

  const [mainImage, setMainImage] = useState();
  const [photoUris, setPhotoUris] = useState(images);
  const [photosUploaded, setPhotoUploaded] = useState(images);

  useEffect(() => {
    getMainImage();
  }, [images]);

  const handleAdd = (uri) => {
    setPhotoUris([...photoUris, uri]);
  };

  const handleUploadSelected = async (form) => {
    const user = storageAuth.getUser();
    form.set('uid', user.info.uid);
    form.set('carId', carId);

    const {
      data: { data },
    } = await vehicleImageApi.request(form);
    const objPic = {
      carImageId: data.carImageId,
      imagePath: data.imagePath,
      isMain: data.isMain,
    };

    setPhotoUris([...photoUris, objPic]);
    setPhotoUploaded([...photosUploaded, data]);
  };

  const handleRemove = (uri) => {
    const elementToRemove = photoUris.find((photo) => {
      if (photo.imagePath) {
        return photo.imagePath === uri;
      }
      return photo === uri;
    });

    if (elementToRemove.carImageId) {
      deleteImageApi.request(elementToRemove.carImageId);
    }

    setPhotoUris(
      photoUris.filter((photoUri) => {
        if (photoUri.imagePath) {
          return photoUri.imagePath !== uri;
        }
        return photoUri !== uri;
      })
    );
  };

  const getMainImage = () => {
    const mainImage = images.find((image) => image.isMain === true);
    if (mainImage) {
      setMainImage(mainImage.imagePath);
    }
  };

  return (
    <>
      {mainImage && <MainCarImage imageSrc={mainImage} />}

      <GridPhotosLayout>
        {photoUris.slice(1).map((uri, index) => (
          <AddPhotoButton
            key={uri.carImageId ? uri.carImageId : uri}
            photoUri={uri.imagePath ? uri.imagePath : uri}
            onRemovePhoto={handleRemove}
            isLoading={!photosUploaded[index]}
          />
        ))}

        <AddPhotoButton
          onAddPhoto={handleAdd}
          onAddSelect={handleUploadSelected}
        />
      </GridPhotosLayout>
    </>
  );
}
