import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { switchMood } from '../redux/slices/moodAppSlice';
import modeStorage from '../utils/storageMode';

const useMood = () => {
  const dispatch = useDispatch();
  const modeState = useSelector((state) => state.moodApp.hostMoodEnabled);

  useEffect(() => {
    if (process.browser) {
      const mode = modeStorage.getMode();
      dispatch(switchMood(mode));
    }
  }, [dispatch]);

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

  return { mood: modeState, setMood, getMood };
};

export default useMood;
