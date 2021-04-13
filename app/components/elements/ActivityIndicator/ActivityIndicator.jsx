import Lottie from 'react-lottie';
import animationData from '../../../../public/animations/loader.json';
import animationDataChange from '../../../../public/animations/change.json';

import styles from './ActivityIndicator.module.scss';

export default function ActivityIndicator({
  visible = false,
  type = 'loader',
}) {
  const defaultOptions = {
    loop: true,
    autoPlay: true,
    animationData: type === 'loader' ? animationData : animationDataChange,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (!visible) return null;

  return (
    <div className={styles.wrap}>
      <div>
        <Lottie options={defaultOptions} height={150} width={150} />
      </div>
    </div>
  );
}
