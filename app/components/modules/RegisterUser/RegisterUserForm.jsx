import { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  setEmailPassword,
  // setPersonalData,
} from '../../../redux/slices/userRegisterSlice';

import useApi from '../../../hooks/useApi';
import authApi from '../../../api/AuthAPI';
// import FBGraphApi from '../../../api/FBGraphAPI';

import Form from '../Forms/Form';
import Textfield from '../../elements/Textfield/Textfield';
import SubmitButton from '../../elements/Button/SubmitButton';
import ActivityIndicator from '../../elements/ActivityIndicator/ActivityIndicator';
import credentialsSchema from '../../../constants/validationSchema/credentials';
import styles from './Register.module.scss';
// import AuthGoogleButton from '../../elements/Button/AuthGoogleButton';
// import AuthFacebookButton from '../../elements/Button/AuthFacebookButton';
// import Divider from '../../elements/Divider/Divider';

export default function RegisterUserCredentials({ setStep }) {
  const dispatch = useDispatch();

  const checkEmailApi = useApi(authApi.checkEmail);
  // const authGoogleApi = useApi(authApi.signUpGoogle);
  // const getFBUserApi = useApi(FBGraphApi.getUserInfo);

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

  // For the current version of the system, the following functionalities are not enabled

  // const handleAuthGoogle = async (googleData) => {
  //   const googleRes = await authGoogleApi.request({
  //     token: googleData.tokenId,
  //   });

  //   if (authGoogleApi.error) return;
  //   if (googleRes.data === undefined) return;

  //   const googleAccount = googleRes.data.data;
  //   handleDispatchInfo({
  //     email: googleAccount.email,
  //     firstName: googleAccount.firstName,
  //     lastName: googleAccount.lastName,
  //   });
  // };

  // const handleAuthFacebook = async ({ accessToken, userID }) => {
  //   const facebookRes = await getFBUserApi.request({ accessToken, userID });

  //   if (facebookRes.data === undefined) return;

  //   const facebookAccount = facebookRes.data;
  //   handleDispatchInfo({
  //     email: facebookAccount.email,
  //     firstName: facebookAccount.first_name,
  //     lastName: facebookAccount.last_name,
  //   });
  // };

  // const handleDispatchInfo = ({ email, firstName, lastName }) => {
  //   dispatch(setEmailPassword({ email, password: null }));

  //   dispatch(
  //     setPersonalData({
  //       name: firstName,
  //       lastname: lastName,
  //       birth: null,
  //       cc: null,
  //     })
  //   );

  //   setStep(2);
  // };

  return (
    <>
      <ActivityIndicator visible={checkEmailApi.loading} />

      <div className={styles.container}>
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

        {/* For the current version of the system, the following functionalities are not enabled */}

        {/* <Divider size="mediumTop" text="o" withText={true} />

        <AuthGoogleButton
          text="Continuar con Google"
          onSuccess={handleAuthGoogle}
          onFailure={() => {
            console.error('error authenticating with google');
          }}
          marginBottom={true}
          marginTop={true}
          withTinyMarginBottom={true}
        />

        <AuthFacebookButton
          text="Continuar con Facebook"
          onCallback={handleAuthFacebook}
          onFailure={() => {
            console.error('error authenticating with facebook');
          }}
          marginBottom={true}
        /> */}
      </div>
    </>
  );
}
