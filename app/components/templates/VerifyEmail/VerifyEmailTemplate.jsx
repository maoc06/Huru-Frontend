import { useRouter } from 'next/router';

import StatusIndicator from '../../elements/StatusIndicator/StatusIndicator';
import checkAnimationData from '../../../../public/animations/check-secondary.json';
import errorAnimationData from '../../../../public/animations/error-cone.json';

const VerifyEmailTemplate = ({ verifyEmailApi, isValid }) => {
  const router = useRouter();

  const handleButtonPopUpSuccess = () => {
    router.push('/signin');
  };

  const handleButtonPopUpFail = () => {
    router.push('/');
  };

  return (
    <>
      {!verifyEmailApi.loading && isValid && (
        <StatusIndicator
          animationData={checkAnimationData}
          visible={true}
          isLoop={false}
          delay={500}
          title={`Tu email ha sido verficado`}
          message={
            'Ya puedes aprovechar al maximo las posibilidades que te brinda Huru.'
          }
          buttonMsg={'Ir al inicio de sesión'}
          onClickButton={handleButtonPopUpSuccess}
        />
      )}

      {!verifyEmailApi.loading && !isValid && (
        <StatusIndicator
          animationData={errorAnimationData}
          isLoop={false}
          visible={true}
          title={'No se puedo validar el email'}
          message={
            'Parece que el email ya fue validado o el código de verificación ya expiro. '
          }
          buttonMsg={'Ir al inicio'}
          onClickButton={handleButtonPopUpFail}
        />
      )}
    </>
  );
};

export default VerifyEmailTemplate;
