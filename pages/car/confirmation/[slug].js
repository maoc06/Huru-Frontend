import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import storageAuth from '../../../app/utils/storageAuth';
import useTravelDates from '../../../app/hooks/useTravelDates';

import useApi from '../../../app/hooks/useApi';
import vehicleApi from '../../../app/api/VehicleApi';
import paymentUserApi from '../../../app/api/PaymentUserAPI';
import bookingApi from '../../../app/api/BookingAPI';

import withAuth from '../../../app/HOC/withAuth';

import ActivityIndicator from '../../../app/components/elements/ActivityIndicator/ActivityIndicator';
import StatusIndicator from '../../../app/components/elements/StatusIndicator/StatusIndicator';
import TitlePage from '../../../app/components/elements/TitlePage/TitlePage';
import checkAnimationData from '../../../public/animations/check.json';
import errorAnimationData from '../../../public/animations/error-cone.json';
import AppLayout from '../../../app/components/layouts/AppLayout/AppLayout';
import CarConfirmationTemplate from '../../../app/components/templates/CarConfirmation/CarConfirmationTemplate';

import { diffDays } from '../../../app/utils/formatDates';

const ConfirmationBooking = () => {
  const router = useRouter();
  const travel = useTravelDates();

  const getCar = useApi(vehicleApi.findCar);
  const getDefaultPayment = useApi(paymentUserApi.findDefaultPaymentByUser);
  const postBooking = useApi(bookingApi.createBookingRequest);

  const [car, setCar] = useState({});
  const [user, setUser] = useState({});
  const [dates, setDates] = useState({});
  const [defaultPayment, setDefaultPayment] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [showFail, setShowFail] = useState(false);

  const { slug } = router.query;

  const handleDate = async (uid) => {
    const resCar = await getCar.request(slug);
    const resPayment = await getDefaultPayment.request(uid);

    setCar(resCar.data.data);
    setDefaultPayment(resPayment.data.data[0]);
  };

  const handleCreateBooking = async (booking) => {
    await postBooking.request(booking);
    setShowConfirm(true);

    if (postBooking.error) {
      setShowFail(true);
    }
  };

  const handleButtonPopUpConfirm = () => {
    router.push('/trips');
    setShowConfirm(false);
  };

  const handleButtonPopUpFail = () => {
    setShowFail(false);
  };

  useEffect(() => {
    if (slug) {
      const user = storageAuth.getUser();
      setDates(travel.getDates());
      if (user) {
        setUser(user.info);
        handleDate(user.info.uid);
      }
    }
  }, [slug]);

  return (
    <div>
      <Head>
        <title>Huru | Confirmar y pagar reserva</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ActivityIndicator
        visible={
          getCar.loading || getDefaultPayment.loading || postBooking.loading
        }
      />

      <StatusIndicator
        animationData={checkAnimationData}
        isLoop={false}
        visible={showConfirm}
        title={'Reserva realizada exitosamente'}
        message={
          'Ya se realizo la reserva y el dueño del vehículo fue notificado. Ahora solo debemos esperar a que la solicitud sea respondida.'
        }
        buttonMsg={'Regresar'}
        onClickButton={handleButtonPopUpConfirm}
      />

      <StatusIndicator
        animationData={errorAnimationData}
        visible={showFail}
        title={'No se realizo la reserva'}
        message={`Ocurrio un error inesperado. Por favor revisa la información y vuelve a intentarlo.`}
        buttonMsg={'Regresar'}
        onClickButton={handleButtonPopUpFail}
      />

      <AppLayout withImage={false}>
        <TitlePage>Confirmación</TitlePage>

        {car.constructor === Object && Object.keys(car).length > 0 && (
          <CarConfirmationTemplate
            uid={user.uid}
            carId={slug}
            carName={`${car.maker.name} ${car.model.name} ${car.year}`}
            countDays={diffDays({
              dateOne: dates.raw.start,
              dateTwo: dates.raw.end,
              type: 'SQL',
            })}
            pricePerDay={car.price}
            paymentMethod={defaultPayment}
            onSubmit={handleCreateBooking}
          />
        )}
      </AppLayout>
    </div>
  );
};

export default withAuth(ConfirmationBooking);
