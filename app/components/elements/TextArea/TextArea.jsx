import { useState } from 'react';
import { useFormikContext } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import styles from './TextArea.module.scss';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const useStyles = makeStyles({
  formControl: {
    padding: '16px 24px',
    fontSize: '16px',
    border: '1px solid #828282',
    borderRadius: '4px',
    marginTop: '8px',
    marginBottom: 0,
    minWidth: '100%',
    maxWidth: '100%',
  },
});

export default function TextArea({
  name,
  placeholder,
  rowsMin,
  rowsMax,
  maxLength,
  marginTop,
  marginToButton,
}) {
  const classes = useStyles();
  const [count, setCount] = useState(0);

  const {
    values,
    errors,
    touched,
    setFieldTouched,
    handleChange,
  } = useFormikContext();

  const handleCount = (event) => {
    setCount(event.target.value.length);
  };

  return (
    <div
      className={`${marginTop && styles.margin_top} ${
        marginToButton && styles.margin_to_button
      }`}
    >
      <TextareaAutosize
        name={name}
        onBlur={() => setFieldTouched(name)}
        onChange={handleChange}
        value={values[name]}
        aria-label="minimum height"
        rowsMin={rowsMin}
        rowsMax={rowsMax}
        placeholder={placeholder}
        className={classes.formControl}
        maxLength={maxLength}
        onKeyUp={handleCount}
      />

      <div className={styles.count}>
        <span>{count}</span>
        <span>/{maxLength}</span>
      </div>

      {/* {touched[name] && <p className={styles.statusMsg}>{errors[name]}</p>} */}
      <ErrorMessage visible={touched[name]} message={errors[name]} />
    </div>
  );
}
