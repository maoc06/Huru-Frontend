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
  
  // Get current advance notice from Redux state
  const currentAdvanceNotice = useSelector((state) => state.vehicleRegister.advanceNotice);

  const initialValues = {
    radioGroup: currentAdvanceNotice?.id ? currentAdvanceNotice : '',
  };

  const handleSubmit = (radioGroup) => {
    dispatch(setAdvanceNotice(radioGroup.radioGroup));
    setStep(next);
  };

  return (
    <div>
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

        <SubmitButton marginTop={true}>Continuar</SubmitButton>
      </Form>
    </div>
  );
}
