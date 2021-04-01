import Avatar from '../../elements/Avatar/Avatar';
import Rating from '../Rating/Rating';

import styles from './CardReview.module.scss';

export default function CardReview({ username, publishedAt, rating, review }) {
  return (
    <div className={`${styles.container}`}>
      <Avatar
        src={
          'https://us.hola.com/imagenes/cine/201508061851/ben-affleck-jennifer-garner-nana/0-9-744/bennanny2--z.jpg'
        }
      />

      <Rating />

      <div className={styles.info}>
        <p className={styles.text}>Pedro Perez</p>
        <p className={styles.text}>Mar 11, 2021</p>
      </div>

      <p className={styles.text}>
        Lorem ipsum dolor sit amet, consectetu adipiscing elit. Lorem ipsum
        dolor sit amet, consectetu.
      </p>
    </div>
  );
}
