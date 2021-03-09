import Lottie from 'react-lottie';
import animationData from '../../../../public/animations/check.json';
import { useRouter } from 'next/router';

import Button from '../Button/Button';

import styles from './CheckIndicator.module.scss';

export default function CheckIndicator({
  visible = false,
  title,
  message,
  buttonMsg,
  route,
}) {
  const router = useRouter();

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
    <div className={styles.background}>
      <div className={styles.overlay}>
        <Lottie
          options={defaultOptions}
          height={150}
          width={150}
          style={{
            alignSelf: 'center',
          }}
        />
        <h4>{title}</h4>

        <p>{message}</p>

        <Button onClick={() => router.push(route)} marginBottom>
          {buttonMsg}
        </Button>
      </div>
    </div>
  );
}
