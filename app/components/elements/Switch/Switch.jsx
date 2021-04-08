import { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

import themeMaterialUI from '../../../styles/material/theme';

export default function AppSwitch({ name, checked = false }) {
  const [state, setState] = useState(checked);

  const handleChange = (event) => {
    setState(event.target.checked);
  };

  return (
    <>
      <ThemeProvider theme={themeMaterialUI}>
        <Switch
          checked={state}
          onChange={handleChange}
          color="primary"
          name={name}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </ThemeProvider>
    </>
  );
}
