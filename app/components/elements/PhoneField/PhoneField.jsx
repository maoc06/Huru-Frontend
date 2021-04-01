import { useFormikContext } from 'formik';
import { useEffect } from 'react';

import CountryPicker from '../CountryPicker/CountryPicker';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import styles from './PhoneField.module.scss';

export default function PhoneField({
  apiError,
  name,
  placeholder,
  label,
  withCountryCode = true,
  countryCode,
  setCountryCode,
  withMarginBottom = true,
}) {
  const {
    values,
    errors,
    touched,
    setFieldTouched,
    setFieldValue,
    setErrors,
  } = useFormikContext();

  useEffect(() => {
    if (apiError) {
      const errorObj = {};
      if (!errorMsg) errorObj[name] = `El teléfono ya está registrado`;
      else errorObj[name] = errorMsg;

      setErrors(errorObj);
    }
  }, [apiError]);

  const handleChange = (event) => {
    let value = event.target.value;
    if (value.length > 3 && !value.toString().includes('-')) {
      const operator = value.toString().substr(0, 3);
      const phone = value.toString().substr(3, value.toString().length - 1);
      setFieldValue(name, `${operator}-${phone}`);
    } else {
      setFieldValue(name, value);
    }
  };

  return (
    <section
      className={`${styles.wrapper} ${withMarginBottom && styles.marginBottom}`}
    >
      <label>{label}</label>

      <div className={styles.container}>
        {withCountryCode && <CountryPicker setCountryCode={setCountryCode} />}

        <div
          className={`${styles.wrap_phone_field} ${
            withCountryCode && style.wrap_margin
          }`}
        >
          {withCountryCode && <span>{`+${countryCode}`}</span>}

          <input
            onBlur={() => setFieldTouched(name)}
            onChange={handleChange}
            value={values[name]}
            name={name}
            className={`${styles.input} ${withCountryCode && style.input_bold}`}
            placeholder={placeholder}
            type="tel"
            pattern="[0-9]{3}-[0-9]{7}"
          />
        </div>
      </div>

      <ErrorMessage
        visible={touched[name] && errors[name]}
        message={errors[name]}
      />
    </section>
  );
}
