import Image from 'next/image';

import styles from './default.module.scss';

const NotFindCityTemplate = () => {
  return (
    <>
      <p>
        Si la ciudad donde se encuentra tu vehículo no aparece en la lista de
        opciones proporcionadas por defecto, desde la familia Huru te pedimos
        nos perdones.
      </p>

      <p className={`${styles.disclaimer} ${styles.extraTopSpacing}`}>
        Estamos trabajando fuertemente para ampliar nuestra cobertura en todo el
        territorio nacional.
      </p>

      <div className={styles.image}>
        <Image
          src="/images/we-work.png"
          alt="Estamos trabajando"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </>
  );
};

export default NotFindCityTemplate;
