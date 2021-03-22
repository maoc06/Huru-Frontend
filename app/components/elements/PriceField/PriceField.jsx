import { useFormikContext } from 'formik';

import styles from './PriceField.module.scss';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function PriceField({
  name,
  placeholder,
  withLabel = true,
  label,
  errorMsg,
  withContainerMargings = true,
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
        {withIcon && iconComponent}

        <input
          onBlur={() => setFieldTouched(name)}
          onChange={handleChange}
          value={values[name]}
          name={name}
          className={`${styles.input} ${
            touched[name] && errors[name] && styles.inputError
          } ${upperCase && styles.upperCase} `}
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
