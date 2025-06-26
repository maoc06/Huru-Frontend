import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import useParams from '../../../hooks/useParams';
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

// Arrow Right Icon Component
const ArrowRightIcon = ({ width = 16, height = 16, color = '#ffffff' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      fill={color}
      d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
    />
  </svg>
);

export default function DatesPanel({
  compact = false,
  clickleable = true,
  showTopLabels = true,
  startDateBorder = false,
  paramDates,
  title,
  detectChanges = false,
  onDetectChanges = () => {},
  disabledDates = [],
}) {
  const dispatch = useDispatch();
  const searchParams = useParams();

  const [selectionDates, setSelectionDates] = useState(defaultDates());
  const [showDates, setShowDates] = useState(false);
  const prevShowDatesRef = useRef();

  const handleShowDates = () => {
    setShowDates(!showDates);
  };

  const setGlobaltDates = (dates) => {
    setSelectionDates(dates);
    dispatch(setDates(JSON.stringify(dates)));
  };

  const setChanges = (dates) => {
    setGlobaltDates(dates);
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

    setChanges(selectedDates);
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

    setChanges(selectedDates);
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

    setChanges(selectedDates);
  };

  useEffect(() => {
    const localDates = searchParams.getDates();
    if (localDates !== null) {
      localDates.constructor === Object && Object.keys(localDates).length > 0
        ? setGlobaltDates(paramDates ? paramDates : searchParams.getDates())
        : setGlobaltDates(paramDates ? paramDates : defaultDates());
    } else {
      setGlobaltDates(paramDates ? paramDates : defaultDates());
    }
  }, []);

  useEffect(() => {
    const prevStateShowDates = prevShowDatesRef.current;
    if (!showDates && prevStateShowDates && detectChanges) onDetectChanges();
  }, [showDates]);

  useEffect(() => {
    prevShowDatesRef.current = showDates;
  });

  const renderSection = ({ title, date, hour, isEnd = false }) => {
    return (
      <div
        className={`${clickleable && styles.showCursor} ${
          isEnd && styles.end_date
        } ${startDateBorder && styles.start_date}`}
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

        {/* Circular Arrow Button */}
        <div className={styles.arrowButton}>
          <ArrowRightIcon width={18} height={18} />
        </div>

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
          disabledDates={disabledDates}
        />
      </section>
    </>
  );
}
