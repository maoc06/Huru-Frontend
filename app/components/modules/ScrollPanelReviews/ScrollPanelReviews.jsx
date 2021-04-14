import Link from 'next/link';
import ScrollContainer from 'react-indiana-drag-scroll';

import CardReview from '../../elements/CardReview/CardReview';

import styles from './ScrollPanelReviews.module.scss';

const ScrollPanelReviews = ({ reviews = [] }) => {
  if (reviews.length === 0) {
    return <p>Este vehículo aún no tiene reseñas.</p>;
  }

  return (
    <>
      <ScrollContainer vertical={false} activationDistance={5}>
        <div className={styles.reviews_container}>
          {reviews.map(
            ({
              id,
              comment,
              rating,
              reviewBy: { firstName, lastName, profilePhoto },
            }) => {
              return (
                <CardReview
                  key={id}
                  username={`${firstName} ${lastName}`}
                  photoUrl={profilePhoto}
                  rating={rating}
                  review={comment}
                />
              );
            }
          )}
          ;
        </div>
      </ScrollContainer>

      <div className={`${styles.see_details} ${styles.extra_space}`}>
        <Link href="">
          <a>Ver todas</a>
        </Link>
      </div>
    </>
  );
};

export default ScrollPanelReviews;
