import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../../app/hooks/useApi';
import carApi from '../../../app/api/VehicleApi';
import bookingApi from '../../../app/api/BookingAPI';

import { getTodayDateTime } from '../../../app/utils/formatFullDate';

import Carousel from '../../../app/components/elements/Carousel/Carousel';
import UpcomingBookingTemplate from '../../../app/components/templates/UpcomingBooking/UpcomingBookingTemplate';
import ActivityIndicator from '../../../app/components/elements/ActivityIndicator/ActivityIndicator';
import Modal from '../../../app/components/modules/Modal/Modal';

import { WarningIcon } from '../../../app/components/elements/Icons/Shared';

function UpcomingBooking() {
  const router = useRouter();
  const { slug } = router.query;

  const getBooking = useApi(bookingApi.findBooking);
  const getCar = useApi(carApi.findCar);
  const cancelBooking = useApi(bookingApi.cancelBooking);

  const [booking, setBooking] = useState({});
  const [car, setCar] = useState({});
  const [showConfimationModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    const { bookingCar } = await handleGetBooking();
    handleGetCar(bookingCar);
  };

  const handleGetBooking = async () => {
    const res = await getBooking.request(slug);
    const booking = res.data.data;

    setBooking(booking);

    return booking;
  };

  const handleGetCar = async (carId) => {
    const res = await getCar.request(carId);
    setCar(res.data.data);
  };

  const handleCancelBooking = async () => {
    setShowConfirmModal(false);

    const canceled = {
      bookingId: slug,
      cancelDate: getTodayDateTime(),
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
        visible={getBooking.loading || getCar.loading || cancelBooking.loading}
      />

      <Modal
        title="¿Cancelar la reserva?"
        content="Podrias no recibir reembolso de acuerdo a las políticas de cancelación"
        icon={<WarningIcon />}
        visible={showConfimationModal}
        onConfirm={handleCancelBooking}
        onReject={handleShowConfirmModal}
        onCloseModal={handleShowConfirmModal}
      />

      {!getBooking.loading && !getCar.loading && (
        <>
          <Carousel images={car.images} />

          <UpcomingBookingTemplate
            title={`${car.name} ${car.model} ${car.year}`}
            carOwner="Keanu Reeves"
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
}

export default UpcomingBooking;
