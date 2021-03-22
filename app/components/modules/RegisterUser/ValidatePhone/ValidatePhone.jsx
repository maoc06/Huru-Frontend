import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useApi from '../../../../hooks/useApi';
import authApi from '../../../../api/AuthAPI';

import { setPhoneVerified } from '../../../../redux/slices/userRegisterSlice';

import Form from '../../Forms/Form';
import TextfieldSingle from '../../../elements/TextFieldSingle/TextFieldSingle';
import SubmitButton from '../../../elements/Button/SubmitButton';
import ErrorMessage from '../../../elements/ErrorMessage/ErrorMessage';
import TextFieldRowLayout from '../../../layouts/TextFieldRow/TextFieldRow';
import ActivityIndicator from '../../../elements/ActivityIndicator/ActivityIndicator';

import pinVerificationSchema from '../../../../constants/validationSchema/pinVerification';

import styles from './ValidatePhone.module.scss';

export default function ValidatePhone({ setStep }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userRegister);
  const verifySmsCode = useApi(authApi.verifySmsCode);
  const [error, setError] = useState(false);

  const initialValues = { pin1: '', pin2: '', pin3: '', pin4: '' };
  const { phone } = user;

  const handleSubmit = async (pin) => {
    const isValidCode = await verifySmsCode.request(
      phone.replace(/\D/g, ''),
      Object.values(pin).join('')
    );

    if (isValidCode === undefined || isValidCode.constructor !== Object) {
      setError(true);
    } else {
      if (!isValidCode.data.data.valid) setError(true);
      else {
        dispatch(setPhoneVerified(true));
        setStep(5);
      }
    }
  };

  return (
    <>
      <ActivityIndicator visible={verifySmsCode.loading} />

      <div>
        <h3>Ya casi acabamos</h3>

        <p>Enviamos un código PIN por mensaje SMS al {phone}</p>

        <Form
          initialValues={initialValues}
          validationSchema={pinVerificationSchema}
          onSubmit={handleSubmit}
        >
          <TextFieldRowLayout
            label={'PIN'}
            error={error}
            errorMsg={'Parece que el código no es valido'}
            marginTop
            marginToButton
          >
            <TextfieldSingle name="pin1" type="tel" placeholder="0" />

            <TextfieldSingle name="pin2" type="tel" placeholder="0" />

            <TextfieldSingle name="pin3" type="tel" placeholder="0" />

            <TextfieldSingle name="pin4" type="tel" placeholder="0" />
          </TextFieldRowLayout>

          <p className={styles.bottom_label}>
            ¿No llegó el SMS?
            <span onClick={() => console.log('Resend SMS')}>
              {` Reenviar código`}
            </span>
          </p>

          <SubmitButton marginTop>Verificar</SubmitButton>
        </Form>
      </div>
    </>
  );
}
