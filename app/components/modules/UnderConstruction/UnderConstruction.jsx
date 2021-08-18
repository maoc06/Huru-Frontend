import Lottie from 'react-lottie';
import { useRouter } from 'next/router';

import Button from '../../elements/Button/Button';
import TitlePage from '../../elements/TitlePage/TitlePage';
import styles from './UnderConstruction.module.scss';
import animationData from '../../../../public/animations/construction.json';

export default function UnderConstruction({
  title = 'BAJO CONSTRUCCIÓN',
  text = 'Estamos trabajando fuertemente para ofrecerte lo mejor. Esta función estará disponible en versiones futuras.',
  actionCopy = 'Volver al inicio',
  redirectTo = '/',
  showAnimation = true,
  isMobile = true,
}) {
  const router = useRouter();

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
        <Lottie
          options={defaultOptions}
          height={isMobile ? 182 : 314}
          width={isMobile ? 270 : 480}
          style={{ marginBottom: 32 }}
        />
      )}

      <TitlePage>{title}</TitlePage>

      <p className={styles.message}>{text}</p>

      <Button
        marginTop={true}
        onClick={() => {
          router.push(redirectTo);
        }}
      >
        {actionCopy}
      </Button>
    </div>
  );
}
