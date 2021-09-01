import { useState } from 'react';
import { useDispatch } from 'react-redux';

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

import { maskLicensePlate } from '../../../../utils/masksInputs';
import licensePlateSchema from '../../../../constants/validationSchema/licensePlate';

import locations from '../../../../constants/others/municipalities';
import styles from './LicensePlate.module.scss';

export default function LicensePlate({ setStep, next }) {
  const dispatch = useDispatch();
  const findByLicense = useApi(vehicleApi.findByLicensePlate);

  const [apiError, setApiError] = useState(false);

  const initialValues = {
    licensePlate: '',
    location: '',
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
      <h3>Matrícula</h3>

      <article>
        <p>
          Debemos conocer la matrícula de tu carro para realizar algunas
          validaciones. Esta información no será pública.
        </p>
      </article>

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
