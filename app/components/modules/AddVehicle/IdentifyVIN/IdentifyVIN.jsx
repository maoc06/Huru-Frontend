import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setVIN } from '../../../../redux/slices/vehicleRegisterSlice';

import useApi from '../../../../hooks/useApi';
import vehicleApi from '../../../../api/VehicleApi';

import Form from '../../Forms/Form';
import Textfield from '../../../elements/Textfield/Textfield';
import AuxiliarLabel from '../../../elements/AuxiliarLabel/AuxiliarLabel';
import SubmitButton from '../../../elements/Button/SubmitButton';
import ResponsiveDialog from '../../ResponsiveDialog/ResponsiveDialog';
import ActivityIndicator from '../../../elements/ActivityIndicator/ActivityIndicator';

import vinSchema from '../../../../constants/validationSchema/vin';

import styles from './IdentifyVIN.module.scss';

export default function IdentifyVIN({ setStep, next }) {
  const dispatch = useDispatch();
  const findByVin = useApi(vehicleApi.findByVin);
  
  // Get current VIN from Redux state
  const currentVin = useSelector((state) => state.vehicleRegister.vin);

  const [openDialog, setOpenDialog] = useState(false);
  const [apiError, setApiError] = useState(false);

  const initialValues = { vin: currentVin || '' };

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

            <ResponsiveDialog
              title="¿Dónde encontrar el VIN?"
              type="where-find-vin"
              onClose={() => setOpenDialog(false)}
              visible={openDialog}
            />
          </div>

          <SubmitButton>Identificar</SubmitButton>
        </Form>
      </div>
    </>
  );
}
