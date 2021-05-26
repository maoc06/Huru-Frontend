import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import useApi from '../../../../hooks/useApi';
import vehicleApi from '../../../../api/VehicleApi';
import vehicleBasicsApi from '../../../../api/VehicleBasicsAPI';
import authStorage from '../../../../utils/storageAuth';

import Form from '../../Forms/Form';
import AppTerms from '../../../elements/Terms/Terms';
import SubmitButton from '../../../elements/Button/SubmitButton';
import SeePreview from '../../../elements/SeePreview/SeePreview';
import ActivityIndicator from '../../../elements/ActivityIndicator/ActivityIndicator';
import StatusIndicator from '../../../elements/StatusIndicator/StatusIndicator';
import checkAnimationData from '../../../../../public/animations/check.json';

import acceptTermsSchema from '../../../../constants/validationSchema/acceptTerms';

export default function Terms() {
  const router = useRouter();
  const [uid, setUid] = useState('');
  const store = useSelector((state) => state.vehicleRegister);

  const createVehicle = useApi(vehicleApi.create);
  const postVehicleFeatures = useApi(vehicleBasicsApi.insertCarFeatures);
  const updateOwnerCarImage = useApi(vehicleBasicsApi.updateOwnerCarImage);

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) setUid(user.info.uid);
  }, []);

  const initialValues = {
    checkTerms: false,
  };

  const handleButtonPopUp = () => {
    router.push('/host/vehicles');
  };

  const handleSubmit = async (checkTerms) => {
    if (checkTerms && uid) {
      // make vehicle object
      const vehicle = {
        makerId: parseInt(store.maker.makerId),
        modelId: parseInt(store.model.modelId),
        year: parseInt(store.year.year),
        vin: store.vin,
        odometerRangeId: parseInt(store.odometer.odometerRangeId),
        description: store.description,
        licensePlate: store.licensePlate,
        cityId: 1,
        owner: uid,
        price: parseInt(store.price),
        advanceNoticeId: parseInt(store.advanceNotice.id),
        minTripDurationId: parseInt(store.minTripDuration.id),
        maxTripDurationId: parseInt(store.maxTripDuration.id),
        fuelId: parseInt(store.fuel.fuelId),
        cityId: parseInt(store.city.cityId),
      };

      const res = await createVehicle.request(vehicle);

      const { features, photos } = store;
      const { carId } = res.data.data;
      const selected = [];
      const arrImages = [];

      features.forEach((item) => {
        const feature = { carId, featureId: item };
        selected.push(feature);
      });

      // make vehicle feature object
      const featuresBodyObj = {
        carId,
        selected,
      };

      postVehicleFeatures.request(featuresBodyObj);

      photos.forEach((item) => {
        const tmpImage = { ...item };
        tmpImage.carId = carId;

        arrImages.push(tmpImage);
      });

      updateOwnerCarImage.request(arrImages);
    }
  };

  return (
    <>
      <ActivityIndicator
        visible={
          createVehicle.loading ||
          postVehicleFeatures.loading ||
          updateOwnerCarImage.loading
        }
      />

      <StatusIndicator
        animationData={checkAnimationData}
        visible={
          !postVehicleFeatures.error &&
          !postVehicleFeatures.loading &&
          postVehicleFeatures.data.constructor === Object &&
          !createVehicle.error &&
          !createVehicle.loading &&
          createVehicle.data.constructor === Object &&
          !updateOwnerCarImage.error &&
          !updateOwnerCarImage.loading
        }
        title={'Listo!'}
        message={
          'En ese momento tu solicitud está siendo revisada por el equipo de soporte para validar la información que proporcionaste.'
        }
        buttonMsg={'Entendido'}
        onClickButton={handleButtonPopUp}
      />

      <div>
        <h3>Terminamos</h3>

        <article>
          <p>
            Revisa la vista previa para asegurarte que todo está como lo deseas.
            Una vez aceptes los términos y políticas de Huru, un miembro del
            equipo de soporte validará la información del vehículo.
          </p>

          <br />

          <p>
            Si la información proporcionada es válida en menos de 48 horas el
            vehículo se hará público en nuestra plataforma y estará listo para
            ser reservado.
          </p>
        </article>

        <SeePreview
          dialogTitle="Vista previa del vehículo"
          type="car-preview"
          contentWithPadding={false}
        />

        <Form
          initialValues={initialValues}
          validationSchema={acceptTermsSchema}
          onSubmit={handleSubmit}
        >
          <AppTerms
            name="checkTerms"
            typePolicy="car-privacy"
            typeTerms="car-terms"
            extraText=" para publicar mi vehículo"
          />

          <SubmitButton>Continuar</SubmitButton>
        </Form>
      </div>
    </>
  );
}
