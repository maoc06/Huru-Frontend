import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../app/hooks/useApi';
import userApi from '../../app/api/UserAPI';
import authStorage from '../../app/utils/storageAuth';
import { capitalize } from '../../app/utils/capitalize';

import Carousel from '../../app/components/elements/Carousel/Carousel';
import PriceBottomBar from '../../app/components/modules/PriceBottomBar/PriceBottomBar';
import CarDesktopPanel from '../../app/components/modules/CarDesktopPanel/CarDesktopPanel';
import CarProfileTemplate from '../../app/components/templates/CarProfile/CarProfileTempate';
import ActivityIndicator from '../../app/components/elements/ActivityIndicator/ActivityIndicator';

import { typeTransmissionEnum } from '../../app/utils/enums';
import styles from './car.module.scss';

const ELECTRIC_CAR_ID = 5;
const DISCOUNT_ECO_FRIENDLY = 0.15;

function CarSlug({ car, metaTitle }) {
  const router = useRouter();
  const getUser = useApi(userApi.findUser);

  const [user, setUser] = useState({
    enabled: false,
    message: 'Inicia sesión para continuar con la reserva.',
  });
  const [isEcoCar, setIsEcoCar] = useState(false);
  const [discountPerDay, setDiscountPerDay] = useState(car.price);

  const handleUserData = async (userId) => {
    const resUser = await getUser.request(userId);
    if (resUser.data !== undefined) {
      const { status: carEnabled } = car;
      const { isEmailVerified, isPhoneVerified, status } = resUser.data.data;

      if (carEnabled !== 1) {
        setUser({
          ...user,
          message: 'Este vehículo no se encuentra habilitado.',
        });
      } else if (!isEmailVerified) {
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
      } else if (status === 2) {
        setUser({
          ...user,
          message:
            'Para continuar con la reserva, el equipo de soporte primero debe verificar tu cuenta.',
        });
      } else {
        setUser({
          ...user,
          enabled: true,
        });
      }
    }
  };

  const handlePriceEcoCar = () => {
    const { price } = car;

    const discount = price * DISCOUNT_ECO_FRIENDLY;
    setDiscountPerDay(price - discount);
  };

  const hanldeIsEcoCar = () => {
    const {
      fuel: { fuelId },
    } = car;
    if (fuelId === ELECTRIC_CAR_ID) {
      setIsEcoCar(true);
      handlePriceEcoCar();
    }
  };

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) handleUserData(user.info.uid);
    hanldeIsEcoCar();
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

          <section className={styles.info}>
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

            <CarDesktopPanel
              disableBooking={!user.enabled}
              disabledMessage={user.message}
              pricePerDay={car.price}
              slug={car.carId}
              discountPerDay={discountPerDay}
              withDiscount={isEcoCar}
            />
          </section>

          <section className={styles.bottom}>
            <PriceBottomBar
              disableBooking={!user.enabled}
              disabledMessage={user.message}
              pricePerDay={car.price}
              slug={car.carId}
            />
          </section>
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
