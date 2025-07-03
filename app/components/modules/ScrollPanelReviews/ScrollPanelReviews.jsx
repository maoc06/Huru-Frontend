import ScrollContainer from 'react-indiana-drag-scroll';

import CardReview from '../../modules/CardReview/CardReview';
import SectionTitle from '../../elements/SectionTitle/SectionTitle';
import SeeAll from '../../elements/SeeAll/SeeAll';

import styles from './ScrollPanelReviews.module.scss';

const RatingSummary = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div className={styles.ratingSummary}>
        <div className={styles.ratingDisplay}>
          <span className={styles.ratingNumber}>0.0</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" 
              fill="currentColor"
            />
          </svg>
        </div>
        <p className={styles.ratingCount}>(0 calificaciones)</p>
      </div>
    );
  }

  // Calculate average rating
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = totalRating / reviews.length;
  const reviewCount = reviews.length;

  return (
    <div className={styles.ratingSummary}>
      <div className={styles.ratingDisplay}>
        <span className={styles.ratingNumber}>{averageRating.toFixed(2)}</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" 
            fill="currentColor"
          />
        </svg>
      </div>
      <p className={styles.ratingCount}>
        ({reviewCount} {reviewCount === 1 ? 'calificación' : 'calificaciones'})
      </p>
    </div>
  );
};

const ReviewsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const ScrollPanelReviews = ({
  reviews = [],
  domain = 'vehículo',
  href = '/',
  title = 'Reseñas',
}) => {
  return (
    <div className={styles.reviewsSection}>
      {title && (
        <div className={styles.titleWrapper}>
          <div className={styles.titleSection}>
            <ReviewsIcon />
            <SectionTitle title={title} />
          </div>
        </div>
      )}

      <RatingSummary reviews={reviews} />

      {reviews.length > 0 && (
        <>
          <ScrollContainer vertical={false} activationDistance={5}>
            <div className={styles.reviews_container}>
              {reviews.map(
                ({
                  id,
                  createdAt,
                  comment,
                  rating,
                  reviewBy: { firstName, lastName, profilePhoto },
                }) => {
                  return (
                    <CardReview
                      key={id}
                      username={`${firstName} ${lastName}`}
                      photoUrl={profilePhoto}
                      publishedAt={createdAt}
                      rating={rating}
                      review={comment}
                    />
                  );
                }
              )}
            </div>
          </ScrollContainer>

          <SeeAll href={href} />
        </>
      )}
    </div>
  );
};

export default ScrollPanelReviews;
