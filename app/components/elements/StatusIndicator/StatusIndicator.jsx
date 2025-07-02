import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

import Button from '../Button/Button';

import styles from './StatusIndicator.module.scss';

const DynamicLottie = dynamic(() => import('react-lottie'), { ssr: false });

export default function StatusIndicator({
  animationData,
  isLoop = true,
  visible = false,
  title,
  message,
  buttonMsg,
  onClickButton,
  delay = 0,
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (visible && delay > 0) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(visible);
    }
  }, [visible, delay]);

  const defaultOptions = {
    loop: isLoop,
    autoPlay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (!isVisible) return null;

  return (
    <div className={styles.background}>
      <div className={styles.overlay}>
        <DynamicLottie
          options={defaultOptions}
          height={125}
          width={125}
          style={{
            alignSelf: 'center',
          }}
        />
        <h6>{title}</h6>

        <p>{message}</p>

        <div className={styles.button}>
          <Button invert={true} onClick={onClickButton}>
            {buttonMsg}
          </Button>
        </div>
      </div>
    </div>
  );
}
