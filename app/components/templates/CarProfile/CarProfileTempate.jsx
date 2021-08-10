import Divider from '../../elements/Divider/Divider';
import ShowMoreText from '../../elements/ShowMoreText/ShowMoreText';
import CarSpecifications from '../../modules/CarSpecifications/CarSpecifications';
import UserProfileBasicInfo from '../../modules/UserProfileBasicInfo/UserProfileBasicInfo';
import ScrollPanelReviews from '../../modules/ScrollPanelReviews/ScrollPanelReviews';
import DatesPanel from '../../modules/DatesPanel/DatesPanel';
import PolicyCancellationSection from '../../modules/PolicyCancellation/PolicyCancellationSection';

import styles from './CarProfileTemplate.module.scss';
import FeatureSimpleCompound from '../../modules/FeatureSimpleCompound/FeatureSimpleCompound';

const CarProfileTemplate = ({
  carId,
  dates,
  userId = '',
  username = '',
  userPic = '',
  userJoinAt = '',
  title,
  titleDates = 'Disponibilidad',
  titleUser = 'Huru Amigo',
  description,
  typeTransmission,
  numSeats,
  typeGas,
  features = [],
  featuresInline = false,
  reviews = [],
  reviewsDomain,
  showDescription = true,
  showSpecifications = true,
  showFeatures = true,
  showUser = true,
  showPolicies = true,
  withLinkToOwner = true,
}) => {
  return (
    <main className={styles.wrapper}>
      <article className={styles.inner}>
        <h5>{title}</h5>

        {showDescription && (
          <ShowMoreText>
            <p className={styles.long_text}>{description}</p>
          </ShowMoreText>
        )}
      </article>

      <Divider />

      {showSpecifications && (
        <>
          <article className={styles.inner}>
            <CarSpecifications
              title="Especificaciones"
              typeTransmission={typeTransmission}
              numSeats={numSeats}
              typeGas={typeGas}
            />
          </article>

          <Divider />
        </>
      )}

      {showFeatures && (
        <>
          <article className={styles.inner}>
            <FeatureSimpleCompound
              carId={carId}
              title="Caracteristicas"
              features={features}
              seeAllInline={featuresInline}
            />
          </article>

          <Divider />
        </>
      )}

      <article className={`${styles.inner} ${styles.dates}`}>
        <DatesPanel compact={true} paramDates={dates} title={titleDates} />
      </article>

      <Divider />

      {showUser && (
        <>
          <article className={styles.inner}>
            <UserProfileBasicInfo
              userId={userId}
              name={username}
              title={titleUser}
              profilePicture={userPic}
              createdAt={userJoinAt}
              href={`/user-profile/${encodeURIComponent(userId)}`}
              withLink={withLinkToOwner}
            />
          </article>

          <Divider />
        </>
      )}

      <article className={styles.inner_left}>
        <ScrollPanelReviews
          domain={reviewsDomain}
          title="Reseñas"
          reviews={reviews}
          href={`/car/details/reviews/${encodeURIComponent(carId)}`}
        />
      </article>

      <Divider />

      {showPolicies && (
        <article className={styles.inner}>
          <PolicyCancellationSection />
        </article>
      )}
    </main>
  );
};

export default CarProfileTemplate;
