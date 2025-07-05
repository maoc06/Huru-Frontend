import { DateTime } from 'luxon';
import {
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
} from 'date-fns';
import { advanceNotice, maxTripDuration, minTripDuration } from './enums';

const applyAdvanceNotice = ({ data, checkIn }) => {
  const arrData = [...data];

  return arrData.filter((car) => {
    const propValue = car.advance_notice_id;
    const paramDate = advanceNotice()[propValue];
    return checkIn > paramDate;
  });
};

const applyMaxDuration = ({ data, differences = {} }) => {
  const arrData = [...data];

  return arrData.filter((car) => {
    const propValueMax = car.max_trip_duration_id;
    const propValueMin = car.min_trip_duration_id;

    const paramDateMax = maxTripDuration()[propValueMax];
    const paramDateMin = minTripDuration()[propValueMin];

    let diffSetting = { max: 0, min: 0 };
    let diffSearch = { max: 0, min: 0 };

    let checkMaxTrip = true;
    let checkMinTrip = true;

    const diffMax = getDiffMax({
      diffSearch,
      diffSetting,
      differences,
      paramDate: paramDateMax,
      prop: 'max',
      propValue: propValueMax,
    });

    diffSetting = diffMax.diffSetting;
    diffSearch = diffMax.diffSearch;

    const diffMin = getDiffMin({
      diffSearch,
      diffSetting,
      differences,
      paramDate: paramDateMin,
      prop: 'min',
    });

    diffSetting = diffMin.diffSetting;
    diffSearch = diffMin.diffSearch;

    checkMaxTrip = diffSetting.max >= diffSearch.max;
    checkMinTrip = diffSearch.min >= diffSetting.min;

    return checkMaxTrip && checkMinTrip;
  });
};

const applyAllSettings = ({ data, checkIn, checkOut }) => {
  let arr = [...data];

  const checkinDate = DateTime.fromISO(checkIn).toJSDate();
  const checkoutDate = DateTime.fromISO(checkOut).toJSDate();

  const differences = {
    days: differenceInDays(checkoutDate, checkinDate),
    weeks: differenceInWeeks(checkoutDate, checkinDate),
    months: differenceInMonths(checkoutDate, checkinDate),
  };

  arr = applyAdvanceNotice({
    data: arr,
    checkIn: checkinDate,
  });

  arr = applyMaxDuration({
    data: arr,
    differences,
  });

  return arr;
};

const getDiffMax = ({
  diffSetting,
  diffSearch,
  differences,
  paramDate,
  prop,
  propValue,
}) => {
  switch (propValue) {
    case 1:
      diffSetting[prop] = differenceInDays(paramDate, new Date()) + 1;
      diffSearch[prop] = differences.days;
      break;
    case 2:
    case 3:
      diffSetting[prop] = differenceInWeeks(paramDate, new Date()) + 1;
      diffSearch[prop] = differences.weeks;
      break;
    case 4:
    case 5:
      diffSetting[prop] = differenceInMonths(paramDate, new Date()) + 1;
      diffSearch[prop] = differences.months;
      break;
    default:
      break;
  }
  return { diffSetting, diffSearch };
};

const getDiffMin = ({
  differences,
  diffSetting,
  diffSearch,
  paramDate,
  prop,
}) => {
  diffSetting[prop] = differenceInDays(paramDate, new Date()) + 1;
  diffSearch[prop] = differences.days;
  return { diffSetting, diffSearch };
};

export default applyAllSettings;
