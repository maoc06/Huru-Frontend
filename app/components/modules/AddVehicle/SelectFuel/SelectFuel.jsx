import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setFuel } from '../../../../redux/slices/vehicleRegisterSlice';
import fuelSchema from '../../../../constants/validationSchema/fuelType';

import Form from '../../Forms/Form';
import Dropdown from '../../../elements/Dropdown/Dropdown';
import SubmitButton from '../../../elements/Button/SubmitButton';
import styles from './SelectFuel.module.scss';

export default function SelectFuel({ setStep, next }) {
  const initialValues = { fuelType: '' };

  const dispatch = useDispatch();

  const [selected, setSelected] = useState({ fuelId: 1, name: 'corriente' });
  const fuelOptions = useSelector(
    (state) => state.vehicleRegisterObjects.fuelOptions
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = () => {
    dispatch(setFuel(selected));
    setStep(next);
  };

  return (
    <div className={styles.container}>
      <h3>Cuéntanos sobre tu carro</h3>
      <p>¿Qué tipo de combustible deberían usar para tu vehículo?</p>

      {fuelOptions.constructor === Array &&
        Object.keys(fuelOptions).length > 0 && (
          <Form
            initialValues={initialValues}
            validationSchema={fuelSchema}
            onSubmit={handleSubmit}
          >
            <Dropdown
              name="fuelType"
              list={fuelOptions}
              label={'Tipo de combustible'}
              setSelectItem={setSelected}
              propKey={'fuelId'}
              marginTop={true}
            />

            <SubmitButton marginTop={true}>Continuar</SubmitButton>
          </Form>
        )}
    </div>
  );
}
