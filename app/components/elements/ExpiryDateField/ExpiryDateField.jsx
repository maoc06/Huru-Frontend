import { useFormikContext } from 'formik';

import { formatExpiryDate } from '../../../utils/formatDates';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import styles from './ExpiryDateField.module.scss';

export default function ExpityDateField({
  name,
  placeholder,
  label,
  errorMsg,
  ...otherProps
}) {
  const {
    values,
    errors,
    touched,
    setFieldTouched,
    setFieldValue,
  } = useFormikContext();

  const handleChange = (event) => {
    let formattedValue = formatExpiryDate(event.target.value);

    setFieldValue(name, formattedValue);
  };

  const handleSlashEdit = (event) => {
    if (event.keyCode === 8) {
      const cursorAt = values[name].length - 1;
      if (values[name].charAt(cursorAt) === '/') {
        const formattedValue = values[name].slice(0, -1);
        setFieldValue(name, formattedValue);
      }
    }
  };

  return (
    <div className={`${styles.container}`}>
      <label>{label}</label>

      <div className={`${styles.textfield}`}>
        <input
          onBlur={() => setFieldTouched(name)}
          onChange={handleChange}
          onKeyDown={handleSlashEdit}
          value={values[name]}
          name={name}
          className={`${styles.input} ${
            touched[name] && errors[name] && styles.inputError
          }`}
          placeholder={placeholder}
          {...otherProps}
        />
      </div>

      <ErrorMessage
        visible={touched[name] && errors[name]}
        message={errors[name]}
      />
    </div>
  );
}
