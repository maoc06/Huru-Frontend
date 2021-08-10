import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setPersonalData } from '../../../redux/slices/userRegisterSlice';

import useApi from '../../../hooks/useApi';
import authApi from '../../../api/AuthAPI';

import validateMinimumAge from '../../../utils/validateUserAge';

import Form from '../Forms/Form';
import Textfield from '../../elements/Textfield/Textfield';
import DatePickerInline from '../../elements/DatePicker/DatePickerInline';
import SubmitButton from '../../elements/Button/SubmitButton';
import ActivityIndicator from '../../elements/ActivityIndicator/ActivityIndicator';
import personalDataUserSchema from '../../../constants/validationSchema/personalDataUser';
import styles from './Register.module.scss';

export default function RegisterUserPersonalData({ setStep }) {
  const dispatch = useDispatch();
  const userStoreData = useSelector((state) => state.userRegister);

  const checkCCApi = useApi(authApi.checkDocument);

  const [dateError, setDateError] = useState(false);
  const [apiError, setApiError] = useState(false);

  const initialValues = {
    name: userStoreData.firstName,
    lastname: userStoreData.lastName,
    birth: '',
    cc: '',
  };

  const handleSubmit = async ({ name, lastname, birth, cc }) => {
    if (!validateMinimumAge(birth)) {
      setDateError(true);
    } else {
      const res = await checkCCApi.request(cc);
      if (res.data.data.document_id !== undefined) setApiError(true);
      else {
        dispatch(setPersonalData({ name, lastname, birth, cc }));
        setStep(3);
      }
    }
  };

  return (
    <>
      <ActivityIndicator visible={checkCCApi.loading} />

      <div className={styles.container}>
        <h3>¡Empecemos el viaje!</h3>

        <p>Para la seguridad de la comunidad, necesitamos estos datos</p>

        <Form
          initialValues={initialValues}
          validationSchema={personalDataUserSchema}
          onSubmit={handleSubmit}
        >
          <Textfield
            name="name"
            type="text"
            label="Nombre"
            placeholder="¿Cúal es tu nombre?"
          />

          <Textfield
            name="lastname"
            type="text"
            label="Apellido"
            placeholder="¿Cúal es tu apellido?"
          />

          <DatePickerInline
            name="birth"
            label="Fecha de nacimiento"
            dateError={dateError}
            setDateError={setDateError}
          />

          <Textfield
            name="cc"
            type="tel"
            label="Cédula"
            placeholder="Digita el número de tu cédula"
            apiError={apiError}
          />

          <SubmitButton>Continuar</SubmitButton>
        </Form>
      </div>
    </>
  );
}
