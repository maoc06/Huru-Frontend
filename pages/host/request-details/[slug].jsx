import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../../app/hooks/useApi';
import bookingApi from '../../../app/api/BookingAPI';
import userApi from '../../../app/api/UserAPI';

import CarProfileTemplate from '../../../app/components/templates/CarProfile/CarProfileTempate';
import TwoBottons from '../../../app/components/modules/TwoBottons/TwoBottons';
import Modal from '../../../app/components/modules/Modal/Modal';
import ActivityIndicator from '../../../app/components/elements/ActivityIndicator/ActivityIndicator';
import Carousel from '../../../app/components/elements/Carousel/Carousel';
import StatusIndicator from '../../../app/components/elements/StatusIndicator/StatusIndicator';
import checkAnimationData from '../../../public/animations/check.json';
import { WarningIcon } from '../../../app/components/elements/Icons/Shared';

import { convertToCompound } from '../../../app/utils/formatDates';

export default function RequestDetail() {
  const router = useRouter();

  const getBooking = useApi(bookingApi.findBooking);
  const getApplicantReviews = useApi(userApi.findUserReviews);
  const confirmBooking = useApi(bookingApi.confirmBookingRequest);

  const [booking, setBooking] = useState({});
  const [reviews, setReviews] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openStatusIndicator, setOpenStatusIndicator] = useState(false);

  const { slug } = router.query;

  const handleGetBooking = async () => {
    const res = await getBooking.request(slug);
    const booking = res.data.data;

    console.log(booking);

    setBooking(booking);

    return booking;
  };

  const handleGetApplicantReviews = async (userId) => {
    const res = await getApplicantReviews.request(userId);
    setReviews(res.data.data);
  };

  const handleGetData = async () => {
    const { bookedBy } = await handleGetBooking();
    handleGetApplicantReviews(bookedBy.uuid);
  };

  const handleAcceptBooking = async () => {
    await confirmBooking.request({
      bookingId: slug,
      confirm: 5,
      email: booking.bookedBy.email,
    });

    if (!confirmBooking.error) {
      setOpenStatusIndicator(true);
    }
  };

  const handleRejectBooking = async () => {
    setOpenModal(false);

    await confirmBooking.request({
      bookingId: slug,
      confirm: 6,
      email: booking.bookedBy.email,
    });

    if (!confirmBooking.error) {
      router.push('/');
    }
  };

  const handleButtonPopUp = () => {
    router.push(`/trips/upcoming/${encodeURIComponent(slug)}`);
  };

  useEffect(() => {
    if (slug) {
      handleGetData();
    }
  }, [slug]);

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
        visible={getBooking.loading || confirmBooking.loading}
      />

      {booking.constructor === Object && Object.keys(booking).length > 0 && (
        <>
          <StatusIndicator
            animationData={checkAnimationData}
            visible={openStatusIndicator}
            title={'Reserva aceptada'}
            message={`Preparate para recibir a ${booking.bookedBy.firstName} ${booking.bookedBy.lastName}`}
            buttonMsg={'Entendido'}
            onClickButton={handleButtonPopUp}
          />

          <Modal
            title={`¿Rechazar la solicitud de ${booking.bookedBy.firstName}?`}
            content="Está acción es permanente y no se puede deshacer"
            icon={<WarningIcon />}
            visible={openModal}
            confirmText="Rechazar"
            onConfirm={handleRejectBooking}
            onReject={() => setOpenModal(false)}
            onCloseModal={() => setOpenModal(false)}
          />

          <Carousel images={booking.bookedCar.images} />

          <CarProfileTemplate
            dates={convertToCompound({
              dateOne: booking.checkin,
              dateTwo: booking.checkout,
            })}
            title={`${booking.bookedCar.maker.name} ${booking.bookedCar.model.name} ${booking.bookedCar.year}`}
            titleDates="Marco de tiempo"
            titleUser="Solicitante"
            username={`${booking.bookedBy.firstName} ${booking.bookedBy.lastName}`}
            userPic={booking.bookedBy.profilePhoto}
            userJoinAt={booking.bookedBy.createdAt}
            showDescription={false}
            showSpecifications={false}
            showFeatures={false}
            showPolicies={false}
            reviews={reviews}
            reviewsDomain="usuario"
          />

          <TwoBottons
            affirmativeText="Aceptar"
            declinedText="Rechazar"
            onSelectAffirmative={handleAcceptBooking}
            onSelectDelcined={() => setOpenModal(true)}
          />
        </>
      )}
    </div>
  );
}
