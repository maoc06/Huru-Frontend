import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setPhone } from '../../../redux/slices/userRegisterSlice';

import useApi from '../../../hooks/useApi';
import authApi from '../../../api/AuthAPI';

import Form from '../Forms/Form';
import PhoneFiled from '../../elements/PhoneField/PhoneField';
import SubmitButton from '../../elements/Button/SubmitButton';

import ActivityIndicator from '../../elements/ActivityIndicator/ActivityIndicator';

import userPhoneSchema from '../../../constants/validationSchema/userPhone';
import styles from './Register.module.scss';

export default function RegisterUserPhone({ setStep }) {
  const dispatch = useDispatch();
  const checkPhoneApi = useApi(authApi.checkPhone);
  const sendVerificationSms = useApi(authApi.sendSms);
  const [countryCode, setCountryCode] = useState();
  const [apiError, setApiError] = useState(false);

  const initialValues = { phone: '' };

  const handleSubmit = async ({ phone }) => {
    const phoneNumber = `+${countryCode} ${phone}`;
    const res = await checkPhoneApi.request(phoneNumber);
    if (res.data.data.phone !== undefined) setApiError(true);
    else {
      dispatch(setPhone({ phoneNumber }));
      await sendVerificationSms.request(phoneNumber.replace(/\D/g, ''));
      setStep(4);
    }
  };

  return (
    <>
      <ActivityIndicator
        visible={checkPhoneApi.loading || sendVerificationSms.loading}
      />

      <div className={styles.container}>
        <h3>¡Empecemos el viaje!</h3>

        <p>Escribe tu número de teléfono y nosotros te enviaremos un SMS</p>

        <Form
          initialValues={initialValues}
          validationSchema={userPhoneSchema}
          onSubmit={handleSubmit}
        >
          <PhoneFiled
            name="phone"
            placeholder="¿Cúal es tu numero de teléfono?"
            label="Teléfono"
            apiError={apiError}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
          />

          <SubmitButton>Continuar</SubmitButton>
        </Form>
      </div>
    </>
  );
}
