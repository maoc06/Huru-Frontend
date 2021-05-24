import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setFeatures } from '../../../../redux/slices/vehicleRegisterSlice';
import { carFeaturesIcons } from '../../../../utils/enums';
import Button from '../../../elements/Button/Button';
import CardSelectableLayout from '../../../layouts/CardSelectableLayout/CardSelectableLayout';

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
    // const selected = [];
    // for (const item in state) {
    //   if (state[item]) selected.push(item);
    // }

    dispatch(setFeatures(selected));
    setStep(next);
  };

  return (
    <div>
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

      {/* {features && (
        <section className={styles.features}>
          <FormControl component="fieldset">
            <ThemeProvider theme={themeMaterialUI}>
              <FormGroup>
                {features.map((item) => {
                  return (
                    <FormControlLabel
                      key={item.featureId}
                      style={{ textTransform: 'capitalize' }}
                      control={
                        <Checkbox
                          checked={state.featureId}
                          onChange={handleChange}
                          name={item.featureId}
                          color="primary"
                        />
                      }
                      label={item.name}
                    />
                  );
                })}
              </FormGroup>
            </ThemeProvider>
          </FormControl>
        </section>
      )} */}

      <Button onClick={handleSubmit} marginTop={true}>
        Continuar
      </Button>
    </div>
  );
}
