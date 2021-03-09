import { useState } from 'react';
import { useFormikContext } from 'formik';
import { ThemeProvider } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import themeMaterialUI from '../../../styles/material/theme';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import styles from './Checkbox.module.scss';

export default function AppCheckbox({ name, label }) {
  const [state, setState] = useState(false);
  const { errors, setFieldValue, touched } = useFormikContext();

  const handleChange = () => {
    const newState = !state;
    setState(newState);
    setFieldValue(name, newState);
  };

  return (
    <>
      <ThemeProvider theme={themeMaterialUI}>
        <FormControlLabel
          control={
            <Checkbox
              checked={state}
              onChange={handleChange}
              name={name}
              color="primary"
            />
          }
          label={label}
        />

        <ErrorMessage visible={touched[name]} message={errors[name]} />
      </ThemeProvider>
    </>
  );
}
