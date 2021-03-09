import { useSelector, useDispatch } from 'react-redux';

import { setMaxTripDuration } from '../../../../redux/slices/vehicleRegisterSlice';

import Form from '../../Forms/Form';
import SubmitButton from '../../../elements/Button/SubmitButton';
import RadioGroup from '../../RadioGroup/RadioGroup';

import radioGroupSchema from '../../../../constants/validationSchema/radioGroup';

export default function MaxTripDuration({ setStep, next }) {
  const dispatch = useDispatch();
  const maxTripOptions = useSelector(
    (state) => state.vehicleRegisterObjects.maxTripOptions
  );

  const initialValues = {
    radioGroup: '',
  };

  const handleSubmit = (radioGroup) => {
    dispatch(setMaxTripDuration(radioGroup.radioGroup));
    setStep(next);
  };

  return (
    <div>
      <h3>¿Cúal será el viaje más largo que aceptarás?</h3>

      <Form
        initialValues={initialValues}
        validationSchema={radioGroupSchema}
        onSubmit={handleSubmit}
      >
        <RadioGroup
          name="radioGroup"
          list={maxTripOptions}
          defaultSelected="1 mes"
        />

        <SubmitButton>Continuar</SubmitButton>
      </Form>
    </div>
  );
}
