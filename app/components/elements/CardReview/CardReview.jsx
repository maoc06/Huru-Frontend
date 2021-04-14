import Avatar from '../../elements/Avatar/Avatar';
import RatingSimple from '../Rating/RatingSimple';

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
        <p className={styles.text}>Mar 11, 2021</p>
      </div>

      <p className={styles.content}>{review}</p>
    </div>
  );
}
