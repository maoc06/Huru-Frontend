import Divider from '../../elements/Divider/Divider';
import DatesPanel from '../../modules/DatesPanel/DatesPanel';
import PaymentDetails from '../../modules/PaymentDetails/PaymentDetails';
import PostReview from '../../modules/PostReview/PostReview';
import ReviewInHistory from '../../modules/ReviewInHistory/ReviewInHistory';
import StatePictures from '../../modules/StatePictures/StatePictures';
import AppLayout from '../../layouts/AppLayout/AppLayout';

import { diffDays } from '../../../utils/formatDates';

import styles from './PastBookingTemplate.module.scss';

const PastBookingTemplate = ({
  alreadyReviewed,
  alreadyComment,
  alreadyRating,
  title = '',
  carId,
  carOwner,
  bookedBy,
  bookingId,
  bookingDates,
  reviewBy,
  reviewForCar,
  pricePerDay,
  initialStatePictures,
  finishStatePictures,
  showExtraInfoPanels = true,
}) => {
  const serviceFeePercentage = 0.17;

  return (
    <AppLayout withImage={false} isFullHeigh={false}>
      <div className={styles.container}>
        <section className={styles.info}>
          <h5 className={styles.title}>{title}</h5>

          <h6>Marco de tiempo</h6>
          <DatesPanel paramDates={bookingDates} clickleable={false} />

          <Divider size="mediumTop" />

          <h6>Estado inicial del vehículo</h6>
          <StatePictures
            pictures={initialStatePictures}
            withMarginBottom={true}
          />

          <h6>Estado final del vehículo</h6>
          <StatePictures pictures={finishStatePictures} />

          <Divider size="mediumTop" />

          <h6>Información de pago</h6>
          <PaymentDetails
            pricePerDay={pricePerDay}
            serviceFeePercentage={serviceFeePercentage}
            numberOfDays={diffDays({
              dateOne: bookingDates.raw.start,
              dateTwo: bookingDates.raw.end,
            })}
            showTitle={false}
          />
        </section>

        <section>
          <Divider size="mediumTop" />

          {alreadyReviewed ? (
            <ReviewInHistory
              comment={alreadyComment}
              rating={alreadyRating}
              isForCar={reviewForCar}
              guest={'Keanu Reeves'}
            />
          ) : (
            <PostReview
              bookedBy={bookedBy}
              bookingId={bookingId}
              carId={carId}
              isForCar={reviewForCar}
              ownerName={'Keanu Reeves'}
              reviewBy={reviewBy}
            />
          )}

          {showExtraInfoPanels && (
            <>
              <Divider size="mediumTop" />

              <h6>¿Olvidaste alguna pertenencia en el vehículo?</h6>
              <p className={styles.more}>Conoce más información</p>

              <Divider size="mediumTop" />

              <h6>
                ¿Has tenido algún problema durante el tiempo con este vehículo?
              </h6>
              <p className={styles.more}>Conoce más información</p>
            </>
          )}
        </section>
      </div>
    </AppLayout>
  );
};

export default PastBookingTemplate;
