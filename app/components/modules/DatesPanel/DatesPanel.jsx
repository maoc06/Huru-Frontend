import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setDates } from '../../../redux/slices/searchParamsSlice';

import AppDateRangePicker from '../../elements/DateRangePicker/DateRangePicker';

import getDefaultDates from '../../../utils/getDefaultDates';
import formatShortDate from '../../../utils/formatShortDate';
import formatAMPM from '../../../utils/formatAMPM';
import { changeSelectedRawHour } from '../../../utils/formatFullDate';

import styles from './DatesPanel.module.scss';
import useTravelDates from '../../../hooks/useTravelDates';

// Diferencial del dia de la fecha
const DELTA_DATE = 1;

export default function DatesPanel({
  compact = false,
  showTopLabels = true,
  clickleable = true,
}) {
  const dispatch = useDispatch();
  const travel = useTravelDates();

  const [selectionDates, setSelectionDates] = useState(getDefaultDates());
  const [showDates, setShowDates] = useState(false);

  useEffect(() => {
    setGlobaltDates(travel.getDates());
  }, []);

  const handleShowDates = () => {
    setShowDates(!showDates);
  };

  const setGlobaltDates = (dates) => {
    setSelectionDates(dates);
    dispatch(setDates(JSON.stringify(dates)));
  };

  const handleChangeDates = ({ selection: { startDate, endDate } }) => {
    const selectedDates = {
      ...selectionDates,
      raw: { start: startDate, end: endDate },
      format: {
        ...selectionDates.format,
        startDate: formatShortDate(startDate, DELTA_DATE),
        endDate: formatShortDate(endDate, DELTA_DATE),
      },
    };

    setGlobaltDates(selectedDates);
  };

  const handleChangeStartHour = (event) => {
    const value = event.target.value;
    let rawStartDate = selectionDates.raw.start;

    rawStartDate = changeSelectedRawHour(JSON.stringify(rawStartDate), value);
    const startHour = formatAMPM(value).format;

    const selectedDates = {
      raw: { ...selectionDates.raw, start: rawStartDate },
      format: {
        ...selectionDates.format,
        startHour,
      },
    };

    setGlobaltDates(selectedDates);
  };

  const handleChangeEndHour = (event) => {
    const value = event.target.value;
    let rawEndDate = selectionDates.raw.end;

    rawEndDate = changeSelectedRawHour(JSON.stringify(rawEndDate), value);
    const endHour = formatAMPM(value).format;

    const selectedDates = {
      raw: { ...selectionDates.raw, end: rawEndDate },
      format: {
        ...selectionDates.format,
        endHour,
      },
    };

    setGlobaltDates(selectedDates);
  };

  const renderSection = ({ title, date, hour, isEnd = false }) => {
    return (
      <div
        className={`${isEnd && styles.end_date}`}
        onClick={clickleable ? handleShowDates : () => {}}
      >
        {showTopLabels && <p className={styles.top_label}>{title}</p>}

        <p>{`${date} - ${hour}`}</p>
      </div>
    );
  };

  return (
    <section
      className={`${styles.container} ${
        compact ? styles.compact : styles.not_compact
      }`}
    >
      {renderSection({
        title: 'Fecha y hora de inicio',
        date: selectionDates.format.startDate,
        hour: selectionDates.format.startHour,
      })}

      {renderSection({
        title: 'Fecha y hora de fin',
        date: selectionDates.format.endDate,
        hour: selectionDates.format.endHour,
        isEnd: true,
      })}

      <AppDateRangePicker
        name={'dateRange'}
        onSelectDates={handleChangeDates}
        onSelectStartHour={handleChangeStartHour}
        onSelectEndHour={handleChangeEndHour}
        setShow={setShowDates}
        show={showDates}
      />
    </section>
  );
}
