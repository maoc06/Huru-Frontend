import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setPhone } from '../../../redux/slices/userRegisterSlice';

import useApi from '../../../hooks/useApi';
import authApi from '../../../api/AuthAPI';

import Form from '../Forms/Form';
import Textfield from '../../elements/Textfield/Textfield';
import SubmitButton from '../../elements/Button/SubmitButton';

import ActivityIndicator from '../../elements/ActivityIndicator/ActivityIndicator';

import userPhoneSchema from '../../../constants/validationSchema/userPhone';

export default function RegisterUserPhone({ setStep }) {
  const dispatch = useDispatch();

  const checkPhoneApi = useApi(authApi.checkPhone);

  const [apiError, setApiError] = useState(false);

  const initialValues = { phone: '' };

  const handleSubmit = async ({ phone }) => {
    const res = await checkPhoneApi.request(phone);
    if (res.data.data.phone !== undefined) setApiError(true);
    else {
      dispatch(setPhone({ phone }));
      setStep(4);
    }
  };

  return (
    <>
      <ActivityIndicator visible={checkPhoneApi.loading} />

      <div>
        <h3>¡Empecemos el viaje!</h3>

        <p>Escribe tu número de teléfono y nosotros te enviaremos un SMS</p>

        <Form
          initialValues={initialValues}
          validationSchema={userPhoneSchema}
          onSubmit={handleSubmit}
        >
          <Textfield
            name="phone"
            type="text"
            label="Teléfono"
            placeholder="¿Cúal es tu numero de teléfono?"
            apiError={apiError}
            errorMsg={'El número de teléfono ya está registrado'}
          />

          <SubmitButton>Continuar</SubmitButton>
        </Form>
      </div>
    </>
  );
}
