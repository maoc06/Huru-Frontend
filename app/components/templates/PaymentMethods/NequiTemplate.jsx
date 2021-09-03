import { useState } from 'react';
import { useRouter } from 'next/router';

import Form from '../../modules/Forms/Form';
import PhoneFiled from '../../elements/PhoneField/PhoneField';
import SubmitButton from '../../elements/Button/SubmitButton';
import WarningAlert from '../../elements/WarningAlert/WarningAlert';

import ActivityIndicator from '../../elements/ActivityIndicator/ActivityIndicator';
import StatusIndicator from '../../elements/StatusIndicator/StatusIndicator';
import checkAnimationData from '../../../../public/animations/check.json';
import errorAnimationData from '../../../../public/animations/error-cone.json';

import useApi from '../../../hooks/useApi';
import paymentGatewayApi from '../../../api/PaymentGatewayAPI';
import nequiSchema from '../../../constants/validationSchema/nequi';

const NequiTemplate = ({ uid, email, phone = '', readOnly = false }) => {
  const router = useRouter();
  const initialValues = { phone };

  const saveNequi = useApi(paymentGatewayApi.savePaymentSourceNequi);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showFail, setShowFail] = useState(false);

  const handleButtonPopUpConfirm = () => {
    setShowConfirm(false);
    router.push('/profile/payment-methods');
  };

  const handleButtonPopUpFail = () => {
    setShowFail(false);
  };

  const handleSubmit = async ({ phone }) => {
    const nequi = {
      phone: phone.toString().replace('-', ''),
      uid,
      email,
    };

    try {
      const res = await saveNequi.request(nequi);
      if (res.statusText === 'Created') setShowConfirm(true);
    } catch (error) {
      setShowFail(true);
    }
  };

  return (
    <>
      <ActivityIndicator visible={saveNequi.loading} />

      <StatusIndicator
        animationData={checkAnimationData}
        isLoop={false}
        visible={showConfirm}
        title={'Metodo agregado exitosamente'}
        message={
          'Tú nuevo método de pago ha sigo agregado. Ahora podrás usarlo en tus próximas reservas para pagar de forma rápida.'
        }
        buttonMsg={'Regresar'}
        onClickButton={handleButtonPopUpConfirm}
      />

      <StatusIndicator
        animationData={errorAnimationData}
        isLoop={false}
        visible={showFail}
        title={'No se agregado el metodo'}
        message={`Revisa que la cuenta Nequi este activa o comunicate con el soporte tecnico.`}
        buttonMsg={'Regresar'}
        onClickButton={handleButtonPopUpFail}
      />

      <Form
        initialValues={initialValues}
        validationSchema={nequiSchema}
        onSubmit={handleSubmit}
      >
        <PhoneFiled
          name="phone"
          placeholder="Número de la cuenta Nequi"
          label="Teléfono"
          withCountryCode={false}
          withMarginBottom={false}
          readOnly={readOnly}
        />

        {!readOnly && (
          <WarningAlert
            warningMessage={`Recuerda que para realizar 
          reservas por este método, debes tener descargada la 
          aplicación de Nequi para confirmar el proceso de pago.
          `}
          />
        )}

        {!readOnly && <SubmitButton>Agregar metodo</SubmitButton>}
      </Form>
    </>
  );
};

export default NequiTemplate;
