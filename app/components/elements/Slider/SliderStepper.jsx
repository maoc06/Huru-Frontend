import { ThemeProvider } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

import themeMaterialUI from '../../../styles/material/theme';
import { useState, useRef, useEffect } from 'react';

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
  const [sliderValue, setSliderValue] = useState(defaultStep);
  const sliderRef = useRef(null);

  // Update value when defaultStep changes
  useEffect(() => {
    setValue(valuetext(defaultStep));
    setSliderValue(defaultStep);
  }, [defaultStep, message]);

  const handleChange = (_, number) => {
    if (!sliderRef.current) return; // Prevent error if slider is unmounted
    setValue(valuetext(number));
    setSliderValue(number);
    if (onChange) {
      onChange(number);
    }
  };

  return (
    <>
      {withLabel && <label>{label}</label>}

      <p>{value}</p>

      <ThemeProvider theme={themeMaterialUI}>
        <Slider
          ref={sliderRef}
          value={sliderValue}
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
