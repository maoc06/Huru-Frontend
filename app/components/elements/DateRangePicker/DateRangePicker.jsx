import { useEffect, useRef, useState } from 'react';
import { addDays } from 'date-fns';
import { DateRange } from 'react-date-range';
import esLocale from 'date-fns/locale/es';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import styles from './DateRangePicker.module.scss';

export default function AppDateRangePicker({
  show,
  setShow,
  onSelectDates,
  onSelectStartHour,
  onSelectEndHour,
  showTimes = true,
  showInline = false,
}) {
  const ref = useRef();
  const [state, setState] = useState([
    {
      startDate: addDays(new Date(), 2),
      endDate: addDays(new Date(), 4),
      key: 'selection',
    },
  ]);

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (!ref.current.contains(e.target)) {
      if (typeof setShow === 'function') setShow(false);
      return;
    }
  };

  const handleDatesChange = (item) => {
    onSelectDates(item);
    setState([item.selection]);
  };

  return (
    <div
      className={`${styles.container} ${show ? styles.show : styles.hide} ${
        showInline && styles.inline
      }`}
      ref={ref}
    >
      <DateRange
        editableDateInputs={true}
        onChange={handleDatesChange}
        moveRangeOnFirstSelection={false}
        minDate={new Date()}
        ranges={state}
        locale={esLocale}
        showMonthAndYearPickers={false}
        showDateDisplay={false}
        rangeColors={['#070d9a']}
        className={styles.date_range_calendar}
      />

      {showTimes && (
        <div className={styles.times}>
          <div>
            <label>Hora inicial</label>
            <input
              type="time"
              step="1800"
              onChange={onSelectStartHour}
              name="startTime"
            />
          </div>
          <div>
            <label>Hora final</label>
            <input
              type="time"
              step="1800"
              onChange={onSelectEndHour}
              name="endTime"
            />
          </div>
        </div>
      )}
    </div>
  );
}
