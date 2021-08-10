import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useApi from '../../../../hooks/useApi';
import authApi from '../../../../api/AuthAPI';

import { setPhoneVerified } from '../../../../redux/slices/userRegisterSlice';

import Form from '../../Forms/Form';
import TextfieldSingle from '../../../elements/TextFieldSingle/TextFieldSingle';
import SubmitButton from '../../../elements/Button/SubmitButton';
import TextFieldRowLayout from '../../../layouts/TextFieldRow/TextFieldRow';
import ActivityIndicator from '../../../elements/ActivityIndicator/ActivityIndicator';
import Countdown from '../../../elements/Countdown/Countdown';

import pinVerificationSchema from '../../../../constants/validationSchema/pinVerification';

import styles from './ValidatePhone.module.scss';
import registerStyles from '../Register.module.scss';

const DEFAULT_SECONDS_WAIT_RESEND = 90;

export default function ValidatePhone({ setStep }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userRegister);

  const verifySmsCode = useApi(authApi.verifySmsCode);
  const sendVerificationSms = useApi(authApi.sendSms);

  const [error, setError] = useState(false);
  const [counter, setCounter] = useState(DEFAULT_SECONDS_WAIT_RESEND);
  const [resendEnable, setResendEnable] = useState(false);

  const pinInputOne = useRef(null);
  const pinInputTwo = useRef(null);
  const pinInputThree = useRef(null);
  const pinInputFour = useRef(null);

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

  const resendCode = async () => {
    setResendEnable(false);
    setCounter(DEFAULT_SECONDS_WAIT_RESEND);

    await sendVerificationSms.request(phone.replace(/\D/g, ''));
  };

  return (
    <>
      <ActivityIndicator visible={verifySmsCode.loading} />

      <div className={registerStyles.container}>
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
            <TextfieldSingle
              name="pin1"
              type="tel"
              placeholder="0"
              currRef={pinInputOne}
              nextRef={pinInputTwo}
            />

            <TextfieldSingle
              name="pin2"
              type="tel"
              placeholder="0"
              currRef={pinInputTwo}
              nextRef={pinInputThree}
            />

            <TextfieldSingle
              name="pin3"
              type="tel"
              placeholder="0"
              currRef={pinInputThree}
              nextRef={pinInputFour}
            />

            <TextfieldSingle
              name="pin4"
              type="tel"
              placeholder="0"
              currRef={pinInputFour}
            />
          </TextFieldRowLayout>

          <p className={styles.bottom_label}>
            ¿No llegó el SMS?
            <span
              className={`${!resendEnable && styles.resendUnable}`}
              onClick={resendEnable ? resendCode : () => {}}
            >
              {` Reenviar código  `}
            </span>
            <Countdown
              counter={counter}
              setCounter={setCounter}
              onFinish={() => setResendEnable(true)}
            />
          </p>

          <SubmitButton marginTop>Verificar</SubmitButton>
        </Form>
      </div>
    </>
  );
}
