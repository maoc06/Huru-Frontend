import Divider from '../../elements/Divider/Divider';
import ShowMoreText from '../../elements/ShowMoreText/ShowMoreText';
import CarSpecifications from '../../modules/CarSpecifications/CarSpecifications';
import UserProfileBasicInfo from '../../modules/UserProfileBasicInfo/UserProfileBasicInfo';
import ScrollPanelReviews from '../../modules/ScrollPanelReviews/ScrollPanelReviews';
import DatesPanel from '../../modules/DatesPanel/DatesPanel';
import PolicyCancellationSection from '../../modules/PolicyCancellation/PolicyCancellationSection';
import CarFeatures from '../../modules/CarFeatures/CarFeatures';

import styles from './CarProfileTemplate.module.scss';

const CarProfileTemplate = ({
  carId,
  dates = null,
  disabledDates = [],
  userId = '',
  username = '',
  userPic = '',
  userJoinAt = '',
  title,
  titleDates = 'Disponibilidad',
  titleUser = 'Anfitrión',
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
  chageableDates = true,
}) => {
  // Debug log for CarProfileTemplate
  console.log('🎯 CarProfileTemplate Debug:');
  console.log('- Features passed to template:', features);
  console.log('- Features length:', features.length);
  console.log('- Show features flag:', showFeatures);

  return (
    <main className={styles.wrapper}>
      <article className={styles.inner}>
        <h5>{title}</h5>

        {showSpecifications && (
          <CarSpecifications
            typeTransmission={typeTransmission}
            numSeats={numSeats}
            typeGas={typeGas}
          />
        )}
      </article>

      <Divider />

      {showDescription && (
        <>
          <article className={styles.inner}>
            <h6>Descripción</h6>
            <ShowMoreText>
              <p className={styles.long_text}>{description}</p>
            </ShowMoreText>
          </article>

          <Divider />
        </>
      )}

      {showFeatures && (
        <>
          <article className={styles.inner}>
            <CarFeatures
              features={features}
              title="Características"
              href={`/car/details/features/${encodeURIComponent(carId)}`}
            />
          </article>

          <Divider />
        </>
      )}

      <article className={`${styles.inner} ${styles.dates}`}>
        <DatesPanel
          compact={true}
          paramDates={dates}
          title={titleDates}
          clickleable={chageableDates}
          disabledDates={disabledDates}
        />
        <Divider />
      </article>

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
              cursorOnAvatar={true}
            />
          </article>

          <Divider />
        </>
      )}

      {showPolicies && (
        <>
          <article className={styles.inner}>
            <PolicyCancellationSection />
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
    </main>
  );
};

export default CarProfileTemplate;
