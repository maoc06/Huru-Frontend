import { useSelector } from 'react-redux';

import useApi from '../../../hooks/useApi';
import useAuth from '../../../hooks/useAuth';
import authApi from '../../../api/AuthAPI';

import Form from '../Forms/Form';
import AppTerms from '../../elements/Terms/Terms';
import SubmitButton from '../../elements/Button/SubmitButton';

import ActivityIndicator from '../../elements/ActivityIndicator/ActivityIndicator';
import CheckIndicator from '../../elements/CheckIndicator/CheckIndicator';

import acceptTermsSchema from '../../../constants/validationSchema/acceptTerms';

export default function Terms() {
  const auth = useAuth();
  const singUp = useApi(authApi.signUp);
  const signIn = useApi(authApi.signIn);
  const user = useSelector((state) => state.userRegister);

  const initialValues = {
    checkTerms: false,
  };

  const handleSubmit = async (checkTerms) => {
    if (checkTerms) {
      let res;
      res = await singUp.request(user);

      const credentials = { email: user.email, password: user.password };
      res = await signIn.request(credentials);
      auth.logIn(res.data.token);
    }
  };

  return (
    <>
      <ActivityIndicator visible={singUp.loading || signIn.loading} />

      <CheckIndicator
        visible={
          !singUp.error &&
          !singUp.loading &&
          singUp.data.constructor === Object &&
          !signIn.error &&
          !signIn.loading &&
          signIn.data.constructor === Object
        }
        title={`¡Bienvenido, ${user.firstName}!`}
        message={'Explora Huru mientras validamos tu información.'}
        buttonMsg={'Explorar'}
        route={'/profile'}
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
