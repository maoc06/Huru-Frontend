import ScrollContainer from 'react-indiana-drag-scroll';

import CardReview from '../../modules/CardReview/CardReview';
import SectionTitle from '../../elements/SectionTitle/SectionTitle';
import SeeAll from '../../elements/SeeAll/SeeAll';

import styles from './ScrollPanelReviews.module.scss';

const ScrollPanelReviews = ({
  reviews = [],
  domain = 'vehículo',
  href = '/',
  title,
}) => {
  if (reviews.length === 0) {
    return <p>{`Este ${domain} aún no tiene reseñas.`}</p>;
  }

  return (
    <>
      {title && <SectionTitle title={title} />}

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
          ;
        </div>
      </ScrollContainer>

      <SeeAll href={href} />
    </>
  );
};

export default ScrollPanelReviews;
