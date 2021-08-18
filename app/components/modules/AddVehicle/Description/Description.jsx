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
      <h3>Descripción</h3>

      <article>
        <p>
          Cuéntale a todos las razones por las que conducir tu carro es una
          experiencia inigualable.
        </p>

        <br />

        <p>
          Recuerda que los vehículos con descripciones tienen más posibilidades
          de ser reservados, así que aprovecha este espacio.
        </p>
      </article>

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
