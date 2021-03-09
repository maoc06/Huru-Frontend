import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setEmailPassword } from '../../../redux/slices/userRegisterSlice';

import useApi from '../../../hooks/useApi';
import authApi from '../../../api/AuthAPI';

import Form from '../Forms/Form';
import Textfield from '../../elements/Textfield/Textfield';
import SubmitButton from '../../elements/Button/SubmitButton';

import ActivityIndicator from '../../elements/ActivityIndicator/ActivityIndicator';

import credentialsSchema from '../../../constants/validationSchema/credentials';

export default function RegisterUserCredentials({ setStep }) {
  const dispatch = useDispatch();

  const checkEmailApi = useApi(authApi.checkEmail);

  const [apiError, setApiError] = useState(false);

  const initialValues = { email: '', password: '' };

  const handleSubmit = async ({ email, password }) => {
    const res = await checkEmailApi.request(email);

    // Si el email ya esta registrado
    if (res.data.data.email !== undefined) setApiError(true);
    else {
      dispatch(setEmailPassword({ email, password }));
      setStep(2);
    }
  };

  return (
    <>
      <ActivityIndicator visible={checkEmailApi.loading} />

      <div>
        <h3>¡Empecemos el viaje!</h3>

        <p>Crea una cuenta para conectarte y disfrutar de Huru</p>

        <Form
          initialValues={initialValues}
          validationSchema={credentialsSchema}
          onSubmit={handleSubmit}
        >
          <Textfield
            name="email"
            type="email"
            label="Email"
            placeholder="ejemplo@correo.com"
            apiError={apiError}
          />

          <Textfield
            name="password"
            type="password"
            label="Contraseña"
            placeholder="Digita tu contraseña"
          />

          <SubmitButton>Continuar</SubmitButton>
        </Form>
      </div>
    </>
  );
}
