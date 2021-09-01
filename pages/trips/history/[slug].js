import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../../app/hooks/useApi';
import bookingApi from '../../../app/api/BookingAPI';
import carReviewApi from '../../../app/api/VehicleReviewAPI';
import userApi from '../../../app/api/UserAPI';
import authStorage from '../../../app/utils/storageAuth';
import withAuth from '../../../app/HOC/withAuth';
import { convertToCompound } from '../../../app/utils/formatDates';

import Carousel from '../../../app/components/elements/Carousel/Carousel';
import ActivityIndicator from '../../../app/components/elements/ActivityIndicator/ActivityIndicator';
import PastBookingTemplate from '../../../app/components/templates/PastBooking/PastBookingTemplate';
import CanceledBookingDetailsTemplate from '../../../app/components/templates/CanceledBookingDetails/CanceledBookingDetailsTemplate';

const BookingHistory = () => {
  const router = useRouter();
  const { slug } = router.query;

  const getCarAlreadyReviewed = useApi(carReviewApi.getAlreadyReviewed);
  const getUserAlreadyReviewed = useApi(userApi.getAlreadyReviewed);
  const getBooking = useApi(bookingApi.findBooking);

  const [booking, setBooking] = useState({});
  const [user, setUser] = useState({});
  const [review, setReview] = useState({});
  const [imOwner, setImOwner] = useState(false);

  useEffect(() => {
    if (!slug) {
      return;
    }

    const user = authStorage.getUser();
    if (user) {
      setUser(user.info);
      handleGetData(user.info.uid);
    }
  }, [slug]);

  const handleGetData = async (uid) => {
    const { id, bookedBy } = await handleGetBooking();

    const loggedWithCarOwner = uid !== bookedBy.uuid;
    setImOwner(loggedWithCarOwner);

    handleGetAlreadyReviewed(id, loggedWithCarOwner);
  };

  const handleGetBooking = async () => {
    const res = await getBooking.request(slug);
    const booking = res.data.data;

    setBooking(booking);

    return booking;
  };

  const handleGetAlreadyReviewed = async (bookingId, imCarOwner) => {
    const res = imCarOwner
      ? await getUserAlreadyReviewed.request(bookingId)
      : await getCarAlreadyReviewed.request(bookingId);

    setReview(res.data.data);
  };

  const pastBookingTemplate = () => {
    const { uid } = user || {};
    const {
      id: bookingId,
      checkin,
      checkout,
      bookedCar,
      bookedBy,
      pricePerDay,
    } = booking || {};
    const { alreadyReviewed, comment, rating } = review || {};

    const title = `${bookedCar.maker.name || 'Vehículo'} ${
      bookedCar.model.name || ''
    } ${bookedCar.year || ''}`;

    let carOwner = 'user name';
    if (!imOwner) {
      carOwner = `${bookedCar.userOwner.firstName} ${bookedCar.userOwner.lastName}`;
    } else {
      carOwner = `${bookedBy.firstName} ${bookedBy.lastName}`;
    }

    return (
      <PastBookingTemplate
        alreadyReviewed={alreadyReviewed}
        alreadyComment={alreadyReviewed && comment}
        alreadyRating={alreadyReviewed && rating}
        bookedBy={bookedBy.uuid}
        bookingDates={convertToCompound({
          dateOne: checkin,
          dateTwo: checkout,
          type: 'ISO',
        })}
        bookingId={bookingId}
        carId={bookedCar.carId}
        carOwner={carOwner}
        initialStatePictures={[]}
        finishStatePictures={[]}
        reviewBy={uid}
        title={title}
        pricePerDay={pricePerDay}
        showExtraInfoPanels={!imOwner}
        reviewForCar={!imOwner}
      />
    );
  };

  const canceledBookingDetailsTemplate = () => {
    const { bookingStatus, bookedCar } = booking || {};

    const title = `${bookedCar.maker.name || 'Vehículo'} ${
      bookedCar.model.name || ''
    } ${bookedCar.year || ''}`;

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
          getBooking.loading ||
          getCarAlreadyReviewed.loading ||
          getUserAlreadyReviewed.loading
        }
      />

      {booking.constructor === Object &&
        Object.keys(booking).length > 0 &&
        !getCarAlreadyReviewed.loading &&
        !getUserAlreadyReviewed.loading && (
          <>
            <Carousel images={booking.bookedCar.images} />

            {renderTemplate()}
          </>
        )}
    </div>
  );
};

export default withAuth(BookingHistory);
