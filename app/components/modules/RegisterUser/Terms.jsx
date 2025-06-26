import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import useApi from '../../../hooks/useApi';
import useAuth from '../../../hooks/useAuth';
import authApi from '../../../api/AuthAPI';

import Form from '../Forms/Form';
import AppTerms from '../../elements/Terms/Terms';
import SubmitButton from '../../elements/Button/SubmitButton';
import SeePreview from '../../elements/SeePreview/SeePreview';

import ActivityIndicator from '../../elements/ActivityIndicator/ActivityIndicator';
import StatusIndicator from '../../elements/StatusIndicator/StatusIndicator';
import emailAnimationData from '../../../../public/animations/sent-email.json';
import styles from './Register.module.scss';

import acceptTermsSchema from '../../../constants/validationSchema/acceptTerms';

export default function Terms() {
  const router = useRouter();
  const auth = useAuth();
  const singUp = useApi(authApi.signUp);
  let user = useSelector((state) => state.userRegister);

  const [popUpOpen, setPopUpOpen] = useState(false);

  const initialValues = {
    checkTerms: false,
  };

  const handleButtonPopUp = () => {
    router.push('/');
  };

  const handleSubmit = async ({ checkTerms }) => {
    if (checkTerms) {
      const res = await singUp.request(user);

      if (res.ok) {
        auth.logIn(res.data.accessToken);
        setPopUpOpen(true);
      }
      // You could add an else block here to handle registration errors
    }
  };

  return (
    <>
      <ActivityIndicator visible={singUp.loading} />

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

      <div className={styles.container}>
        <h3>Terminamos</h3>

        <article>
          <p>
            Revisa la vista previa para asegurarte que todo está como lo deseas.
            Una vez aceptes los términos y políticas de Huru, un miembro del
            equipo de soporte validará la información de tu perfil. Hasta
            entonces no podras realizar ninguna reserva.
          </p>
        </article>

        <SeePreview dialogTitle="Vista previa de usuario" />

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
