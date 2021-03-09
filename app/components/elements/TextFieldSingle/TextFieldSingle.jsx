import { useEffect } from 'react';
import { useFormikContext } from 'formik';

import styles from './TextFieldSingle.module.scss';

export default function SingleTextField({ name, placeholder, ...otherProps }) {
  const {
    values,
    errors,
    touched,
    setFieldTouched,
    handleChange,
    setErrors,
  } = useFormikContext();

  return (
    <div className={styles.container}>
      <input
        onBlur={() => setFieldTouched(name)}
        onChange={handleChange}
        value={values[name]}
        name={name}
        placeholder={placeholder}
        {...otherProps}
      />
    </div>
  );
}
