// import styles from './CarProfileTemplate.module.scss';

import Button from '../../elements/Button/Button';
import Divider from '../../elements/Divider/Divider';
import Timeline from '../../modules/Timeline/Timeline';
import PaymentDetails from '../../modules/PaymentDetails/PaymentDetails';
import AppLayout from '../../layouts/AppLayout/AppLayout';
import styles from './UpcomingBookingTemplate.module.scss';
import { diffDays } from '../../../utils/formatDates';

const UpcomingBookingTemplate = ({
  title,
  bookingDates,
  pricePerDay,
  onClickCancelButton,
  bookingStage = 1,
}) => {
  const serviceFeePercentage = 0.17;

  return (
    <AppLayout withImage={false} isFullHeigh={false}>
      <h5 className={styles.car}>{title}</h5>

      <div className={styles.container}>
        <section className={styles.info}>
          <h6>Itinerario de la reserva</h6>

          {bookingStage === 1 && (
            <span className={styles.pending}>
              La reserva está pendiente de aprovación
            </span>
          )}

          {bookingStage === 5 && (
            <span className={styles.finished}>
              El servicio se finalizo con exito
            </span>
          )}

          <Timeline
            checkin={bookingDates.checkin}
            checkout={bookingDates.checkout}
            initialStage={bookingStage}
          />
        </section>

        <div className={styles.dynamic}>
          <Divider size="mediumTop" />
        </div>

        <section>
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

          {bookingStage < 4 && (
            <>
              <Divider size="mediumTop" />

              <Button
                isSecondary={true}
                onClick={onClickCancelButton}
                marginTop={true}
              >
                Cancelar viaje
              </Button>
            </>
          )}
        </section>
      </div>
    </AppLayout>
  );
};

export default UpcomingBookingTemplate;
