import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../../app/hooks/useApi';
import bookingApi from '../../../app/api/BookingAPI';

import CarNavBar from '../../../app/components/modules/NavBar/CarNavBar';
import TwoBottons from '../../../app/components/modules/TwoBottons/TwoBottons';
import Modal from '../../../app/components/modules/Modal/Modal';
import ActivityIndicator from '../../../app/components/elements/ActivityIndicator/ActivityIndicator';
import CarImageGrid from '../../../app/components/modules/CarImageGrid/CarImageGrid';
import StatusIndicator from '../../../app/components/elements/StatusIndicator/StatusIndicator';
import BookingDetails from '../../../app/components/modules/BookingDetails/BookingDetails';
import checkAnimationData from '../../../public/animations/check.json';
import { WarningIcon } from '../../../app/components/elements/Icons/Shared';

import styles from '../../../app/components/modules/NavBar/CarNavBar.module.scss';

import {
  formatPrettyFull,
} from '../../../app/utils/formatDates';

export default function RequestDetail() {
  const router = useRouter();

  const getBooking = useApi(bookingApi.findBooking);
  const confirmBooking = useApi(bookingApi.confirmBookingRequest);

  const [booking, setBooking] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openStatusIndicator, setOpenStatusIndicator] = useState(false);

  const { slug } = router.query;

  const handleGetBooking = async () => {
    const res = await getBooking.request(slug);
    const booking = res.data.data;

    setBooking(booking);

    return booking;
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
      handleGetBooking();
    }
  }, [slug]);

  return (
    <div>
      <Head>
        <title>Huru | Detalles de solicitud de reserva</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      {/* Responsive Navigation Bar */}
      <CarNavBar />

      <ActivityIndicator
        visible={getBooking.loading || confirmBooking.loading}
      />

      {booking.constructor === Object && Object.keys(booking).length > 0 && (
        <>
          <StatusIndicator
            animationData={checkAnimationData}
            isLoop={false}
            visible={openStatusIndicator}
            title={'Reserva aceptada'}
            message={`Preparate para recibir a ${booking.bookedBy.firstName} ${
              booking.bookedBy.lastName
            } el ${formatPrettyFull({
              date: booking.checkin,
            })} hasta el ${formatPrettyFull({
              date: booking.checkout,
            })}.`}
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

          {/* Main Content with proper spacing for navbar */}
          <div className={styles.carPageContent} style={{
            backgroundColor: '#F6FFFC',
            minHeight: 'calc(100vh - 80px)',
            paddingBottom: '2rem'
          }}>
            <div style={{
              padding: '1rem',
              backgroundColor: '#F6FFFC',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              <CarImageGrid 
                images={booking.bookedCar.images} 
                onViewAllPhotos={(images) => console.log('📸 Request Details - View all photos clicked:', images.length, 'images')}
              />
            </div>

            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 1rem',
              paddingBottom: '80px' // Reduced space for smaller button container
            }}>
              {/* Comprehensive Booking Details */}
              <BookingDetails booking={booking} />
            </div>

            {/* Action Buttons Fixed at Bottom of Page */}
            <div style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              backgroundColor: '#F6FFFC',
              borderTop: '1px solid #E0E0E0',
              padding: '12px 0',
              zIndex: 1000,
              boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 20px'
              }}>
                <TwoBottons
                  affirmativeText="Aceptar"
                  declinedText="Rechazar"
                  onSelectAffirmative={handleAcceptBooking}
                  onSelectDelcined={() => setOpenModal(true)}
                  withPadding={false}
                  withBackground={false}
                  withMarginTop={false}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
