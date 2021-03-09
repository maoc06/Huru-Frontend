import { useEffect } from 'react';
import { useFormikContext } from 'formik';

import styles from './Textfield.module.scss';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function Textfield({
  name,
  placeholder,
  label,
  upperCase = false,
  apiError,
  errorMsg,
  withSmallBottomMargin,
  ...otherProps
}) {
  const {
    values,
    errors,
    touched,
    setFieldTouched,
    handleChange,
    setErrors,
  } = useFormikContext();

  useEffect(() => {
    if (apiError) {
      const errorObj = {};
      if (!errorMsg) errorObj[name] = `El ${name} ya está registrado`;
      else errorObj[name] = errorMsg;

      setErrors(errorObj);
    }
  }, [apiError]);

  return (
    <div
      className={`${styles.container} ${
        withSmallBottomMargin && styles.with_small_bottom_margin
      }`}
    >
      <label>{label}</label>

      <input
        onBlur={() => setFieldTouched(name)}
        onChange={handleChange}
        value={values[name]}
        name={name}
        className={`${styles.input} ${
          touched[name] && errors[name] && styles.inputError
        } ${upperCase && styles.upperCase}`}
        placeholder={placeholder}
        {...otherProps}
      />

      {/* {touched[name] && errors[name] && (
        <p className={styles.statusMsg}>{errors[name]}</p>
      )} */}

      <ErrorMessage
        visible={touched[name] && errors[name]}
        message={errors[name]}
      />
    </div>
  );
}
