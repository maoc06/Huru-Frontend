import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setFuel } from '../../../../redux/slices/vehicleRegisterSlice';
import fuelSchema from '../../../../constants/validationSchema/fuelType';

import Form from '../../Forms/Form';
import Dropdown from '../../../elements/Dropdown/Dropdown';
import SubmitButton from '../../../elements/Button/SubmitButton';
import styles from './SelectFuel.module.scss';

export default function SelectFuel({ setStep, next }) {
  const dispatch = useDispatch();

  const fuelOptions = useSelector(
    (state) => state.vehicleRegisterObjects.fuelOptions
  );
  
  // Get current fuel from Redux state
  const currentFuel = useSelector((state) => state.vehicleRegister.fuel);
  
  const [selected, setSelected] = useState(
    currentFuel?.fuelId ? currentFuel : (fuelOptions[0] || { fuelId: 1, name: 'corriente' })
  );

  const initialValues = { fuelType: currentFuel?.fuelId ? currentFuel : '' };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (fuelOptions.length > 0) {
      setSelected(fuelOptions[0]);
    }
  }, [fuelOptions]);

  const handleSubmit = () => {
    dispatch(setFuel(selected));
    setStep(next);
  };

  return (
    <div className={styles.container}>
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
