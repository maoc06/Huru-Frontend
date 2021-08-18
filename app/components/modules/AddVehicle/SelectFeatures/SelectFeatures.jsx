import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setFeatures } from '../../../../redux/slices/vehicleRegisterSlice';
import { carFeaturesIcons } from '../../../../utils/enums';
import Button from '../../../elements/Button/Button';
import CardSelectableLayout from '../../../layouts/CardSelectableLayout/CardSelectableLayout';
import styles from './SelectFeatures.module.scss';

export default function SelectFeatures({ setStep, next }) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const features = useSelector(
    (state) => state.vehicleRegisterObjects.featuresOptions
  );

  const handleChange = (featureId) => {
    setSelected([...selected, featureId]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = () => {
    dispatch(setFeatures(selected));
    setStep(next);
  };

  return (
    <div className={styles.container}>
      <h3>Cuéntanos sobre tu carro</h3>

      {features.constructor === Array && Object.keys(features).length > 0 && (
        <CardSelectableLayout
          list={features}
          propSelect={'featureId'}
          propKey={'featureId'}
          propValue={'name'}
          onSelect={handleChange}
          withIconEnum={true}
          iconEnum={carFeaturesIcons}
          cardSizes="large"
          lightBackground={true}
        />
      )}

      <Button onClick={handleSubmit} marginTop={true}>
        Continuar
      </Button>
    </div>
  );
}
