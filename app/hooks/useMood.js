import { useDispatch, useSelector } from 'react-redux';

import { switchMood } from '../redux/slices/moodAppSlice';

const useMood = () => {
  const dispatch = useDispatch();
  const moodState = useSelector((state) => state.moodApp.hostMoodEnabled);
  const key = 'hostMood';

  const setMood = () => {
    const updatedMood = !moodState;
    localStorage.setItem(key, JSON.stringify(updatedMood));
    dispatch(switchMood(updatedMood));
  };

  const getMood = () => {
    const mood = localStorage.getItem(key);
    if (mood !== null) return JSON.parse(mood);
    return false;
  };

  return { setMood, getMood };
};

export default useMood;
