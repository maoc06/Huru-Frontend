import { useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../../hooks/useApi';
import useAuth from '../../../hooks/useAuth';
import authApi from '../../../api/AuthAPI';
// import FBGraphApi from '../../../api/FBGraphAPI';

import Form from './Form';
import Textfield from '../../elements/Textfield/Textfield';
import AuxiliarLabel from '../../elements/AuxiliarLabel/AuxiliarLabel';
import SubmitButton from '../../elements/Button/SubmitButton';
import StatusIndicator from '../../elements/StatusIndicator/StatusIndicator';
import ActivityIndicator from '../../elements/ActivityIndicator/ActivityIndicator';
import checkAnimationData from '../../../../public/animations/error-cone.json';
// import AuthFacebookButton from '../../elements/Button/AuthFacebookButton';
// import AuthGoogleButton from '../../elements/Button/AuthGoogleButton';

import credentialsSchema from '../../../constants/validationSchema/credentials';
import { errorHandlerLogin } from '../../../utils/errorHandler';

import styles from './LoginForm.module.scss';

export default function LoginForm() {
  const auth = useAuth();
  const router = useRouter();

  const validateCredentials = useApi(authApi.signIn);

  // For the current version of the system, the following functionalities are not enabled

  // const authGoogleApi = useApi(authApi.signInGoogle);
  // const authFacebookApi = useApi(authApi.signInFacebook);
  // const getFBUserApi = useApi(FBGraphApi.getUserInfo);

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  const [popUpOpen, setPopUpOpen] = useState(false);

  const initialValues = { email: '', password: '' };

  const handleAuth = async ({ accessToken, showErrorOnPopUp = false }) => {
    const errors = errorHandlerLogin(accessToken);

    if (errors === 0) {
      try {
        await auth.logIn(accessToken);
        router.push('/');
      } catch (error) {
        console.error('Error during login process:', error);
        setEmailError(true);
        setEmailErrorMsg('Error durante el proceso de login');
      }
    } else {
      if (errors.index === 0) {
        if (showErrorOnPopUp) {
          setPopUpOpen(true);
        } else {
          setEmailErrorMsg(errors.msg);
          setEmailError(true);
        }
      } else if (errors.index === 1) {
        setPasswordErrorMsg(errors.msg);
        setPasswordError(true);
      }
    }
  };

  const resetErrors = () => {
    setEmailError(false);
    setPasswordError(false);
  };

  const handleSubmit = async (user) => {
    resetErrors();
    console.log('Login attempt with:', user);
    
    try {
      const res = await validateCredentials.request(user);
      console.log('Login response:', res);
      
      if (res && res.data) {
        // Handle different possible response structures
        const token = res.data.token || res.data.accessToken || res.data.data?.token;
        
        if (token) {
          await handleAuth({ accessToken: token });
        } else {
          console.error('No token found in response:', res.data);
          setEmailError(true);
          setEmailErrorMsg('Error en la respuesta del servidor');
        }
      } else {
        console.error('Invalid response structure:', res);
        setEmailError(true);
        setEmailErrorMsg('Error de conexión con el servidor');
      }
    } catch (error) {
      console.error('Login error:', error);
      setEmailError(true);
      setEmailErrorMsg('Error de conexión. Verifica tu conexión a internet.');
    }
  };

  // For the current version of the system, the following functionalities are not enabled

  // const handleAuthFacebook = async ({ accessToken, userID }) => {
  //   const facebookRes = await getFBUserApi.request({ accessToken, userID });
  //   if (facebookRes.data === undefined) return;
  //   const facebookAccount = facebookRes.data;

  //   const res = await authFacebookApi.request({ email: facebookAccount.email });
  //   handleAuth({ accessToken: res.data.accessToken, showErrorOnPopUp: true });
  // };

  // const handleAuthGoogle = async (googleData) => {
  //   const res = await authGoogleApi.request({ token: googleData.tokenId });
  //   handleAuth({ accessToken: res.data.accessToken, showErrorOnPopUp: true });
  // };

  return (
    <>
      <ActivityIndicator visible={validateCredentials.loading} />

      <StatusIndicator
        animationData={checkAnimationData}
        visible={popUpOpen}
        title={'Usuario no registrado'}
        message={
          'Parece que la cuenta no esta registrada, fue borrada o esta deshabilitada.'
        }
        buttonMsg={'Aceptar'}
        onClickButton={() => setPopUpOpen(false)}
      />

      <div className={styles.container}>
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
            onChangeAux={() => setEmailError(false)}
          />

          <Textfield
            name="password"
            type="password"
            label="Contraseña"
            placeholder="Digita tu contraseña"
            apiError={passwordError}
            errorMsg={passwordErrorMsg}
            onChangeAux={() => setPasswordError(false)}
            withSmallBottomMargin
          />

          <AuxiliarLabel text="¿Olvidates tu contraseña?" bold />

          <SubmitButton marginTop>Iniciar sesión</SubmitButton>
        </Form>

        {/* For the current version of the system, the following functionalities are not enabled */}

        {/* <p className={styles.alternative}>o entrar usando</p>

        <section className={styles.media}>
          <AuthFacebookButton
            onCallback={handleAuthFacebook}
            onFailure={() => console.error('Failure auth facebook')}
            text="Facebook"
          />

          <AuthGoogleButton
            onFailure={() => console.error('Failure auth google')}
            onSuccess={handleAuthGoogle}
            text="Google"
          />
        </section> */}
      </div>
    </>
  );
}
