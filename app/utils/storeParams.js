const keyPlace = 'place';
const keyDates = 'dates';

const getPlace = () => {
  try {
    const place = localStorage.getItem(keyPlace);
    return JSON.parse(place);
  } catch (error) {
    console.error('Error getting place from local storage', error);
  }
};

const getDates = () => {
  try {
    const dates = localStorage.getItem(keyDates);
    return JSON.parse(dates);
  } catch (error) {
    console.error('Error getting dates from local storage', error);
  }
};

export default { getPlace, getDates };
