import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker';

import styles from './Calendar.module.scss';

export default function AppCalendar({
  defaultValue = null,
  disabledDays,
  onSelectDay,
}) {
  return (
    <Calendar
      value={defaultValue}
      calendarClassName={styles.calendar}
      colorPrimary="#070d9a"
      colorPrimaryLight="#3f45e0"
      onChange={onSelectDay}
      disabledDays={disabledDays} // here we pass them
    />
  );
}
