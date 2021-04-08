import { useEffect } from 'react';
import { useFormikContext } from 'formik';

import formatPrice from '../../../utils/formatPrice';

import styles from './Textfield.module.scss';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function Textfield({
  name,
  placeholder,
  withLabel = true,
  label,
  upperCase = false,
  apiError,
  errorMsg,
  isTypePrice = false,
  withIcon = false,
  iconComponent,
  withContainerMargings = true,
  withSmallBottomMargin,
  readOnly = false,
  ...otherProps
}) {
  const {
    values,
    errors,
    touched,
    setFieldTouched,
    setFieldValue,
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

  const handleTypePriceChange = (event) => {
    setFieldValue(name, formatPrice({ price: event.target.value }));
  };

  return (
    <div
      className={`${styles.container} ${
        withSmallBottomMargin && styles.with_small_bottom_margin
      } ${withContainerMargings && styles.container_margins}`}
    >
      {withLabel && <label>{label}</label>}

      <div
        className={`${styles.textfield} ${
          withLabel && styles.with_margin_to_label
        } ${withIcon && styles.paddingIcon}`}
      >
        {withIcon && <div>{iconComponent}</div>}

        <input
          onBlur={() => setFieldTouched(name)}
          onChange={isTypePrice ? handleTypePriceChange : handleChange}
          value={values[name]}
          name={name}
          className={`${styles.input} ${
            touched[name] && errors[name] && styles.inputError
          } ${upperCase && styles.upperCase} `}
          placeholder={placeholder}
          disabled={readOnly}
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
