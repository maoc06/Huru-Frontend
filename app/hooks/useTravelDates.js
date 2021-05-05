import { useSelector } from 'react-redux';

import { defaultDates } from '../utils/formatDates';

const useTravelDates = () => {
  const searchParams = useSelector((state) => state.searchParams);

  const getDates = () => {
    if (searchParamsEmpty()) {
      return defaultDates();
    } else {
      return searchParams.dates;
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

  return { getDates };
};

export default useTravelDates;
