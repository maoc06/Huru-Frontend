import { useSelector, useDispatch } from 'react-redux';

import { setAdvanceNotice } from '../../../../redux/slices/vehicleRegisterSlice';

import Form from '../../Forms/Form';
import SubmitButton from '../../../elements/Button/SubmitButton';
import RadioGroup from '../../RadioGroup/RadioGroup';

import radioGroupSchema from '../../../../constants/validationSchema/radioGroup';

export default function AdvanceNotice({ setStep, next }) {
  const dispatch = useDispatch();
  const advanceNotices = useSelector(
    (state) => state.vehicleRegisterObjects.advanceNotices
  );

  const initialValues = {
    radioGroup: '',
  };

  const handleSubmit = (radioGroup) => {
    dispatch(setAdvanceNotice(radioGroup.radioGroup));
    setStep(next);
  };

  return (
    <div>
      <h3>¿Con cuánta antelación pueden reservar tu carro?</h3>

      <Form
        initialValues={initialValues}
        validationSchema={radioGroupSchema}
        onSubmit={handleSubmit}
      >
        <RadioGroup
          name="radioGroup"
          list={advanceNotices}
          defaultSelected="12 horas"
        />

        <SubmitButton>Continuar</SubmitButton>
      </Form>
    </div>
  );
}
