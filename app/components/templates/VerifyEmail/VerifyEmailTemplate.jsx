import StatusIndicator from '../../elements/StatusIndicator/StatusIndicator';
import checkAnimationData from '../../../../public/animations/check.json';
import errorAnimationData from '../../../../public/animations/error-cone.json';

const VerifyEmailTemplate = ({ verifyEmailApi, isValid }) => {
  return (
    <>
      {!verifyEmailApi.loading && isValid && (
        <StatusIndicator
          animationData={checkAnimationData}
          visible={true}
          title={`Tu email ha sido verficado`}
          message={
            'Ya puedes aprovechar al maximo las posibilidades que te brinda Huru.'
          }
          buttonMsg={'Ir al inicio de sesión'}
          route={'/signin'}
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
          route={'/'}
        />
      )}
    </>
  );
};

export default VerifyEmailTemplate;
