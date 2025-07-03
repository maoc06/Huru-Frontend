import { useSelector, useDispatch } from 'react-redux';

import { setMaxTripDuration } from '../../../../redux/slices/vehicleRegisterSlice';

import Form from '../../Forms/Form';
import SubmitButton from '../../../elements/Button/SubmitButton';
import RadioGroup from '../../RadioGroup/RadioGroup';

import radioGroupSchema from '../../../../constants/validationSchema/radioGroup';
import styles from './MaxTripDuration.module.scss';

export default function MaxTripDuration({ setStep, next }) {
  const dispatch = useDispatch();
  const maxTripOptions = useSelector(
    (state) => state.vehicleRegisterObjects.maxTripOptions
  );
  
  // Get current max trip duration from Redux state
  const currentMaxTripDuration = useSelector((state) => state.vehicleRegister.maxTripDuration);

  const initialValues = {
    radioGroup: currentMaxTripDuration?.id ? currentMaxTripDuration : '',
  };

  const handleSubmit = (radioGroup) => {
    dispatch(setMaxTripDuration(radioGroup.radioGroup));
    setStep(next);
  };

  return (
    <div className={styles.container}>
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

        <SubmitButton marginTop={true}>Continuar</SubmitButton>
      </Form>
    </div>
  );
}
