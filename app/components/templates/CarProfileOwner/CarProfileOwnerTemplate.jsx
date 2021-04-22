import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../../hooks/useApi';
import carApi from '../../../api/VehicleApi';

import Button from '../../elements/Button/Button';
import MainCarImage from '../../elements/MainCarImage/MainCarImage';
import Divider from '../../elements/Divider/Divider';
import ActivityIndicator from '../../elements/ActivityIndicator/ActivityIndicator';
import Modal from '../../modules/Modal/Modal';
import CarFeatures from '../../modules/CarFeatures/CarFeatures';
import AddPhotoButton from '../../elements/AddPhotoButton/AddPhotoButton';
import CarImagesOwner from '../../modules/CarImagesOwner/CarImagesOwner';
import SectionEditable from '../../modules/SectionEditable/SectionEditable';
import { WarningIcon } from '../../elements/Icons/Shared';

import vehicleDescriptionSchema from '../../../constants/validationSchema/vehicleDescription';

import styles from './CarProfileOwnerTemplate.module.scss';

const CarProfileOwnerTemplate = ({
  carId,
  title = '',
  description,
  features = [],
  images = [],
}) => {
  const router = useRouter();

  const updateDescription = useApi(carApi.updateBookingTerms);
  const disableCar = useApi(carApi.updateDisable);
  const showHideCar = useApi(carApi.updateVisibility);

  const [showConfimationModal, setShowConfirmModal] = useState(false);

  const handleDisable = async () => {
    setShowConfirmModal(false);
    await disableCar.request({ carId });

    if (!disableCar.error) {
      router.push('/host/vehicles');
    }
  };

  const handleShowHide = () => {
    showHideCar.request({ carId });
  };

  const handleUpdateDescription = async ({ description }) => {
    const descriptionUpdate = { carId, description };
    await updateDescription.request(descriptionUpdate);

    if (updateDescription.error) {
      console.log('Error updating description...');
    } else {
      router.reload();
    }
  };

  const handleShowConfirmModal = () => {
    setShowConfirmModal(!showConfimationModal);
  };

  return (
    <>
      <ActivityIndicator visible={disableCar.loading || showHideCar.loading} />

      <Modal
        title="¿Eliminar este vehículo?"
        content="Está acción es permanente y no se puede deshacer"
        icon={<WarningIcon />}
        visible={showConfimationModal}
        onConfirm={handleDisable}
        onReject={handleShowConfirmModal}
        onCloseModal={handleShowConfirmModal}
      />

      <main className={styles.wrapper}>
        <CarImagesOwner carId={carId} images={images} />

        <Divider size="mediumTop" />

        <h5>Nombre</h5>
        <p>{title}</p>

        <Divider size="mediumTop" />

        <SectionEditable
          title="Descripción"
          name="description"
          onSave={handleUpdateDescription}
          schema={vehicleDescriptionSchema}
          values={{ description }}
        />

        <Divider size="mediumTop" />

        <CarFeatures
          features={features}
          editable={true}
          href={`/host/vehicles/edit/features/${encodeURIComponent(carId)}`}
        />

        <Divider size="mediumTop" />

        <Button invert={true} onClick={handleShowHide}>
          Ocultar vehículo
        </Button>

        <Button
          isSecondary={true}
          invert={true}
          marginTop={true}
          onClick={handleShowConfirmModal}
        >
          Eliminar este vehículo
        </Button>
      </main>
    </>
  );
};

export default CarProfileOwnerTemplate;
