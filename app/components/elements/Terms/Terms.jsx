import { useState } from 'react';
import { useFormikContext } from 'formik';
import { ThemeProvider } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

import themeMaterialUI from '../../../styles/material/theme';
import ErrorMessage from '../../elements/ErrorMessage/ErrorMessage';

import styles from './Terms.module.scss';

export default function AppTerms({ name }) {
  const [state, setState] = useState(false);
  const { errors, setFieldValue, touched } = useFormikContext();

  const handleChange = () => {
    const newState = !state;
    setState(newState);
    setFieldValue(name, newState);
  };

  return (
    <>
      <div className={styles.container}>
        <ThemeProvider theme={themeMaterialUI}>
          <Checkbox
            checked={state}
            onChange={handleChange}
            name={name}
            color="primary"
            className={styles.checkbox}
          />
          <p>
            Acepto los <span>Términos del servicio</span> y la
            <span> Política de privacidad</span> de Huru.
          </p>
        </ThemeProvider>
      </div>

      <ErrorMessage visible={touched[name]} message={errors[name]} />
    </>
  );
}
