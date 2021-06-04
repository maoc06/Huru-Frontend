import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../app/hooks/useApi';
import userApi from '../../app/api/UserAPI';
import authStorage from '../../app/utils/storageAuth';
import { capitalize } from '../../app/utils/capitalize';

import Carousel from '../../app/components/elements/Carousel/Carousel';
import PriceBottomBar from '../../app/components/modules/PriceBottomBar/PriceBottomBar';
import CarProfileTemplate from '../../app/components/templates/CarProfile/CarProfileTempate';
import ActivityIndicator from '../../app/components/elements/ActivityIndicator/ActivityIndicator';

import { typeTransmissionEnum } from '../../app/utils/enums';

function CarSlug({ car, metaTitle }) {
  const router = useRouter();
  const getUser = useApi(userApi.findUser);

  const [user, setUser] = useState({
    enabled: false,
    message: 'Inicia sesión para continuar con la reserva.',
  });

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
    const user = authStorage.getUser();
    if (user) handleUserData(user.info.uid);
  }, []);

  return (
    <div>
      <Head>
        <title>{metaTitle} | Huru</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ActivityIndicator visible={router.isFallback} />

      {car.constructor === Object && Object.keys(car).length > 0 && (
        <>
          <Carousel images={car.images} />

          <CarProfileTemplate
            carId={car.carId}
            userId={car.userOwner.uuid}
            username={car.userOwner.firstName}
            userPic={car.userOwner.profilePhoto}
            userJoinAt={car.userOwner.createdAt}
            title={`${car.maker.name} ${car.model.name} ${car.year}`}
            description={car.description}
            numSeats={car.model.numOfSeats}
            typeTransmission={typeTransmissionEnum[car.model.transmissionId]}
            typeGas={car.fuel.name}
            features={car.features}
            reviews={car.reviews}
          />

          <PriceBottomBar
            disableBooking={!user.enabled}
            disabledMessage={user.message}
            pricePerDay={car.price}
            slug={car.carId}
          />
        </>
      )}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`${process.env.BASE_API_URL}/car/${params.slug}`);
  let car = await res.json();

  if (car.data) car = car.data;

  const {
    maker: { name: carMaker },
    model: { name: carModel },
    year,
    city: { name: location },
  } = car;
  const metaTitle = `${capitalize(carMaker)} ${capitalize(
    carModel
  )} ${year} en ${capitalize(location)}`;

  return {
    props: {
      car,
      metaTitle,
    },
  };
}

export default CarSlug;
