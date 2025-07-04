import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, utils } from '@hassanmojab/react-modern-calendar-datepicker';
import customLocale from '../../../constants/others/custom-calendar-values';

import styles from './Calendar.module.scss';

export default function AppCalendar({
  defaultValue = null,
  disabledDays,
  onSelectDay,
  onSelectDisableDay = () => {},
}) {
  return (
    <Calendar
      value={defaultValue}
      calendarClassName={styles.calendar}
      colorPrimary="#070d9a"
      colorPrimaryLight="#3f45e0"
      onChange={onSelectDay}
      onDisabledDayError={onSelectDisableDay}
      disabledDays={disabledDays} // here we pass them
      minimumDate={utils().getToday()}
      locale={customLocale}
    />
  );
}
