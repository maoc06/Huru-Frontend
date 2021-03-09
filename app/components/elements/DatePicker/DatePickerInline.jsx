import 'date-fns';
import { useFormikContext } from 'formik';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import esLocale from 'date-fns/locale/es';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import styles from './DatePickerInline.module.scss';
import themeMaterialUI from '../../../styles/material/theme';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const useStyles = makeStyles({
  field: {
    height: 55,
    padding: '16px 24px',
    border: '1px solid #828282',
    borderRadius: '4px',
    marginTop: '8px',
    marginBottom: 0,
  },
  input: {
    padding: 0,
  },
  fieldError: {
    border: '1px solid #df0611',
  },
});

export default function DatePickerInline({
  name,
  label,
  dateError,
  setDateError,
}) {
  const classes = useStyles();

  const { errors, setFieldValue, setErrors } = useFormikContext();

  const [selectedDate, setSelectedDate] = useState(null);
  const [color, setColor] = useState('default');

  useEffect(() => {
    if (dateError) {
      const errorObj = {};
      errorObj[name] = `Debes tener más de 19 años para registrate`;
      setErrors(errorObj);

      setColor('error');
    }
  }, [dateError]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFieldValue(
      name,
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    );
    setDateError(false);
    setColor('default');
  };

  return (
    <div className={styles.contaniner}>
      <label>{label}</label>

      <ThemeProvider theme={themeMaterialUI}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
          <KeyboardDatePicker
            name={name}
            variant="inline"
            format="yyyy-MM-dd"
            placeholder="yyyy-mm-dd"
            margin="normal"
            id="date-picker-inline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            InputProps={{
              disableUnderline: true,
              classes: { input: classes.input },
            }}
            hiddenLabel={true}
            disableFuture={true}
            className={clsx(classes.field, {
              [classes.fieldError]: color === 'error',
            })}
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>

      {/* {dateError && <p className={styles.statusMsg}>{errors[name]}</p>} */}
      <ErrorMessage visible={dateError} message={errors[name]} />
    </div>
  );
}
