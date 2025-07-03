import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import storageAuth from '../../../app/utils/storageAuth';
import useTravelDates from '../../../app/hooks/useTravelDates';

import useApi from '../../../app/hooks/useApi';
import vehicleApi from '../../../app/api/VehicleApi';
import paymentUserApi from '../../../app/api/PaymentUserAPI';
import bookingApi from '../../../app/api/BookingAPI';
import vehicleBasicsApi from '../../../app/api/VehicleBasicsAPI';
import vehicleReviewApi from '../../../app/api/VehicleReviewAPI';

import withAuth from '../../../app/HOC/withAuth';

import ActivityIndicator from '../../../app/components/elements/ActivityIndicator/ActivityIndicator';
import StatusIndicator from '../../../app/components/elements/StatusIndicator/StatusIndicator';
import TitlePage from '../../../app/components/elements/TitlePage/TitlePage';
import checkAnimationData from '../../../public/animations/check.json';
import errorAnimationData from '../../../public/animations/error-cone.json';
import AppLayout from '../../../app/components/layouts/AppLayout/AppLayout';
import CarConfirmationTemplate from '../../../app/components/templates/CarConfirmation/CarConfirmationTemplate';
import ProfileNavBar from '../../../app/components/modules/NavBar/ProfileNavBar';

import { diffDays } from '../../../app/utils/formatDates';

