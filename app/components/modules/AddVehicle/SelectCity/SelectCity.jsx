import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCity } from '../../../../redux/slices/vehicleRegisterSlice';
import citySchema from '../../../../constants/validationSchema/citySelect';

import Form from '../../Forms/Form';
import Dropdown from '../../../elements/Dropdown/Dropdown';
import SubmitButton from '../../../elements/Button/SubmitButton';
import AuxiliarLabel from '../../../elements/AuxiliarLabel/AuxiliarLabel';
import ResponsiveDialog from '../../ResponsiveDialog/ResponsiveDialog';

import styles from './SelectCity.module.scss';

export default function SelectCity({ setStep, next }) {
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);

  const citiesOptions = useSelector(
    (state) => state.vehicleRegisterObjects.citiesOptions
  );
  
  // Get current city from Redux state
  const currentCity = useSelector((state) => state.vehicleRegister.city);

  const [selected, setSelected] = useState(
    currentCity?.cityId ? currentCity : (citiesOptions[0] || { cityId: 1, name: 'bogotá' })
  );

  const initialValues = { city: currentCity?.cityId ? currentCity : '' };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (citiesOptions.length > 0) {
      setSelected(citiesOptions[0]);
    }
  }, [citiesOptions]);

  const handleSubmit = () => {
    dispatch(setCity(selected));
    setStep(next);
  };

  return (
    <div className={styles.container}>
      {citiesOptions.constructor === Array &&
        Object.keys(citiesOptions).length > 0 && (
          <Form
            initialValues={initialValues}
            validationSchema={citySchema}
            onSubmit={handleSubmit}
          >
            <Dropdown
              name="city"
              list={citiesOptions}
              label={'Ciudad'}
              setSelectItem={setSelected}
              propKey={'cityId'}
              marginTop={true}
            />

            <div className={styles.helper}>
              <AuxiliarLabel
                text="No encuentro mi ciudad."
                onClick={() => setOpenDialog(true)}
                withIcon={true}
              />

              <ResponsiveDialog
                title="No encuentro mi ciudad."
                type="not-find-city"
                onClose={() => setOpenDialog(false)}
                visible={openDialog}
              />
            </div>

            <SubmitButton marginTop={true}>Continuar</SubmitButton>
          </Form>
        )}
    </div>
  );
}
