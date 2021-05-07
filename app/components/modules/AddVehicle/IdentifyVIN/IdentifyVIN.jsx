import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setVIN } from '../../../../redux/slices/vehicleRegisterSlice';

import useApi from '../../../../hooks/useApi';
import vehicleApi from '../../../../api/VehicleApi';

import Form from '../../Forms/Form';
import Textfield from '../../../elements/Textfield/Textfield';
import AuxiliarLabel from '../../../elements/AuxiliarLabel/AuxiliarLabel';
import DialogSlide from '../../../modules/DialogSlide/DialogSlide';
import SubmitButton from '../../../elements/Button/SubmitButton';

import vinSchema from '../../../../constants/validationSchema/vin';

import ActivityIndicator from '../../../elements/ActivityIndicator/ActivityIndicator';
import styles from './IdentifyVIN.module.scss';

export default function IdentifyVIN({ setStep, next }) {
  const dispatch = useDispatch();
  const findByVin = useApi(vehicleApi.findByVin);

  const [openDialog, setOpenDialog] = useState(false);
  const [apiError, setApiError] = useState(false);

  const initialValues = { vin: '' };

  const handleSubmit = async (vin) => {
    const existing = await findByVin.request(vin.vin);

    if (
      Object.keys(existing.data.data).length === 0 &&
      existing.data.data.constructor === Object
    ) {
      dispatch(setVIN(vin));
      setStep(next);
    } else {
      setApiError(true);
    }
  };

  return (
    <>
      <ActivityIndicator visible={findByVin.loading} />

      <div className={styles.container}>
        <h3>Identifica tu carro</h3>

        <article className={styles.content}>
          <p>
            Usa el Número de Identificación del Vehículo (VIN) para identificar
            tu carro.
          </p>
        </article>

        <Form
          initialValues={initialValues}
          validationSchema={vinSchema}
          onSubmit={handleSubmit}
        >
          <Textfield
            name="vin"
            label="VIN"
            placeholder="¿Cúal es el VIN de tu carro?"
            upperCase={true}
            apiError={apiError}
          />

          <div className={styles.helper}>
            <AuxiliarLabel
              text={'¿Donde encontrar el VIN de mi carro?'}
              onClick={() => setOpenDialog(true)}
              withIcon={true}
            />

            <DialogSlide
              title={'¿Donde encontrar el VIN de mi carro?'}
              content={
                'Usamos el Número de Identificación del Vehículo (VIN) como identificador unico dentro de Huru. El VIN usualmente consiste en una cadena alfanumerica de 17 caracteres. Lo puedes encontrar en el borde de la puerta, en el tablero del lado del conductor o en los documentos de registo del vehículo.'
              }
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
            />
          </div>

          <SubmitButton>Identificar</SubmitButton>
        </Form>
      </div>
    </>
  );
}
