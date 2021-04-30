import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../app/hooks/useApi';
import carApi from '../../app/api/VehicleApi';
import userApi from '../../app/api/UserAPI';
import authStorage from '../../app/utils/storageAuth';

import Carousel from '../../app/components/elements/Carousel/Carousel';
import PriceBottomBar from '../../app/components/modules/PriceBottomBar/PriceBottomBar';
import CarProfileTemplate from '../../app/components/templates/CarProfile/CarProfileTempate';
import ActivityIndicator from '../../app/components/elements/ActivityIndicator/ActivityIndicator';

import { typeTransmissionEnum } from '../../app/utils/enums';

function CarSlug() {
  const router = useRouter();
  const { slug } = router.query;

  const getCar = useApi(carApi.findCar);
  const getUser = useApi(userApi.findUser);

  const [car, setCar] = useState({});
  const [user, setUser] = useState({
    enabled: false,
    message: 'Inicia sesión para continuar con la reserva.',
  });

  const handleGetCarData = async () => {
    const resCar = await getCar.request(slug);
    setCar(resCar.data.data);
  };

  const handleUserData = async (userId) => {
    const resUser = await getUser.request(userId);
    if (resUser.data !== undefined) {
      const { isEmailVerified, isPhoneVerified } = resUser.data.data;

      if (!isEmailVerified) {
        setUser({
          ...user,
          message:
            'Para continuar con la reserva, primero debes verificar tu email.',
        });
      } else if (!isPhoneVerified) {
        setUser({
          ...user,
          message:
            'Para continuar con la reserva, primero debes verificar tu número telefonico.',
        });
      } else if (!isEmailVerified && !isPhoneVerified) {
        setUser({
          ...user,
          message:
            'Para continuar con la reserva, primero debes verificar tu email y número telefonico.',
        });
      } else {
        setUser({
          ...user,
          enabled: true,
        });
      }
    }
  };

  useEffect(() => {
    if (slug) {
      const user = authStorage.getUser();
      if (user) handleUserData(user.info.uid);
      handleGetCarData();
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

      <ActivityIndicator visible={getCar.loading} />

      {car.constructor === Object && Object.keys(car).length > 0 && (
        <>
          <Carousel images={car.images} />

          <CarProfileTemplate
            username={car.userOwner.firstName}
            userPic={car.userOwner.profilePhoto}
            userJoinAt={car.userOwner.createdAt}
            title={`${car.maker.name} ${car.model.name} ${car.year}`}
            description={car.description}
            numSeats={car.model.numOfSeats}
            typeTransmission={typeTransmissionEnum[car.model.transmissionId]}
            typeGas="extra"
            features={car.features}
            reviews={car.reviews}
          />

          <PriceBottomBar
            disableBooking={!user.enabled}
            disabledMessage={user.message}
            pricePerDay={car.price}
            slug={slug}
          />
        </>
      )}
    </div>
  );
}

export default CarSlug;
