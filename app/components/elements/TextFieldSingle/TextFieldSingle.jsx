import { useFormikContext } from 'formik';
import styles from './TextFieldSingle.module.scss';

export default function SingleTextField({
  name,
  placeholder,
  currRef = null,
  nextRef = null,
  ...otherProps
}) {
  const { values, setFieldTouched, setFieldValue } = useFormikContext();

  const handleChange = (event) => {
    let value = event.target.value;
    if (value.toString().length > 1) {
      value = value.toString().charAt(value.toString().length - 1);
    }
    setFieldValue(name, value);
    handleFocusNextInput(value.toString().length);
  };

  const handleFocusNextInput = (valueLength) => {
    if (valueLength === 1 && nextRef) {
      nextRef.current.focus();
    }
  };

  return (
    <div className={styles.container}>
      <input
        onBlur={() => setFieldTouched(name)}
        onChange={handleChange}
        value={values[name]}
        name={name}
        placeholder={placeholder}
        ref={currRef}
        {...otherProps}
      />
    </div>
  );
}
