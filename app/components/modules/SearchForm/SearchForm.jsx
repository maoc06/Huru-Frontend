import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import {
  setCityLabel,
  setDates,
  setStartHour,
  setEndHour,
} from '../../../redux/slices/searchParamsSlice';

import Form from '../../modules/Forms/Form';
import AutoCompletePlaces from '../../elements/AutoCompletePlaces/AutoCompletePlaces';
import DateRangePicker from '../../elements/DateRangePicker/DateRangePicker';
import SubmitButton from '../../elements/Button/SubmitButton';
import SearchIcon from '../../elements/Icons/SearchIcon';

import formatShortDate from '../../../utils/formatShortDate';
import addDays from '../../../utils/addDays';
import formatAMPM from '../../../utils/formatAMPM';

import searchSchema from '../../../constants/validationSchema/search';

import styles from './SearchForm.module.scss';

export default function SearchForm({ isCompact = false }) {
  const dispatch = useDispatch();
  const searchParamsStored = useSelector((state) => state.searchParams);
  const router = useRouter();

  const today = new Date();
  const upcoming = addDays(today, 2);
  const time = `${today.getHours() + 1}:${today.getMinutes()}`;
  const initialValues = { location: '' };

  const [selectedDates, setSelectedDates] = useState({
    raw: { start: today, end: upcoming },
    formatLocale: {
      start: formatShortDate(today),
      end: formatShortDate(upcoming),
    },
  });
  const [hourStart, setHourStart] = useState(formatAMPM(time));
  const [hourEnd, setHourEnd] = useState(formatAMPM(time));
  const [showDates, setShowDates] = useState(false);

  useEffect(() => {
    const { startHour, endHour } = searchParamsStored;
    if (!startHour) {
      console.log('startHour', startHour);
    }
    if (!endHour) {
      console.log('endHour', endHour);
    }
  }, []);

  const handleDates = () => {
    setShowDates(!showDates);
  };

  const handleChangeDates = (item) => {
    const startFormat = formatShortDate(item.selection.startDate);
    const endFormat = formatShortDate(item.selection.endDate);

    setSelectedDates({
      raw: { start: item.selection.startDate, end: item.selection.endDate },
      formatLocale: { start: startFormat, end: endFormat },
    });
  };

  const handleChangeStartHour = (event) => {
    setHourStart(formatAMPM(event.target.value));
  };

  const handleChangeEndHour = (event) => {
    setHourEnd(formatAMPM(event.target.value));
  };

  const handleSubmit = ({ location }) => {
    const cityName = location.value.structured_formatting.main_text;

    dispatch(setCityLabel(location));
    dispatch(setStartHour(JSON.stringify(hourStart)));
    dispatch(setEndHour(JSON.stringify(hourEnd)));
    dispatch(setDates(JSON.stringify(selectedDates)));

    router.push(`/search/${cityName}`);
  };

  return (
    <div
      className={`${styles.container} ${
        isCompact ? styles.container_compact : styles.container_full
      }`}
    >
      <Form
        initialValues={initialValues}
        validationSchema={searchSchema}
        onSubmit={handleSubmit}
      >
        <AutoCompletePlaces
          name="location"
          placeholder={'Ciudad o punto de referencia'}
          isCompact={isCompact}
        />

        <section>
          <div onClick={handleDates}>
            {!isCompact && <p>Fecha y hora de inicio</p>}
            <p>
              <span>{selectedDates.formatLocale.start}</span> -
              {` ${hourStart.format.hours}`}:{`${hourStart.format.minutes} `}
              <span>{hourStart.format.range}</span>
            </p>
          </div>
          <div className={styles.end_date} onClick={handleDates}>
            {!isCompact && <p>Fecha y hora de fin</p>}
            <p>
              <span>{selectedDates.formatLocale.end}</span> -
              {` ${hourEnd.format.hours}`}:{`${hourEnd.format.minutes} `}
              <span>{hourEnd.format.range}</span>
            </p>
          </div>

          <DateRangePicker
            name={'dateRange'}
            onSelectDates={handleChangeDates}
            onSelectStartHour={handleChangeStartHour}
            onSelectEndHour={handleChangeEndHour}
            setShow={setShowDates}
            show={showDates}
          />
        </section>

        {!isCompact && <SubmitButton>Buscar</SubmitButton>}
      </Form>
    </div>
  );
}
