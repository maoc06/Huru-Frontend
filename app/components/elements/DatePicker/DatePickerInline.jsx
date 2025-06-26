import 'date-fns';
import { useFormikContext } from 'formik';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import clsx from 'clsx';
import esLocale from 'date-fns/locale/es';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import styles from './DatePickerInline.module.scss';
import themeMaterialUI from '../../../styles/material/theme';
import { materialStyles } from '../../../styles/material/materialBase';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function DatePickerInline({
  name,
  label,
  dateError,
  setDateError,
}) {
  const classes = materialStyles();

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
              classes: { input: classes.root },
            }}
            hiddenLabel={true}
            disableFuture={true}
            className={clsx(classes.field, {
              [classes.fieldError]: color === 'error',
              'error': color === 'error'
            })}
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>

      <ErrorMessage visible={dateError} message={errors[name]} />
    </div>
  );
}
