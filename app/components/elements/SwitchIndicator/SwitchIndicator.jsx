import Lottie from 'react-lottie';
import animationData from '../../../../public/animations/change.json';

import styles from './SwitchIndicator.module.scss';

export default function SwitchIndicator({ visible = false }) {
  const defaultOptions = {
    loop: true,
    autoPlay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (!visible) return null;

  return (
    <div className={styles.wrap}>
      <div className={styles.overlay}>
        <Lottie
          options={defaultOptions}
          height={100}
          width={100}
          style={{
            alignSelf: 'center',
          }}
        />
        <h6>Cambiando de modo...</h6>
      </div>
    </div>
  );
}
