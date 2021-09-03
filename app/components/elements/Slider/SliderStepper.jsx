import { ThemeProvider } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

import themeMaterialUI from '../../../styles/material/theme';
import { useState } from 'react';

export default function AppSlider({
  label,
  withLabel = false,
  numSteps,
  defaultStep,
  min,
  max,
  message,
  onChange,
}) {
  const valuetext = (value) => `${value} ${message}`;

  const [value, setValue] = useState(valuetext(defaultStep));

  const handleChange = (_, number) => {
    setValue(valuetext(number));
    onChange(number);
  };

  return (
    <>
      {withLabel && <label>{label}</label>}

      <p>{value}</p>

      <ThemeProvider theme={themeMaterialUI}>
        <Slider
          defaultValue={defaultStep}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          step={numSteps}
          marks
          min={min}
          max={max}
          onChange={handleChange}
        />
      </ThemeProvider>
    </>
  );
}
