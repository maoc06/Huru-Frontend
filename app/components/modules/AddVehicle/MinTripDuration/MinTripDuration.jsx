import { useSelector, useDispatch } from 'react-redux';

import { setMinTripDuration } from '../../../../redux/slices/vehicleRegisterSlice';

import Form from '../../Forms/Form';
import SubmitButton from '../../../elements/Button/SubmitButton';
import RadioGroup from '../../RadioGroup/RadioGroup';

import radioGroupSchema from '../../../../constants/validationSchema/radioGroup';
import styles from './MinTripDuration.module.scss';

export default function MinTripDuration({ setStep, next }) {
  const dispatch = useDispatch();
  const minTripOptions = useSelector(
    (state) => state.vehicleRegisterObjects.minTripOptions
  );
  
  // Get current min trip duration from Redux state
  const currentMinTripDuration = useSelector((state) => state.vehicleRegister.minTripDuration);

  const initialValues = {
    radioGroup: currentMinTripDuration?.id ? currentMinTripDuration : '',
  };

  const handleSubmit = (radioGroup) => {
    dispatch(setMinTripDuration(radioGroup.radioGroup));
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
          list={minTripOptions}
          defaultSelected="1 día"
        />

        <SubmitButton marginTop={true}>Continuar</SubmitButton>
      </Form>
    </div>
  );
}
