import dynamic from 'next/dynamic';

import animationData from '../../../../public/animations/not-found.json';
import styles from './NotFound.module.scss';

const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

export default function NotFound({
  text = 'No se encontraron resultados.',
  subtitle = '',
  showAnimation = true,
}) {
  const defaultOptions = {
    loop: true,
    autoPlay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className={styles.container}>
      {showAnimation && (
        <Lottie options={defaultOptions} height={160} width={160} />
      )}

      <p className={`${subtitle.length > 0 && styles.bold}`}>{text}</p>

      {subtitle.length > 0 && <span>{subtitle}</span>}
    </div>
  );
}
