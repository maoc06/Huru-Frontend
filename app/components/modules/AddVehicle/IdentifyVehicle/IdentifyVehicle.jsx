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
  
  // Get current state from Redux
  const vehicleState = useSelector((state) => state.vehicleRegister);
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

  const [selectedMaker, setSelectMaker] = useState(null);
  const [odometerOutRange, setOdometerOutRange] = useState(false);
  const [modelsByMaker, setModelsByMaker] = useState([]);

  const initialValues = {
    vin: vehicleState.vin || '',
    maker: vehicleState.maker?.makerId ? vehicleState.maker : (makers && makers.length > 0 ? makers[0] : null),
    model: vehicleState.model?.modelId ? vehicleState.model : null,
    year: vehicleState.year?.year ? vehicleState.year : (vehicleYear.years && vehicleYear.years.length > 0 ? vehicleYear.years[0] : null),
    transmission: vehicleState.transmission?.transmissionId ? vehicleState.transmission : (transmissions && transmissions.length > 0 ? transmissions[0] : null),
    odometer: vehicleState.odometer?.odometerRangeId ? vehicleState.odometer : (odometerRanges && odometerRanges.length > 0 ? odometerRanges[0] : null),
  };

  const handleSubmit = (vehicleInfo) => {
    if (vehicleInfo.odometer && vehicleInfo.odometer.odometerRangeId === 4) {
      setOdometerOutRange(true);
    } else {
      dispatch(setBasicData(vehicleInfo));
      setStep(next);
    }
  };

  const handleSetModelByMaker = () => {
    if (selectedMaker && selectedMaker.makerId && models && models.length > 0) {
      const filteredModels = models.filter((item) => item.makerId === selectedMaker.makerId);
      setModelsByMaker(filteredModels);
    } else {
      setModelsByMaker([]);
    }
  };

  // On Init Component
  useEffect(() => {
    if (vehicleState.maker?.makerId) {
      setSelectMaker(vehicleState.maker);
    } else if (makers && makers.length > 0) {
      setSelectMaker(makers[0]);
    }
  }, [makers, vehicleState.maker]);

  // On Update Component - when selectedMaker or models change
  useEffect(() => {
    handleSetModelByMaker();
  }, [selectedMaker, models]);

  return (
    <div className={styles.container}>
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
          list={makers || []}
          label={'Fabricante'}
          setSelectItem={setSelectMaker}
          propKey={'makerId'}
          propName={'name'}
          marginBottom
        />

        <Dropdown
          name="model"
          list={modelsByMaker}
          label="Modelo"
          propKey={'modelId'}
          propName={'name'}
          marginBottom
        />

        <Dropdown
          name="year"
          list={vehicleYear.years || []}
          label={'Año'}
          propKey="id"
          propName="year"
          marginBottom
        />

        <Dropdown
          name="transmission"
          list={transmissions || []}
          label={'Transmisión'}
          propKey={'transmissionId'}
          propName={'name'}
          marginBottom
        />

        <Dropdown
          name="odometer"
          list={odometerRanges || []}
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
