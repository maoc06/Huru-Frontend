import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setBasicData } from '../../../../redux/slices/vehicleRegisterSlice';

import Form from '../../Forms/Form';
import Textfield from '../../../elements/Textfield/Textfield';
import Dropdown from '../../../elements/Dropdown/Dropdown';
import SubmitButton from '../../../elements/Button/SubmitButton';

import vehicleSchema from '../../../../constants/validationSchema/identifyVehicle';
import vehicleYear from '../../../../constants/others/vehicleYears';
import styles from './IndentifyVehicle.module.scss';

const odometerErrorMsg =
  'No se aceptan vehículos con kilometraje superior a 130k Km';

function IdentifyVehicle({ setStep, next }) {
  const dispatch = useDispatch();
  const vin = useSelector((state) => state.vehicleRegister.vin);
  const makers = useSelector((state) => state.vehicleRegisterObjects.makers);
  const models = useSelector(
    (state) => state.vehicleRegisterObjects.vehicleModels
  );
  const transmissions = useSelector(
    (state) => state.vehicleRegisterObjects.transmissions
  );
  const odometerRanges = useSelector(
    (state) => state.vehicleRegisterObjects.odometerRanges
  );

  const [selectedMaker, setSelectMaker] = useState(makers[0]);
  const [odometerOutRange, setOdometerOutRange] = useState(false);
  const [modelsByMaker, setModelsByMaker] = useState([
    { modelId: 0, name: 'Seleccionar modelo...' },
  ]);

  const initialValues = {
    vin: vin,
    maker: '',
    model: '',
    year: '',
    transmission: '',
    odometer: '',
  };

  const handleSubmit = (vehicleInfo) => {
    if (vehicleInfo.odometer.odometerRangeId === 4) {
      setOdometerOutRange(true);
    } else {
      dispatch(setBasicData(vehicleInfo));
      setStep(next);
    }
  };

  const handleSetModelByMaker = () => {
    setModelsByMaker(
      models.filter((item) => item.makerId === selectedMaker.makerId)
    );
  };

  // On Init Component
  useEffect(() => {
    handleSetModelByMaker();
  }, []);

  // On Update Component
  useEffect(() => {
    handleSetModelByMaker();
  }, [selectedMaker]);

  return (
    <div className={styles.container}>
      <h3>Identifica tu carro</h3>

      <Form
        initialValues={initialValues}
        validationSchema={vehicleSchema}
        onSubmit={handleSubmit}
      >
        <Textfield
          name="vin"
          label="VIN"
          placeholder="¿Cúal es el VIN de tu carro?"
          upperCase={true}
        />

        <Dropdown
          name="maker"
          list={makers}
          label={'Fabricante'}
          setSelectItem={setSelectMaker}
          propKey={'makerId'}
          marginBottom
        />

        <Dropdown
          name="model"
          list={modelsByMaker}
          label="Modelo"
          propKey={'modelId'}
          marginBottom
        />

        <Dropdown
          name="year"
          list={vehicleYear.years}
          label={'Año'}
          propKey="id"
          propName="year"
          marginBottom
        />

        <Dropdown
          name="transmission"
          list={transmissions}
          label={'Transmisión'}
          propKey={'transmissionId'}
          marginBottom
        />

        <Dropdown
          name="odometer"
          list={odometerRanges}
          label={'Kilometraje'}
          propKey={'odometerRangeId'}
          propName={'range'}
          error={odometerOutRange}
          setError={setOdometerOutRange}
          errorMsg={odometerErrorMsg}
          marginToButton
        />

        <SubmitButton>Continuar</SubmitButton>
      </Form>
    </div>
  );
}

export default IdentifyVehicle;
