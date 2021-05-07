import Avatar from '../../elements/Avatar/Avatar';
import RatingSimple from '../../elements/Rating/RatingSimple';
import { formatMonthDayYear } from '../../../utils/formatDates';

import styles from './CardReview.module.scss';

export default function CardReview({
  username,
  photoUrl,
  publishedAt,
  rating,
  review,
  isFull = false,
}) {
  return (
    <div className={`${styles.container} ${isFull && styles.full}`}>
      <section className={`${styles.head} ${isFull && styles.headRow}`}>
        <Avatar src={photoUrl} />

        <div className={`${isFull ? styles.fullRating : styles.shortRating}`}>
          <RatingSimple value={rating} />
        </div>
      </section>

      <section className={styles.info}>
        <p className={styles.text}>{username}</p>
        <p className={styles.text}>
          {formatMonthDayYear({ date: publishedAt, type: 'ISO' })}
        </p>
      </section>

      <p className={styles.content}>{review}</p>
    </div>
  );
}
