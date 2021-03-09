import { useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../../hooks/useApi';
import useAuth from '../../../hooks/useAuth';
import authApi from '../../../api/AuthAPI';

import Form from './Form';
import Textfield from '../../elements/Textfield/Textfield';
import AuxiliarLabel from '../../elements/AuxiliarLabel/AuxiliarLabel';
import SubmitButton from '../../elements/Button/SubmitButton';

import ActivityIndicator from '../../elements/ActivityIndicator/ActivityIndicator';

import credentialsSchema from '../../../constants/validationSchema/credentials';
import { errorHandlerLogin } from '../../../utils/errorHandler';

export default function LoginForm() {
  const auth = useAuth();
  const router = useRouter();

  const validateCredentials = useApi(authApi.signIn);

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  const initialValues = { email: '', password: '' };

  const handleSubmit = async (user) => {
    const res = await validateCredentials.request(user);

    const errors = errorHandlerLogin(res.data.token);

    if (errors === 0) {
      router.push('/profile');
      auth.logIn(res.data.token);
    } else {
      if (errors.index === 0) {
        setEmailErrorMsg(errors.msg);
        setEmailError(true);
      } else if (errors.index === 1) {
        setPasswordErrorMsg(errors.msg);
        setPasswordError(true);
      }
    }
  };

  return (
    <>
      <ActivityIndicator visible={validateCredentials.loading} />

      <div>
        <h2>Bienvenido a Huru</h2>

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
            apiError={emailError}
            errorMsg={emailErrorMsg}
          />

          <Textfield
            name="password"
            type="password"
            label="Contraseña"
            placeholder="Digita tu contraseña"
            apiError={passwordError}
            errorMsg={passwordErrorMsg}
            withSmallBottomMargin
          />

          <AuxiliarLabel text="¿Olvidates tu contraseña?" bold />

          <SubmitButton marginTop>Iniciar sesión</SubmitButton>
        </Form>
      </div>
    </>
  );
}
