import Image from 'next/image';

import styles from './StatePicture.module.scss';

export default function StatePicture({ src }) {
  return (
    <div className={styles.container}>
      <Image src={src} alt={src} layout="fill" objectFit="cover" />
    </div>
  );
}
