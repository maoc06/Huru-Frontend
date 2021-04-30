import { useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../../hooks/useApi';
import useAuth from '../../../hooks/useAuth';
import authApi from '../../../api/AuthAPI';

import Form from './Form';
import Textfield from '../../elements/Textfield/Textfield';
import AuxiliarLabel from '../../elements/AuxiliarLabel/AuxiliarLabel';
import SubmitButton from '../../elements/Button/SubmitButton';
import AuthFacebookButton from '../../elements/Button/AuthFacebookButton';
import AuthGoogleButton from '../../elements/Button/AuthGoogleButton';
import StatusIndicator from '../../elements/StatusIndicator/StatusIndicator';
import ActivityIndicator from '../../elements/ActivityIndicator/ActivityIndicator';
import checkAnimationData from '../../../../public/animations/error-cone.json';

import credentialsSchema from '../../../constants/validationSchema/credentials';
import { errorHandlerLogin } from '../../../utils/errorHandler';

import styles from './LoginForm.module.scss';

export default function LoginForm() {
  const auth = useAuth();
  const router = useRouter();

  const validateCredentials = useApi(authApi.signIn);
  const authGoogleApi = useApi(authApi.signInGoogle);

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  const [popUpOpen, setPopUpOpen] = useState(false);

  const initialValues = { email: '', password: '' };

  const handleAuth = ({ accessToken, showErrorOnPopUp = false }) => {
    const errors = errorHandlerLogin(accessToken);

    if (errors === 0) {
      router.push('/profile');
      auth.logIn(accessToken);
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

  const handleSubmit = async (user) => {
    const res = await validateCredentials.request(user);
    handleAuth({ accessToken: res.data.token });
  };

  const handleAuthFacebook = (facebookData) => {
    console.log(facebookData);
  };

  const handleAuthGoogle = async (googleData) => {
    const res = await authGoogleApi.request({ token: googleData.tokenId });
    handleAuth({ accessToken: res.data.accessToken, showErrorOnPopUp: true });
  };

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

        <p className={styles.alternative}>o entrar usando</p>

        <section className={styles.media}>
          <AuthFacebookButton onCallback={handleAuthFacebook} text="Facebook" />

          <AuthGoogleButton
            onFailure={(event) => console.log('Failure auth google', event)}
            onSuccess={handleAuthGoogle}
            text="Google"
          />
        </section>
      </div>
    </>
  );
}
