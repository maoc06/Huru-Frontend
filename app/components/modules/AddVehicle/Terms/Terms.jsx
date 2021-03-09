import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import useApi from '../../../../hooks/useApi';
import vehicleApi from '../../../../api/VehicleApi';
import vehicleBasicsApi from '../../../../api/VehicleBasicsAPI';
import authStorage from '../../../../utils/storageAuth';

import Form from '../../Forms/Form';
import Checkbox from '../../../elements/Checkbox/Checkbox';
import SubmitButton from '../../../elements/Button/SubmitButton';

import ActivityIndicator from '../../../elements/ActivityIndicator/ActivityIndicator';
import CheckIndicator from '../../../elements/CheckIndicator/CheckIndicator';

import acceptTermsSchema from '../../../../constants/validationSchema/acceptTerms';

export default function Terms() {
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
        ownerUUID: uid,
        price: parseInt(store.price),
        advanceNoticeId: parseInt(store.advanceNotice.id),
        minTripDurationId: parseInt(store.minTripDuration.id),
        maxTripDurationId: parseInt(store.maxTripDuration.id),
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

      <CheckIndicator
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
        message={'En ese momento tu solicitud está siendo revisada.'}
        buttonMsg={'Entendido'}
        route={'/profile'}
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

        <Form
          initialValues={initialValues}
          validationSchema={acceptTermsSchema}
          onSubmit={handleSubmit}
        >
          <Checkbox
            name="checkTerms"
            label={
              'Acepto los Términos del servicio y la Política de privacidad de Huru.'
            }
          />

          <SubmitButton>Continuar</SubmitButton>
        </Form>
      </div>
    </>
  );
}
