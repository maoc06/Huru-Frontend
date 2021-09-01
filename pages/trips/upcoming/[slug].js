import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../../app/hooks/useApi';
import bookingApi from '../../../app/api/BookingAPI';
import withAuth from '../../../app/HOC/withAuth';

import { todayDate } from '../../../app/utils/formatDates';

import Carousel from '../../../app/components/elements/Carousel/Carousel';
import UpcomingBookingTemplate from '../../../app/components/templates/UpcomingBooking/UpcomingBookingTemplate';
import ActivityIndicator from '../../../app/components/elements/ActivityIndicator/ActivityIndicator';
import Modal from '../../../app/components/modules/Modal/Modal';

import { WarningIcon } from '../../../app/components/elements/Icons/Shared';

const UpcomingBooking = () => {
  const router = useRouter();
  const { slug } = router.query;

  const getBooking = useApi(bookingApi.findBooking);
  const cancelBooking = useApi(bookingApi.cancelBooking);

  const [booking, setBooking] = useState({});
  const [showConfimationModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (slug) handleGetBooking();
  }, [slug]);

  const handleGetBooking = async () => {
    const res = await getBooking.request(slug);
    const booking = res.data.data;

    setBooking(booking);

    return booking;
  };

  const handleCancelBooking = async () => {
    setShowConfirmModal(false);

    const canceled = {
      bookingId: slug,
      cancelDate: todayDate(),
      bookingStatus: 7,
      isCancel: true,
    };

    await cancelBooking.request(canceled);
    router.push('/trips');
  };

  const handleShowConfirmModal = () => {
    setShowConfirmModal(!showConfimationModal);
  };

  return (
    <div>
      <Head>
        <title>Huru | Renta carros</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ActivityIndicator
        visible={getBooking.loading || cancelBooking.loading}
      />

      <Modal
        title="¿Cancelar la reserva?"
        content="Podrias no recibir reembolso de acuerdo a las políticas de cancelación"
        icon={<WarningIcon />}
        visible={showConfimationModal}
        confirmText={'Cancelar reserva'}
        rejectText={'Mantener reserva'}
        onConfirm={handleCancelBooking}
        onReject={handleShowConfirmModal}
        onCloseModal={handleShowConfirmModal}
      />

      {booking.constructor === Object && Object.keys(booking).length > 0 && (
        <>
          <Carousel images={booking.bookedCar.images} />

          <UpcomingBookingTemplate
            title={`${booking.bookedCar.maker.name} ${booking.bookedCar.model.name} ${booking.bookedCar.year}`}
            bookingDates={{
              checkin: booking.checkin,
              checkout: booking.checkout,
            }}
            pricePerDay={booking.pricePerDay}
            onClickCancelButton={handleShowConfirmModal}
          />
        </>
      )}
    </div>
  );
};

export default withAuth(UpcomingBooking);
