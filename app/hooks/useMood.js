import { useDispatch, useSelector } from 'react-redux';

import { switchMood } from '../redux/slices/moodAppSlice';
import modeStorage from '../utils/storageMode';

const useMood = () => {
  const dispatch = useDispatch();
  const modeState = useSelector((state) => state.moodApp.hostMoodEnabled);

  const setMood = () => {
    const mode = !modeState;
    modeStorage.storeMode(mode);
    dispatch(switchMood(mode));
  };

  const getMood = () => {
    if (process.browser) {
      return modeStorage.getMode();
    }
    return false;
  };

  return { setMood, getMood };
};

export default useMood;
