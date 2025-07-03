import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setFeatures } from '../../../../redux/slices/vehicleRegisterSlice';
import { carFeaturesIcons } from '../../../../utils/enums';
import Button from '../../../elements/Button/Button';
import CardSelectableLayout from '../../../layouts/CardSelectableLayout/CardSelectableLayout';
import styles from './SelectFeatures.module.scss';

export default function SelectFeatures({ setStep, next }) {
  const dispatch = useDispatch();
  const savedFeatures = useSelector((state) => state.vehicleRegister.features);
  const [selected, setSelected] = useState(savedFeatures || []);
  
  const features = useSelector(
    (state) => state.vehicleRegisterObjects.featuresOptions
  );

  const handleSelectionChange = (newSelection) => {
    setSelected(newSelection);
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
      {features.constructor === Array && Object.keys(features).length > 0 && (
        <CardSelectableLayout
          list={features}
          propSelect={'featureId'}
          propKey={'featureId'}
          propValue={'name'}
          onSelect={handleSelectionChange}
          withIconEnum={true}
          iconEnum={carFeaturesIcons}
          selectedItems={selected}
        />
      )}

      <Button onClick={handleSubmit} marginTop={true}>
        Continuar
      </Button>
    </div>
  );
}
