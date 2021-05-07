import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useTravelDates from '../../../hooks/useTravelDates';
import { setDates } from '../../../redux/slices/searchParamsSlice';

import AppDateRangePicker from '../../elements/DateRangePicker/DateRangePicker';
import SectionTitle from '../../elements/SectionTitle/SectionTitle';

import {
  changeSelectedRawHour,
  defaultDates,
  formatDate,
  formatTime,
} from '../../../utils/formatDates';

import styles from './DatesPanel.module.scss';

export default function DatesPanel({
  compact = false,
  clickleable = true,
  showTopLabels = true,
  paramDates,
  title,
}) {
  const dispatch = useDispatch();
  const travel = useTravelDates();

  const [selectionDates, setSelectionDates] = useState(defaultDates());
  const [showDates, setShowDates] = useState(false);

  useEffect(() => {
    setGlobaltDates(paramDates ? paramDates : travel.getDates());
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
        startDate: formatDate({ date: startDate, type: 'JS' }),
        endDate: formatDate({ date: endDate, type: 'JS' }),
      },
    };

    setGlobaltDates(selectedDates);
  };

  const handleChangeStartHour = (event) => {
    const value = event.target.value;
    let rawStartDate = selectionDates.raw.start;

    rawStartDate = changeSelectedRawHour(rawStartDate, value);
    const startHour = formatTime({ date: rawStartDate, type: 'JS' });

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

    rawEndDate = changeSelectedRawHour(rawEndDate, value);
    const endHour = formatTime({ date: rawEndDate, type: 'JS' });

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
    <>
      {title && <SectionTitle title={title} />}

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
    </>
  );
}
