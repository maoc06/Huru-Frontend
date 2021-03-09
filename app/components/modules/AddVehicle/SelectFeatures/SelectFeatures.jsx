import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setFeatures } from '../../../../redux/slices/vehicleRegisterSlice';

import { ThemeProvider } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Button from '../../../elements/Button/Button';

import styles from './SelectFeatures.module.scss';
import themeMaterialUI from '../../../../styles/material/theme';

export default function SelectFeatures({ setStep, next }) {
  const dispatch = useDispatch();
  const [state, setState] = useState({});
  const features = useSelector(
    (state) => state.vehicleRegisterObjects.featuresOptions
  );

  const featuresOptions = {};

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    features.forEach((element) => {
      const { featureId } = element;
      featuresOptions[featureId] = false;
    });
    setState(featuresOptions);
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = () => {
    const selected = [];
    for (const item in state) {
      if (state[item]) selected.push(item);
    }

    dispatch(setFeatures(selected));
    setStep(next);
  };

  return (
    <div>
      <h3>Cuéntanos sobre tu carro</h3>

      {features && (
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
      )}

      <Button onClick={handleSubmit}>Continuar</Button>
    </div>
  );
}
