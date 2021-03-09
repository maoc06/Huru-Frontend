import { ThemeProvider } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import themeMaterialUI from '../../../styles/material/theme';

export default function RadioButton({ label, value }) {
  return (
    <>
      <ThemeProvider theme={themeMaterialUI}>
        <FormControlLabel
          value={value}
          control={<Radio color="primary" />}
          style={{ textTransform: 'capitalize' }}
          label={label}
        />
      </ThemeProvider>
    </>
  );
}
