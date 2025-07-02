import { useState, useRef, useEffect } from 'react';
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
  defaultMin,
  defaultMax,
  onChange,
  formatToPrice = false,
}) {
  const [value, setValue] = useState([defaultMin || min, defaultMax || max]);
  const sliderRef = useRef(null);

  // Update value when defaultMin/defaultMax change
  useEffect(() => {
    setValue([defaultMin || min, defaultMax || max]);
  }, [defaultMin, defaultMax, min, max]);

  const handleChange = (event, newValue) => {
    if (!sliderRef.current) return; // Prevent error if slider is unmounted
    setValue(newValue);
    if (onChange) {
      onChange({ min: newValue[0], max: newValue[1] });
    }
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
          ref={sliderRef}
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
