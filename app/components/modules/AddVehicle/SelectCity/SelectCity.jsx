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
  const initialValues = { city: '' };

  const dispatch = useDispatch();

  const [selected, setSelected] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  const citiesOptions = useSelector(
    (state) => state.vehicleRegisterObjects.citiesOptions
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = () => {
    dispatch(setCity(selected));
    setStep(next);
  };

  return (
    <div>
      <h3>Cuéntanos sobre tu carro</h3>
      <p>¿Dónde está ubicado tu vehículo?</p>

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
