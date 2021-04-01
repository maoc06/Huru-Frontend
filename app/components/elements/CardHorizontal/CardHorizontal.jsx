import Image from 'next/image';
import { useRouter } from 'next/router';

import FavoriteIcon from '../Icons/FavoriteIcon';
import FillStartIcon from '../Icons/FillStarIcon';

import styles from './CardHorizontal.module.scss';

export default function CardHorizontal({ slug, title, price, imageSrc }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/car/${encodeURIComponent(slug)}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.image}>
        <div className={styles.fav}>
          <FavoriteIcon
            flat={false}
            width={50}
            height={50}
            borderColor={'#fff'}
          />
        </div>
        <Image src={imageSrc} alt={imageSrc} layout="fill" objectFit="cover" />
      </div>

      <div className={styles.info}>
        <h6>{title}</h6>
        <div className={styles.bottom}>
          <div>
            <FillStartIcon height={16} width={16} />
            <p>
              4,2 <span>(8 viajes)</span>
            </p>
          </div>
          <p className={styles.price}>
            {`$${Number(price).toLocaleString('en')} COP/`}
            <span>día</span>
          </p>
        </div>
      </div>
    </div>
  );
}
