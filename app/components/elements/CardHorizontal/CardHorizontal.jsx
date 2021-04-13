import Image from 'next/image';

import { FavoriteIcon, FillStartIcon } from '../Icons/Shared';
import DatesPanel from '../../modules/DatesPanel/DatesPanel';

import styles from './CardHorizontal.module.scss';

export default function CardHorizontal({
  title,
  price,
  imageSrc,
  showPanelDates = false,
  withExtraLabel = false,
  extraLabelText = '',
  extraLabelColor = 'blue',
  onSelect,
}) {
  return (
    <div
      className={`${styles.card} ${withExtraLabel && styles.extraMargin}`}
      onClick={onSelect}
    >
      <div
        className={`${styles.inner} ${withExtraLabel && styles.extraSpacing} ${
          extraLabelColor === 'red' && styles.labelBorderRed
        } ${extraLabelColor === 'green' && styles.labelBorderGreen}`}
      >
        <div className={styles.image}>
          <div className={styles.fav}>
            <FavoriteIcon
              flat={false}
              width={50}
              height={50}
              borderColor={'#fff'}
            />
          </div>
          <Image
            src={imageSrc}
            alt={imageSrc}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className={styles.info}>
          <h6>{title}</h6>

          {!showPanelDates && (
            <div className={styles.bottom}>
              <div className={styles.stats}>
                <FillStartIcon height={16} width={16} />

                <p className={styles.counts}>
                  4,2 <span>(8 viajes)</span>
                </p>
              </div>

              <p className={styles.price}>
                {`$${Number(price).toLocaleString('en')} COP/`}
                <span>día</span>
              </p>
            </div>
          )}

          {showPanelDates && <DatesPanel clickleable={false} />}
        </div>
      </div>

      {withExtraLabel && (
        <div
          className={`${styles.extraLabel} ${
            extraLabelColor === 'red' && styles.labelBackgroundRed
          } ${extraLabelColor === 'green' && styles.labelBackgroundGreen}`}
        >
          <p>{extraLabelText}</p>
        </div>
      )}
    </div>
  );
}
