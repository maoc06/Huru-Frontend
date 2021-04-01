import { useState } from 'react';
import { useFormikContext } from 'formik';

import { paymentMethodsIcons } from '../../../utils/enums';
import formatCreditCardNumber from '../../../utils/formatCreditCardNumber';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import styles from './CardNumberField.module.scss';

export default function CardNumberField({
  name,
  placeholder,
  label,
  errorMsg,
  ...otherProps
}) {
  const [brand, setBrand] = useState();
  const [maxLength, setMaxLength] = useState(13);

  const {
    values,
    errors,
    touched,
    setFieldTouched,
    setFieldValue,
  } = useFormikContext();

  const handleChange = (event) => {
    let { formattedValue, brand, maxLength } = formatCreditCardNumber(
      event.target.value
    );

    const cursorAt = formattedValue.length - 1;
    if (formattedValue.charAt(cursorAt) === ' ') {
      formattedValue = formattedValue.slice(0, cursorAt);
    }

    setFieldValue(name, formattedValue);
    setBrand(brand);
    setMaxLength(maxLength);
  };

  return (
    <div className={`${styles.container}`}>
      <label>{label}</label>

      <div className={`${styles.textfield}`}>
        <input
          onBlur={() => setFieldTouched(name)}
          onChange={handleChange}
          value={values[name]}
          name={name}
          className={`${styles.input} ${
            touched[name] && errors[name] && styles.inputError
          }`}
          placeholder={placeholder}
          maxLength={maxLength}
          {...otherProps}
        />

        {values[name].toString().length > 0 && (
          <div className={styles.iconPayment}>{paymentMethodsIcons[brand]}</div>
        )}
      </div>

      <ErrorMessage
        visible={touched[name] && errors[name]}
        message={errors[name]}
      />
    </div>
  );
}
