const key = 'hostMode';

const storeMode = (mode) => {
  try {
    localStorage.setItem(key, JSON.stringify(mode));
  } catch (error) {
    console.error('Error setting mode', error);
  }
};

const getMode = () => {
  try {
    const mode = localStorage.getItem(key);
    if (mode !== null) return JSON.parse(mode);
    return false;
  } catch (error) {
    console.error('Error get mode', error);
  }
};

export default { storeMode, getMode };
