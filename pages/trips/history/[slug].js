import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../../app/hooks/useApi';
import bookingApi from '../../../app/api/BookingAPI';
import carApi from '../../../app/api/VehicleApi';
import carReviewApi from '../../../app/api/VehicleReviewAPI';
import authStorage from '../../../app/utils/storageAuth';

import Carousel from '../../../app/components/elements/Carousel/Carousel';
import ActivityIndicator from '../../../app/components/elements/ActivityIndicator/ActivityIndicator';
import PastBookingTemplate from '../../../app/components/templates/PastBooking/PastBookingTemplate';
import CanceledBookingDetailsTemplate from '../../../app/components/templates/CanceledBookingDetails/CanceledBookingDetailsTemplate';

function BookingHistory() {
  const router = useRouter();
  const { slug } = router.query;

  const getAlreadyReviewed = useApi(carReviewApi.getAlreadyReviewed);
  const getBooking = useApi(bookingApi.findBooking);
  const getCar = useApi(carApi.findCar);

  const [booking, setBooking] = useState({});
  const [car, setCar] = useState({});
  const [user, setUser] = useState({});
  const [review, setReview] = useState({});

  useEffect(() => {
    if (!slug) {
      return;
    }

    const user = authStorage.getUser();
    if (user) {
      setUser(user.info);
      handleGetData();
    }
  }, [slug]);

  const handleGetData = async () => {
    const { id, bookingCar } = await handleGetBooking();
    handleGetAlreadyReviewed(id);
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

  const handleGetAlreadyReviewed = async (bookingId) => {
    const res = await getAlreadyReviewed.request(bookingId);
    setReview(res.data.data);
  };

  const pastBookingTemplate = () => {
    const { uid } = user || {};
    const { car_id: carId, name, model, year } = car || {};
    const { id: bookingId, checkin, checkout, pricePerDay } = booking || {};
    const { alreadyReviewed, comment, rating } = review || {};

    const title = `${name || 'Vehículo'} ${model || ''} ${year || ''}`;

    return (
      <PastBookingTemplate
        alreadyReviewed={alreadyReviewed}
        alreadyComment={alreadyReviewed && comment}
        alreadyRating={alreadyReviewed && rating}
        bookingDates={{ checkin, checkout }}
        bookingId={bookingId}
        carId={carId}
        carOwner="Keanu Reeves"
        initialStatePictures={[]}
        finishStatePictures={[]}
        reviewBy={uid}
        title={title}
        pricePerDay={pricePerDay}
      />
    );
  };

  const canceledBookingDetailsTemplate = () => {
    const { name, model, year } = car || {};
    const { bookingStatus } = booking || {};

    const title = `${name || 'Vehículo'} ${model || ''} ${year || ''}`;

    return (
      <CanceledBookingDetailsTemplate title={title} type={bookingStatus} />
    );
  };

  const renderTemplate = () => {
    switch (booking.bookingStatus) {
      case 4:
        return pastBookingTemplate();
      case 6:
      case 7:
        return canceledBookingDetailsTemplate();
      default:
        break;
    }
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
        visible={
          getBooking.loading || getCar.loading || getAlreadyReviewed.loading
        }
      />

      {!getBooking.loading && !getCar.loading && !getAlreadyReviewed.loading && (
        <>
          <Carousel images={car.images} />

          {renderTemplate()}
        </>
      )}
    </div>
  );
}

export default BookingHistory;
