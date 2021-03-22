import { useFormikContext } from 'formik';
import { useEffect } from 'react';

import styles from './TextFieldSingle.module.scss';

export default function SingleTextField({ name, placeholder, ...otherProps }) {
  const { values, errors, setFieldTouched, setFieldValue } = useFormikContext();

  const handleChange = (event) => {
    let value = event.target.value;
    if (value.toString().length > 1) {
      value = value.toString().charAt(value.toString().length - 1);
    }
    setFieldValue(name, value);
  };

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
