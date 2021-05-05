import Avatar from '../../elements/Avatar/Avatar';
import RatingSimple from '../Rating/RatingSimple';
import { formatMonthDayYear } from '../../../utils/formatDates';

import styles from './CardReview.module.scss';

export default function CardReview({
  username,
  photoUrl,
  publishedAt,
  rating,
  review,
}) {
  return (
    <div className={`${styles.container}`}>
      <Avatar src={photoUrl} />

      <RatingSimple value={rating} />

      <div className={styles.info}>
        <p className={styles.text}>{username}</p>
        <p className={styles.text}>
          {formatMonthDayYear({ date: publishedAt, type: 'ISO' })}
        </p>
      </div>

      <p className={styles.content}>{review}</p>
    </div>
  );
}
