// import styles from './CarProfileTemplate.module.scss';

import Button from '../../elements/Button/Button';
import Divider from '../../elements/Divider/Divider';
import Timeline from '../../modules/Timeline/Timeline';
import PaymentDetails from '../../modules/PaymentDetails/PaymentDetails';
import AppLayout from '../../layouts/AppLayout/AppLayout';

import { diffDays } from '../../../utils/formatDates';

const UpcomingBookingTemplate = ({
  title,
  carOwner,
  bookingDates,
  pricePerDay,
  onClickCancelButton,
}) => {
  const serviceFeePercentage = 0.17;

  return (
    <AppLayout withImage={false} isFullHeigh={false}>
      <h5>{title}</h5>
      {/* <p>De {carOwner}</p> */}

      <h6>Itinerario de la reserva</h6>
      <Timeline
        checkin={bookingDates.checkin}
        checkout={bookingDates.checkout}
      />

      <h6>Pago de la reserva</h6>
      <PaymentDetails
        pricePerDay={pricePerDay}
        serviceFeePercentage={serviceFeePercentage}
        numberOfDays={diffDays({
          dateOne: bookingDates.checkin,
          dateTwo: bookingDates.checkout,
          type: 'ISO',
        })}
        showTitle={false}
      />

      <Divider size="mediumTop" />

      <Button isSecondary={true} onClick={onClickCancelButton} marginTop={true}>
        Cancelar viaje
      </Button>
    </AppLayout>
  );
};

export default UpcomingBookingTemplate;
