import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setLicensePlate,
  setLicensePlateCity,
} from '../../../../redux/slices/vehicleRegisterSlice';

import useApi from '../../../../hooks/useApi';
import vehicleApi from '../../../../api/VehicleApi';

import Form from '../../Forms/Form';
import Textfield from '../../../elements/Textfield/Textfield';
import Dropdown from '../../../elements/Dropdown/Dropdown';
import SubmitButton from '../../../elements/Button/SubmitButton';
import licensePlateSchema from '../../../../constants/validationSchema/licensePlate';
import locations from '../../../../constants/others/municipalities';
import styles from './LicensePlate.module.scss';

export default function LicensePlate({ setStep, next }) {
  const dispatch = useDispatch();
  const findByLicense = useApi(vehicleApi.findByLicensePlate);
  
  // Get current license plate data from Redux state
  const currentLicensePlate = useSelector((state) => state.vehicleRegister.licensePlate);
  const currentLicensePlateCity = useSelector((state) => state.vehicleRegister.licensePlateCity);

  const [apiError, setApiError] = useState(false);

  // Find the location object that matches the saved city
  const savedLocation = currentLicensePlateCity 
    ? locations.municipalities.find(loc => loc.municipality === currentLicensePlateCity)
    : null;

  const initialValues = {
    licensePlate: currentLicensePlate || '',
    location: savedLocation || '',
  };

  const handleSubmit = async ({ licensePlate, location: { municipality } }) => {
    const existing = await findByLicense.request(licensePlate);

    if (
      Object.keys(existing.data.data).length === 0 &&
      existing.data.data.constructor === Object
    ) {
      dispatch(setLicensePlate(licensePlate.toUpperCase()));
      dispatch(setLicensePlateCity(municipality));
      setStep(next);
    } else {
      setApiError(true);
    }
  };

  return (
    <div className={styles.container}>
      <Form
        initialValues={initialValues}
        validationSchema={licensePlateSchema}
        onSubmit={handleSubmit}
      >
        <Textfield
          name="licensePlate"
          placeholder="¿Cómo es la placa de tu carro?"
          label="Matrícula"
          apiError={apiError}
          errorMsg={'La matrícula ya está registrada'}
          typeChangeAux="license"
          upperCase
        />

        <Dropdown
          name="location"
          list={locations.municipalities}
          label="Municipio"
          propKey="id"
          propName="municipality"
          marginToButton
        />

        <SubmitButton>Continuar</SubmitButton>
      </Form>
    </div>
  );
}
