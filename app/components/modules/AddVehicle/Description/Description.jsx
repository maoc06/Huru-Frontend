import { useDispatch } from 'react-redux';

import { setDescription } from '../../../../redux/slices/vehicleRegisterSlice';

import Form from '../../Forms/Form';
import TextArea from '../../../elements/TextArea/TextArea';
import SubmitButton from '../../../elements/Button/SubmitButton';
import vehicleDescriptionSchema from '../../../../constants/validationSchema/vehicleDescription';
import styles from './Description.module.scss';

export default function VehicleDescription({ setStep, next }) {
  const dispatch = useDispatch();

  const initialValues = {
    description: '',
  };

  const handleSubmit = (description) => {
    dispatch(setDescription(description));
    setStep(next);
  };

  return (
    <div className={styles.container}>
      <Form
        initialValues={initialValues}
        validationSchema={vehicleDescriptionSchema}
        onSubmit={handleSubmit}
      >
        <TextArea
          name="description"
          placeholder="Describe tu vehículo..."
          maxLength={1000}
          rowsMin={10}
          marginTop
          marginToButton
        />

        <SubmitButton>Continuar</SubmitButton>
      </Form>
    </div>
  );
}
