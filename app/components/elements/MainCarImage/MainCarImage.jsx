import Image from 'next/image';

import styles from './MainCarImage.module.scss';

const MainCarImage = ({ imageSrc }) => {
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        <p>Foto principal</p>
      </div>

      <Image
        src={imageSrc}
        alt={imageSrc}
        layout="fill"
        objectFit="cover"
        className={styles.image}
      />
    </div>
  );
};

export default MainCarImage;
