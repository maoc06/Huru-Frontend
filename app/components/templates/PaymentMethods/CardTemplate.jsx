import { useState } from 'react';

import Form from '../../modules/Forms/Form';
import CardNumberField from '../../elements/CardNumberField/CardNumberField';
import ExpityDateField from '../../elements/ExpiryDateField/ExpiryDateField';
import Textfield from '../../elements/Textfield/Textfield';
import SubmitButton from '../../elements/Button/SubmitButton';

import ActivityIndicator from '../../elements/ActivityIndicator/ActivityIndicator';
import StatusIndicator from '../../elements/StatusIndicator/StatusIndicator';
import checkAnimationData from '../../../../public/animations/check.json';
import errorAnimationData from '../../../../public/animations/error-cone.json';

import useApi from '../../../hooks/useApi';
import paymentGatewayApi from '../../../api/PaymentGatewayAPI';

import cardSchema from '../../../constants/validationSchema/card';

import style from './CardTemplate.module.scss';

const CardTemplate = ({ uid, email, number = '', readOnly = false }) => {
  const initialValues = { card_holder: '', number, expiry: '', cvc: '' };

  const saveCard = useApi(paymentGatewayApi.savePaymentSourceCard);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showFail, setShowFail] = useState(false);

  const handleButtonPopUpConfirm = () => {
    setShowConfirm(false);
  };

  const handleButtonPopUpFail = () => {
    setShowFail(false);
  };

  const handleSubmit = async ({ card_holder, cvc, expiry, number }) => {
    const exp = expiry.toString().split('/');

    const card = {
      card_holder,
      cvc,
      number: number.toString().replaceAll(' ', ''),
      exp_month: exp[0],
      exp_year: exp[1],
      uid,
      email,
    };

    try {
      const res = await saveCard.request(card);
      if (res.statusText === 'Created') setShowConfirm(true);
    } catch (error) {
      setShowFail(true);
    }
  };

  return (
    <>
      <ActivityIndicator visible={saveCard.loading} />

      <StatusIndicator
        animationData={checkAnimationData}
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
        visible={showFail}
        title={'No se agregado el metodo'}
        message={`Revisa que la cuenta del banco 
          no este bloqueada y que el metodo de pago sea valido dentro de Huru 
          (Visa, Mastercard, Amex).`}
        buttonMsg={'Regresar'}
        onClickButton={handleButtonPopUpFail}
      />

      <Form
        initialValues={initialValues}
        validationSchema={cardSchema}
        onSubmit={handleSubmit}
      >
        {!readOnly && (
          <Textfield
            name="card_holder"
            type="text"
            label="Titular"
            placeholder="Titular de la tarjeta"
            upperCase={true}
          />
        )}

        <CardNumberField
          name="number"
          type="tel"
          label="Número"
          placeholder="xxxx xxxx xxxx xxxx"
          readOnly={readOnly}
        />

        {!readOnly && (
          <section className={style.row_fields}>
            <ExpityDateField
              name="expiry"
              type="text"
              label="Fecha de exp."
              placeholder="Mes/Año"
              maxLength={5}
            />

            <Textfield
              name="cvc"
              type="tel"
              label="CVV"
              placeholder="123"
              maxLength={4}
            />
          </section>
        )}

        {!readOnly && <SubmitButton>Agregar metodo</SubmitButton>}
      </Form>
    </>
  );
};

export default CardTemplate;
