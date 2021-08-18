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

  const initialValues = {
    radioGroup: '',
  };

  const handleSubmit = (radioGroup) => {
    dispatch(setMinTripDuration(radioGroup.radioGroup));
    setStep(next);
  };

  return (
    <div className={styles.container}>
      <h3>¿Cúal será el viaje más corto que aceptarás?</h3>

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
