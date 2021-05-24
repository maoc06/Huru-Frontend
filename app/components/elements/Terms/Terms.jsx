import { useState } from 'react';
import { useFormikContext } from 'formik';
import { ThemeProvider } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

import themeMaterialUI from '../../../styles/material/theme';
import ErrorMessage from '../../elements/ErrorMessage/ErrorMessage';
import ResponsiveDialog from '../../modules/ResponsiveDialog/ResponsiveDialog';
import { privacy, terms } from '../../../constants/strings/values';

import styles from './Terms.module.scss';

export default function AppTerms({
  name,
  typeTerms = 'user-terms',
  typePolicy = 'user-privacy',
  extraText = '',
}) {
  const [state, setState] = useState(false);
  const [openServiceTerms, setOpenServiceTerms] = useState(false);
  const [openPolicy, setOpenPolicy] = useState(false);

  const { errors, setFieldValue, touched } = useFormikContext();

  const handleChange = () => {
    const newState = !state;
    setState(newState);
    setFieldValue(name, newState);
  };

  return (
    <>
      <ResponsiveDialog
        title={terms.title}
        type={typeTerms}
        onClose={() => setOpenServiceTerms(false)}
        visible={openServiceTerms}
      />

      <ResponsiveDialog
        title={privacy.title}
        type={typePolicy}
        onClose={() => setOpenPolicy(false)}
        visible={openPolicy}
      />

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
            Acepto los
            <span onClick={() => setOpenServiceTerms(true)}>
              {` Términos del servicio `}
            </span>
            y la
            <span onClick={() => setOpenPolicy(true)}>
              {` Política de privacidad `}
            </span>
            de Huru{extraText}.
          </p>
        </ThemeProvider>
      </div>

      <ErrorMessage visible={touched[name]} message={errors[name]} />

      <div className={styles.space}></div>
    </>
  );
}
