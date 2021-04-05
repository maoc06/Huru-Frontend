import Button from '../../elements/Button/Button';

import useApi from '../../../hooks/useApi';
import bookingApi from '../../../api/BookingAPI';

import styles from './TwoBottons.module.scss';

export default function TwoBottons({
  bookingId = '',
  email = '',
}) {

  const confirmBooking = useApi(bookingApi.confirmBookingRequest);

  const handleAcceptBooking = () => {
    confirmBooking.request({bookingId, confirm: 5, email});
  }

  const handleRejectBooking = () => {
    confirmBooking.request({bookingId, confirm: 6, email});
  }

  return (
    <div className={styles.container}>
      <Button onClick={handleAcceptBooking}>{email.data}</Button>
      <Button onClick={handleRejectBooking}>Rechazar</Button>
    </div>
  );
}