const ConfirmationBooking = () => {
  const router = useRouter();
  const travel = useTravelDates();

  const getCar = useApi(vehicleApi.findCar);
  const getDefaultPayment = useApi(paymentUserApi.findDefaultPaymentByUser);
  const postBooking = useApi(bookingApi.createBookingRequest);
  const getTransmissions = useApi(vehicleBasicsApi.getTransmissions);
  const getCountTrips = useApi(bookingApi.countCompletedTrips);
  const getAllReviews = useApi(vehicleReviewApi.getAllReviewsByUser);

  const [car, setCar] = useState({});
  const [user, setUser] = useState({});
  const [dates, setDates] = useState({});
  const [datesType, setDatesType] = useState('SQL');
  const [defaultPayment, setDefaultPayment] = useState({});
  const [transmissionData, setTransmissionData] = useState(null);
  const [ownerRating, setOwnerRating] = useState(0);
  const [ownerReviewCount, setOwnerReviewCount] = useState(0);
  const [ownerTripCount, setOwnerTripCount] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showFail, setShowFail] = useState(false);

  const { slug } = router.query;

  // Fetch owner rating and trip count
  const handleGetOwnerData = async (ownerUuid) => {
    console.log('🔄 Fetching owner data for UUID:', ownerUuid);
    
    try {
      // Get completed trips count
      const tripsRes = await getCountTrips.request(ownerUuid);
      console.log('✅ Owner Trips API Response:', tripsRes);
      if (tripsRes && tripsRes.data) {
        setOwnerTripCount(tripsRes.data.count);
      }

      // Get owner reviews for rating calculation
      const reviewsRes = await getAllReviews.request(ownerUuid);
      console.log('⭐ Owner Reviews API Response:', reviewsRes);
      if (reviewsRes && reviewsRes.data && reviewsRes.data.data) {
        const reviews = reviewsRes.data.data;
        setOwnerReviewCount(reviews.length);
        
        if (reviews.length > 0) {
          const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
          const avgRating = totalRating / reviews.length;
          setOwnerRating(parseFloat(avgRating.toFixed(1)));
          console.log('📊 Owner Calculated Rating:', {
            reviewCount: reviews.length,
            averageRating: avgRating,
            reviews
          });
        }
      }
    } catch (error) {
      console.error('❌ Error fetching owner data:', error);
    }
  };

  const handleDate = async (uid) => {
    const resCar = await getCar.request(slug);
    const resPayment = await getDefaultPayment.request(uid);
    const resTransmissions = await getTransmissions.request();

    // Debug logs for car data
    console.log('🚗 Full Car API Response:', resCar);
    console.log('🚗 Car Data:', resCar.data.data);
    console.log('🔧 Transmissions API Response:', resTransmissions);
    
    const carData = resCar.data.data;
    
    // Debug specific car properties
    console.log('🏙️ City Data:', carData.city);
    console.log('👤 User Owner (Correct) Data:', carData.userOwner);
    console.log('👤 Created By (Should be empty) Data:', carData.createdBy);
    console.log('🖼️ Images Data:', carData.images);
    console.log('📍 Address Data:', carData.address);
    console.log('🚙 Model Data:', carData.model);
    if (carData.model) {
      console.log('🚙 Model Name:', carData.model.name);
      console.log('🚙 Model Seats:', carData.model.numOfSeats);
      console.log('🔧 Model Transmission ID:', carData.model.transmissionId);
    }
    console.log('🔧 Direct Transmission Data (should be empty):', carData.transmission);
    console.log('⛽ Fuel Data:', carData.fuel);
    console.log('💺 Seats Data:', carData.seats);
    console.log('🏭 Maker Data:', carData.maker);
    console.log('🚙 Model Data:', carData.model);
    console.log('📅 Year Data:', carData.year);
    console.log('💰 Price Data:', carData.price);
    
    // Debug nested properties that caused errors
    if (carData.city) {
      console.log('🏙️ City Name:', carData.city.name);
      console.log('🏛️ City State:', carData.city.state);
      if (carData.city.state) {
        console.log('🏛️ State Name:', carData.city.state.name);
      } else {
        console.log('⚠️ State data is missing or undefined');
      }
    } else {
      console.log('⚠️ City data is missing or undefined');
    }
    
    if (carData.userOwner) {
      console.log('👤 Owner First Name:', carData.userOwner.firstName);
      console.log('👤 Owner Last Name:', carData.userOwner.lastName);
      console.log('📷 Owner Profile Photo:', carData.userOwner.profilePhoto);
      console.log('📅 Owner Created At:', carData.userOwner.createdAt);
      console.log('🆔 Owner UUID:', carData.userOwner.uuid);
      console.log('⭐ Owner Average Rating:', carData.userOwner.averageRating);
      console.log('📝 Owner Review Count:', carData.userOwner.reviewCount);
      console.log('🛣️ Owner Trip Count:', carData.userOwner.tripCount);
    } else {
      console.log('⚠️ UserOwner data is missing or undefined');
    }

    // Find transmission data by ID
    let foundTransmission = null;
    if (resTransmissions && resTransmissions.data && carData.model && carData.model.transmissionId) {
      const transmissions = resTransmissions.data.data || resTransmissions.data;
      foundTransmission = transmissions.find(t => t.transmissionId === carData.model.transmissionId);
      console.log('🔧 Found Transmission:', foundTransmission);
      console.log('🔧 Looking for transmission ID:', carData.model.transmissionId);
      console.log('🔧 Available transmissions:', transmissions);
    }

    // Fetch owner rating and trip data
    if (carData.userOwner && carData.userOwner.uuid) {
      await handleGetOwnerData(carData.userOwner.uuid);
    }

    setCar(carData);
    setDefaultPayment(resPayment.data.data[0]);
    setTransmissionData(foundTransmission);
    
    // Debug payment data
    console.log('💳 Payment API Response:', resPayment);
    console.log('💳 Default Payment:', resPayment.data.data[0]);
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

  const setParamDates = () => {
    const dates = travel.getDates();
    if (dates.raw.start.includes('T')) setDatesType('ISO');
    setDates(dates);
  };

  useEffect(() => {
    if (slug) {
      const user = storageAuth.getUser();
      setParamDates();
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
          getCar.loading || getDefaultPayment.loading || postBooking.loading || 
          getTransmissions.loading || getCountTrips.loading || getAllReviews.loading
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
        <ProfileNavBar />
        <TitlePage>Confirmación</TitlePage>

        {car.constructor === Object && Object.keys(car).length > 0 && (
          <>
            {/* Debug logs for template props */}
            {console.log('🎯 Template Debug - Car object at render time:', car)}
            {console.log('🎯 Template Debug - Car images:', car.images)}
            {console.log('🎯 Template Debug - Car specs being passed:', {
              transmission: transmissionData ? transmissionData.name : 'MISSING',
              fuel: car.fuel ? car.fuel.name : 'MISSING',
            })}
            {console.log('🎯 Template Debug - Car owner data structure:', {
              firstName: car.userOwner ? car.userOwner.firstName : 'MISSING',
              lastName: car.userOwner ? car.userOwner.lastName : 'MISSING',
              profilePhoto: car.userOwner ? car.userOwner.profilePhoto : 'MISSING',
              createdAt: car.userOwner ? car.userOwner.createdAt : 'MISSING',
              uuid: car.userOwner ? car.userOwner.uuid : 'MISSING',
              averageRating: ownerRating,
              reviewCount: ownerReviewCount,
              tripCount: ownerTripCount,
            })}
            {console.log('🎯 Template Debug - Location data structure:', {
              hasCity: !!car.city,
              cityName: car.city ? car.city.name : 'MISSING',
              finalLocation: car.city && car.city.name ? 
                car.city.name : 
                'Ubicación no especificada'
            })}
            <CarConfirmationTemplate
            uid={user.uid}
            carId={slug}
            carName={`${car.maker.name} ${car.model.name} ${car.year}`}
            countDays={diffDays({
              dateOne: dates.raw.start,
              dateTwo: dates.raw.end,
              type: datesType,
            })}
            pricePerDay={car.price}
            paymentMethod={defaultPayment}
            isEcoCar={car.fuel.fuelId === 5}
            carImages={car.images || []}
            carSpecs={{
              transmission: transmissionData ? transmissionData.name : 'No especificada',
              fuel: car.fuel ? car.fuel.name : null,
            }}
            carOwner={{
              firstName: car.userOwner ? car.userOwner.firstName : '',
              lastName: car.userOwner ? car.userOwner.lastName : '',
              profilePhoto: car.userOwner ? car.userOwner.profilePhoto : '',
              createdAt: car.userOwner ? car.userOwner.createdAt : null,
              averageRating: ownerRating,
              reviewCount: ownerReviewCount,
              tripCount: ownerTripCount,
            }}
            carLocation={car.city && car.city.name ? 
              car.city.name : 
              'Ubicación no especificada'
            }
            onSubmit={handleCreateBooking}
          />
          </>
        )}
      </AppLayout>
    </div>
  );
};

export default withAuth(ConfirmationBooking);
