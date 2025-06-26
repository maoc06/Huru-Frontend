import { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import { Visibility, VisibilityOff } from '@material-ui/icons';

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
  onChangeAux,
  onChangePriceAux,
  typeChangeAux = 'none',
  type,
  ...otherProps
}) {
  const {
    values,
    errors,
    touched,
    setFieldTouched,
    setFieldValue,
    // handleChange,
    setErrors,
  } = useFormikContext();

  const [visibility, setVisibility] = useState(false);
  const [typePassword, setTypePassword] = useState(type);

  useEffect(() => {
    if (apiError) {
      const errorObj = {};
      if (!errorMsg) errorObj[name] = `El ${name} ya está registrado`;
      else errorObj[name] = errorMsg;

      setErrors(errorObj);
    }
  }, [apiError]);

  const handleChange = (event) => {
    const value = event.target.value;
    setFieldValue(name, value);

    if (typeof onChangeAux === 'function' && typeChangeAux === 'none') {
      onChangeAux(value);
    }

    if (typeChangeAux === 'license') {
      let formattedValue = '';

      if (value.length === 4) {
        formattedValue = value.substring(0, 3) + ' ' + value.substring(3);
      } else {
        formattedValue = value;
      }

      const cursorAt = formattedValue.length - 1;
      if (formattedValue.charAt(cursorAt) === ' ') {
        formattedValue = formattedValue.slice(0, cursorAt);
      }

      setFieldValue(name, String(formattedValue).toUpperCase());
    }
  };

  const handleTypePriceChange = (event) => {
    setFieldValue(name, formatPrice({ price: event.target.value }));

    if (typeof onChangePriceAux === 'function') {
      onChangePriceAux(event.target.value);
    }
  };

  const handleVisibility = () => {
    typePassword === 'password'
      ? setTypePassword('text')
      : setTypePassword('password');

    setVisibility(!visibility);
  };

  const renderVisibility = () => {
    if (!visibility) {
      return (
        <VisibilityOff
          onClick={handleVisibility}
          style={{ color: '#828282' }}
        />
      );
    } else {
      return (
        <Visibility onClick={handleVisibility} style={{ color: '#828282' }} />
      );
    }
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
        } ${withIcon && styles.paddingIcon} ${
          touched[name] && errors[name] && styles.inputError
        }`}
      >
        {withIcon && <div>{iconComponent}</div>}

        <input
          onBlur={() => setFieldTouched(name)}
          onChange={isTypePrice ? handleTypePriceChange : handleChange}
          value={values[name]}
          name={name}
          type={type === 'password' ? typePassword : type}
          className={`${styles.input} ${upperCase && styles.upperCase} `}
          placeholder={placeholder}
          disabled={readOnly}
          {...otherProps}
        />

        {type === 'password' && (
          <div className={styles.visibility}>{renderVisibility()}</div>
        )}
      </div>

      <ErrorMessage
        visible={touched[name] && errors[name]}
        message={errors[name]}
      />
    </div>
  );
}
