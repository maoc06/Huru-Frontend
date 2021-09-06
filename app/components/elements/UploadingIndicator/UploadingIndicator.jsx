import Lottie from 'react-lottie';
import animationData from '../../../../public/animations/uploading.json';
import styles from './UploadingIndicator.module.scss';

export default function UploadingIndicator({ visible = false }) {
  const defaultOptions = {
    loop: true,
    autoPlay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (!visible) return null;

  return (
    <div className={styles.container}>
      <Lottie options={defaultOptions} height={64} width={64} />
      <p className={styles.caption}>Subiendo...</p>
    </div>
  );
}
