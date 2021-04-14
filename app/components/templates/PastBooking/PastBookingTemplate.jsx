import Divider from '../../elements/Divider/Divider';
import DatesPanel from '../../modules/DatesPanel/DatesPanel';
import PaymentDetails from '../../modules/PaymentDetails/PaymentDetails';
import PostReview from '../../modules/PostReview/PostReview';
import ReviewInHistory from '../../modules/ReviewInHistory/ReviewInHistory';
import StatePictures from '../../modules/StatePictures/StatePictures';
import AppLayout from '../../layouts/AppLayout/AppLayout';

import { getDiffDates } from '../../../utils/formatFullDate';

import styles from './PastBookingTemplate.module.scss';

const PastBookingTemplate = ({
  alreadyReviewed,
  alreadyComment,
  alreadyRating,
  title = '',
  carId,
  carOwner,
  bookingId,
  bookingDates,
  reviewBy,
  pricePerDay,
  initialStatePictures,
  finishStatePictures,
}) => {
  const serviceFeePercentage = 0.17;

  return (
    <AppLayout withImage={false} isFullHeigh={false}>
      <h5>{title}</h5>

      <h6>Marco de tiempo</h6>
      <DatesPanel clickleable={false} />

      <Divider size="mediumTop" />

      <h6>Estado inicial del vehículo</h6>
      <StatePictures pictures={initialStatePictures} withMarginBottom={true} />

      <h6>Estado final del vehículo</h6>
      <StatePictures pictures={finishStatePictures} />

      <Divider size="mediumTop" />

      <h6>Información de pago</h6>
      <PaymentDetails
        pricePerDay={pricePerDay}
        serviceFeePercentage={serviceFeePercentage}
        numberOfDays={getDiffDates(bookingDates.checkin, bookingDates.checkout)}
        showTitle={false}
      />

      <Divider size="mediumTop" />

      {alreadyReviewed ? (
        <ReviewInHistory comment={alreadyComment} rating={alreadyRating} />
      ) : (
        <PostReview
          bookingId={bookingId}
          carId={carId}
          ownerName={'Keanu Reeves'}
          uid={reviewBy}
        />
      )}

      <Divider size="mediumTop" />

      <h6>¿Olvidaste alguna pertenencia en el vehículo?</h6>
      <p className={styles.more}>Conoce más información</p>

      <Divider size="mediumTop" />

      <h6>¿Has tenido algún problema durante el tiempo con este vehículo?</h6>
      <p className={styles.more}>Conoce más información</p>
    </AppLayout>
  );
};

export default PastBookingTemplate;
