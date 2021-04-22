import { useState } from 'react';
import { useFormikContext } from 'formik';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import ErrorMessage from '../ErrorMessage/ErrorMessage';

import styles from './TextArea.module.scss';
import { materialTextAreaStyles } from '../../../styles/material/textarea';

export default function TextArea({
  name,
  placeholder,
  rowsMin,
  rowsMax,
  disabled = false,
  maxLength,
  marginTop,
  marginToButton,
  onChangeAux,
}) {
  const classes = materialTextAreaStyles();
  const [count, setCount] = useState(0);

  const {
    values,
    errors,
    touched,
    setFieldTouched,
    setFieldValue,
  } = useFormikContext();

  const handleChange = (event) => {
    const value = event.target.value;
    setFieldValue(name, value);

    if (typeof onChangeAux === 'function') {
      onChangeAux(value);
    }
  };

  const handleCount = (event) => {
    setCount(event.target.value.length);
  };

  return (
    <div
      className={`${marginTop && styles.margin_top} ${
        marginToButton && styles.margin_to_button
      }`}
    >
      <TextareaAutosize
        name={name}
        onBlur={() => setFieldTouched(name)}
        onChange={handleChange}
        value={values[name]}
        aria-label="minimum height"
        rowsMin={rowsMin}
        rowsMax={rowsMax}
        placeholder={placeholder}
        className={classes.formControl}
        maxLength={maxLength}
        onKeyUp={handleCount}
        disabled={disabled}
      />

      {!disabled && (
        <div className={styles.count}>
          <span>{count}</span>
          <span>/{maxLength}</span>
        </div>
      )}

      <ErrorMessage visible={touched[name]} message={errors[name]} />
    </div>
  );
}
