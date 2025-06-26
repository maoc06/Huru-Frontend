import { useSelector } from 'react-redux';

import { defaultDates, parsingDate } from '../utils/formatDates';

const useTravelDates = () => {
  const searchParams = useSelector((state) => state.searchParams);

  const isISO = ({ date }) => {
    if (date && date.includes('T')) return true;
    return false;
  };

  const getDates = () => {
    if (!localStorageDatesEmpty()) {
      return JSON.parse(localStorage.getItem('dates'));
    } else if (searchParamsEmpty()) {
      return defaultDates();
    } else {
      let dates = searchParams.dates;

      let {
        raw: { start, end },
      } = dates;

      if (isISO({ date: start })) {
        dates = {
          ...dates,
          raw: { ...dates.raw, start: parsingDate({ date: start }) },
        };
      }

      if (isISO({ date: end })) {
        dates = {
          ...dates,
          raw: { ...dates.raw, end: parsingDate({ date: end }) },
        };
      }

      return dates;
    }
  };

  const searchParamsEmpty = () => {
    if (
      Object.keys(searchParams.dates).length === 0 &&
      searchParams.dates.constructor === Object
    ) {
      return true;
    }
    return false;
  };

  const localStorageDatesEmpty = () => {
    const isClient = typeof window !== 'undefined';
    if (isClient) {
      if (window.localStorage.getItem('dates') !== null) return false;
    }
    return true;
  };

  return { getDates };
};

export default useTravelDates;
