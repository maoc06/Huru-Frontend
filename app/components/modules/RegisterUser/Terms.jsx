import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import useApi from '../../../hooks/useApi';
import useAuth from '../../../hooks/useAuth';
import authApi from '../../../api/AuthAPI';

import Form from '../Forms/Form';
import AppTerms from '../../elements/Terms/Terms';
import SubmitButton from '../../elements/Button/SubmitButton';

import ActivityIndicator from '../../elements/ActivityIndicator/ActivityIndicator';
import StatusIndicator from '../../elements/StatusIndicator/StatusIndicator';
import emailAnimationData from '../../../../public/animations/sent-email.json';

import acceptTermsSchema from '../../../constants/validationSchema/acceptTerms';

export default function Terms() {
  const router = useRouter();
  const auth = useAuth();
  const singUp = useApi(authApi.signUp);
  const signIn = useApi(authApi.signIn);
  const user = useSelector((state) => state.userRegister);

  const [popUpOpen, setPopUpOpen] = useState(false);

  const initialValues = {
    checkTerms: false,
  };

  const handleButtonPopUp = () => {
    router.push('/profile');
  };

  const handleSubmit = async (checkTerms) => {
    if (checkTerms) {
      const res = await singUp.request(user);

      auth.logIn(res.data.accessToken);
      setPopUpOpen(true);
    }
  };

  return (
    <>
      <ActivityIndicator visible={singUp.loading || signIn.loading} />

      <StatusIndicator
        animationData={emailAnimationData}
        visible={popUpOpen}
        title={`¡Bienvenido, ${user.firstName}!`}
        message={
          'Para finalizar, enviamos un correo de verificación. Mientras puedes ir explorando el universo Huru.'
        }
        buttonMsg={'Explorar'}
        onClickButton={handleButtonPopUp}
      />

      <div>
        <h3>Terminamos</h3>

        <article>
          <p>
            Revisa la vista previa para asegurarte que todo está como lo deseas.
            Una vez aceptes los términos y políticas de Huru, un miembro del
            equipo de soporte validará la información de tu perfil. Hasta
            entonces no podras realizar ninguna reserva.
          </p>
        </article>

        <Form
          initialValues={initialValues}
          validationSchema={acceptTermsSchema}
          onSubmit={handleSubmit}
        >
          <AppTerms name="checkTerms" />

          <SubmitButton>Registrame</SubmitButton>
        </Form>
      </div>
    </>
  );
}
