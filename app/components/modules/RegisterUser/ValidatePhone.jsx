import { useState } from 'react';
import { useSelector } from 'react-redux';

import Form from '../Forms/Form';

import TextfieldSingle from '../../elements/TextFieldSingle/TextFieldSingle';
import SubmitButton from '../../elements/Button/SubmitButton';
import TextFieldRowLayout from '../../layouts/TextFieldRow/TextFieldRow';

import pinVerificationSchema from '../../../constants/validationSchema/pinVerification';

export default function ValidatePhone({ setStep }) {
  const user = useSelector((state) => state.userRegister);
  const [error, setError] = useState(false);

  const initialValues = { pin1: '', pin2: '', pin3: '', pin4: '' };

  const handleSubmit = (pin) => {
    const { pin1, pin2, pin3, pin4 } = pin;
    if (pin1 === 0 && pin2 === 0 && pin3 === 0 && pin4 === 0) {
      setStep(5);
    }
  };

  return (
    <>
      <h3>Ya casi acabamos</h3>

      <p>Enviamos un código PIN por mensaje SMS al {user.phone}</p>

      <Form
        initialValues={initialValues}
        validationSchema={pinVerificationSchema}
        onSubmit={handleSubmit}
      >
        <TextFieldRowLayout
          label={'PIN'}
          error={error}
          marginTop
          marginToButton
        >
          <TextfieldSingle name="pin1" type="number" placeholder="0" />

          <TextfieldSingle name="pin2" type="number" placeholder="0" />

          <TextfieldSingle name="pin3" type="number" placeholder="0" />

          <TextfieldSingle name="pin4" type="number" placeholder="0" />
        </TextFieldRowLayout>

        <SubmitButton marginTop>Verificar</SubmitButton>
      </Form>
    </>
  );
}
