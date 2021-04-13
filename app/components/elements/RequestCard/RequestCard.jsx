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
}) {
  const router = useRouter();

  const handleGoToDetails = () => {
    router.push(`/host/request-details/${requestId}`);
  };

  return (
    <div className={styles.container} onClick={handleGoToDetails}>
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
      {/* </div> */}
    </div>
  );
}
