import storeParams from '../utils/storeParams';

const useParams = () => {
  const getPlace = () => {
    if (process.browser) {
      return storeParams.getPlace();
    }
    return {};
  };

  const getDates = () => {
    if (process.browser) {
      return storeParams.getDates();
    }
    return {};
  };

  return { getPlace, getDates };
};

export default useParams;
