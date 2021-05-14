const { useEffect } = require('react');

import styles from './Countdown.module.scss';

export default function AppCountdown({
  auxText = 'habilitado en',
  counter = 8,
  setCounter = () => {},
  domain = 'seg.',
  onFinish = () => {},
}) {
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0) onFinish();
  }, [counter]);

  if (counter === 0) return null;

  return (
    <span className={styles.container}>
      ({auxText}: {counter} {domain})
    </span>
  );
}
