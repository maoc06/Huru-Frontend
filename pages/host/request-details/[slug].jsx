import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../../app/hooks/useApi';
import bookingApi from '../../../app/api/BookingAPI';
import userApi from '../../../app/api/UserAPI';
import carApi from '../../../app/api/VehicleApi';

import CarProfileTemplate from '../../../app/components/templates/CarProfile/CarProfileTempate';
import ActivityIndicator from '../../../app/components/elements/ActivityIndicator/ActivityIndicator';
import TwoBottons from '../../../app/components/modules/TwoBottons/TwoBottons';
import Carousel from '../../../app/components/elements/Carousel/Carousel';

export default function RequestDetail() {
  const router = useRouter();

  const getBooking = useApi(bookingApi.findBooking);
  const getApplicant = useApi(userApi.findUser);
  const getCarBooking = useApi(carApi.findCar);
  const confirmBooking = useApi(bookingApi.confirmBookingRequest);

  const [applicant, setApplicant] = useState({});
  const [carBooking, setCarBooking] = useState({});

  const { slug } = router.query;

  const handleGetData = async () => {
    const res = await getBooking.request(slug);
    if (res.data.data) {
      const bookingRes = res.data.data;

      const applicantRes = await getApplicant.request(bookingRes.bookingBy);
      const carBookingRes = await getCarBooking.request(bookingRes.bookingCar);

      setApplicant(applicantRes.data.data);
      setCarBooking(carBookingRes.data.data);
    }
  };

  const handleAcceptBooking = () => {
    confirmBooking.request({
      bookingId: slug,
      confirm: 5,
      email: applicant.email,
    });
  };

  const handleRejectBooking = () => {
    confirmBooking.request({
      bookingId: slug,
      confirm: 6,
      email: applicant.email,
    });
  };

  useEffect(() => {
    handleGetData();
  }, []);

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
          getApplicant.loading ||
          getCarBooking.loading ||
          confirmBooking.loading
        }
      />

      <>
        <Carousel images={carBooking.images} />

        <CarProfileTemplate
          title={`${carBooking.name} ${carBooking.model} ${carBooking.year}`}
          titleDates="Marco de tiempo"
          titleUser="Solicitante"
          username={`${applicant.firstName} ${applicant.lastName}`}
          userPic={applicant.profilePhoto}
          userJoinAt={applicant.createdAt}
          showDescription={false}
          showSpecifications={false}
          showFeatures={false}
          showPolicies={false}
        />

        <TwoBottons
          affirmativeText="Aceptar"
          declinedText="Rechazar"
          onSelectAffirmative={handleAcceptBooking}
          onSelectDelcined={handleRejectBooking}
        />
      </>
    </div>
  );
}
