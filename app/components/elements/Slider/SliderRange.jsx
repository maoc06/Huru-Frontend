import { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

import localeStringPrice from '../../../utils/localeStringPrice';

import themeMaterialUI from '../../../styles/material/theme';

export default function AppSliderRange({
  label,
  withLabel = false,
  numStep,
  min,
  max,
  onChange,
  formatToPrice = false,
}) {
  const [value, setValue] = useState([min, max]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange({ min: newValue[0], max: newValue[1] });
  };

  return (
    <>
      {withLabel && <label>{label}</label>}

      {formatToPrice && (
        <p>{`$${localeStringPrice(value[0])} - $${localeStringPrice(
          value[1]
        )}`}</p>
      )}

      {!formatToPrice && <p>{`${value[0]} - ${value[1]}`}</p>}

      <ThemeProvider theme={themeMaterialUI}>
        <Slider
          value={value}
          onChange={handleChange}
          aria-labelledby="range-slider"
          step={numStep}
          min={min}
          max={max}
        />
      </ThemeProvider>
    </>
  );
}
