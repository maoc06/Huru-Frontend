import { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  setEmailPassword,
  setPersonalData,
} from '../../../redux/slices/userRegisterSlice';

import useApi from '../../../hooks/useApi';
import authApi from '../../../api/AuthAPI';

import Form from '../Forms/Form';
import Textfield from '../../elements/Textfield/Textfield';
import AuthGoogleButton from '../../elements/Button/AuthGoogleButton';
import AuthFacebookButton from '../../elements/Button/AuthFacebookButton';
import SubmitButton from '../../elements/Button/SubmitButton';
import Divider from '../../elements/Divider/Divider';

import ActivityIndicator from '../../elements/ActivityIndicator/ActivityIndicator';

import credentialsSchema from '../../../constants/validationSchema/credentials';

export default function RegisterUserCredentials({ setStep }) {
  const dispatch = useDispatch();

  const checkEmailApi = useApi(authApi.checkEmail);
  const authGoogleApi = useApi(authApi.signUpGoogle);

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

  const handleAuthGoogle = async (googleData) => {
    const googleRes = await authGoogleApi.request({
      token: googleData.tokenId,
    });

    if (authGoogleApi.error) {
      console.log('Error auth google');
      return;
    }

    if (googleRes.data !== undefined && googleRes.data.data !== undefined) {
      const googleAccount = googleRes.data.data;

      dispatch(
        setEmailPassword({ email: googleAccount.email, password: null })
      );

      dispatch(
        setPersonalData({
          name: googleAccount.firstName,
          lastname: googleAccount.lastName,
          birth: null,
          cc: null,
        })
      );

      setStep(2);
    }
  };

  const handleAuthFacebook = (facebookData) => {
    console.log(facebookData);
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

        <Divider size="mediumTop" text="o" withText={true} />

        <AuthGoogleButton
          text="Continuar con Google"
          onSuccess={handleAuthGoogle}
          onFailure={handleAuthGoogle}
          marginBottom={true}
          marginTop={true}
          withTinyMarginBottom={true}
        />

        <AuthFacebookButton
          text="Continuar con Facebook"
          onCallback={handleAuthFacebook}
          marginBottom={true}
        />
      </div>
    </>
  );
}
