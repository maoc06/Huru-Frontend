import { useRouter } from 'next/router';

import BasicInfoUserMin from '../BasicInfoUserMin/BasicInfoUserMin';

import { formatSimpleFullDate } from '../../../utils/formatFullDate';

import styles from './RequestCard.module.scss';

export default function RequestCard({
  guestName,
  guestImg,
  carName,
  carImg,
  dateStart,
  dateEnd,
  requestId,
  href = '/host/request-details',
  withExtraLabel = false,
  extraLabelText = '',
  extraLabelColor = 'blue',
}) {
  const router = useRouter();

  const handleGoToDetails = () => {
    router.push(`${href}/${requestId}`);
  };

  return (
    <div
      className={`${styles.card} ${withExtraLabel && styles.extraMargin}`}
      onClick={handleGoToDetails}
    >
      <div
        className={`${styles.inner} ${withExtraLabel && styles.extraSpacing} ${
          extraLabelColor === 'red' && styles.labelBorderRed
        } ${extraLabelColor === 'green' && styles.labelBorderGreen} ${
          extraLabelColor === 'yellow' && styles.labelBorderYellow
        }`}
      >
        {/* LEft: User and Vehicle info */}
        <section className={styles.infoUser}>
          <BasicInfoUserMin name={guestName} urlImage={guestImg} />
          <BasicInfoUserMin name={carName} urlImage={carImg} />
        </section>

        {/* RIGHT: start and end dates */}
        <section className={styles.dateContainer}>
          <div className={styles.start}>
            <p className={styles.date}>Fecha y hora de inicio</p>
            <p>{formatSimpleFullDate(dateStart)}</p>
          </div>

          <div>
            <p className={styles.date}>Fecha y hora de fin</p>
            <p>{formatSimpleFullDate(dateEnd)}</p>
          </div>
        </section>
      </div>

      {withExtraLabel && (
        <div
          className={`${styles.extraLabel} ${
            extraLabelColor === 'red' && styles.labelBackgroundRed
          } ${extraLabelColor === 'green' && styles.labelBackgroundGreen} ${
            extraLabelColor === 'yellow' && styles.labelBackgroundYellow
          }`}
        >
          <p>{extraLabelText}</p>
        </div>
      )}
    </div>
  );
}
