import dynamic from 'next/dynamic';

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
}) {
  const defaultOptions = {
    loop: isLoop,
    autoPlay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (!visible) return null;

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
