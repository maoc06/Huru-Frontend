import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../app/hooks/useApi';
import userApi from '../../app/api/UserAPI';
import disableDayApi from '../../app/api/DisableDayAPI';
import authStorage from '../../app/utils/storageAuth';
import { capitalize } from '../../app/utils/capitalize';
import { typeTransmissionEnum } from '../../app/utils/enums';
import { constraintsContinueBooking } from '../../app/utils/constraintsContinueBooking';

import styles from './car.module.scss';
import CarImageGrid from '../../app/components/modules/CarImageGrid/CarImageGrid';
import PriceBottomBar from '../../app/components/modules/PriceBottomBar/PriceBottomBar';
import CarDesktopPanel from '../../app/components/modules/CarDesktopPanel/CarDesktopPanel';
import CarProfileTemplate from '../../app/components/templates/CarProfile/CarProfileTempate';
import ActivityIndicator from '../../app/components/elements/ActivityIndicator/ActivityIndicator';
import CarNavBar from '../../app/components/modules/NavBar/CarNavBar';
import carNavStyles from '../../app/components/modules/NavBar/CarNavBar.module.scss';

const ELECTRIC_CAR_ID = 5;
const DISCOUNT_ECO_FRIENDLY = 0.15;

function CarSlug({ car, metaTitle }) {
  // Debug logs for car data
  console.log('🚙 Car Details Page Debug:');
  console.log('- Car object received:', car);
  console.log('- Car features:', car?.features);
  console.log('- Car features length:', car?.features?.length);
  console.log('- Car features type:', typeof car?.features);
  console.log('- Car features is array:', Array.isArray(car?.features));
  
  if (car?.features && car.features.length > 0) {
    console.log('- First car feature:', car.features[0]);
    console.log('- Car feature structure:', Object.keys(car.features[0] || {}));
    car.features.forEach((feature, index) => {
      console.log(`- Car feature ${index + 1}:`, feature);
    });
  }

  const router = useRouter();
  const getUser = useApi(userApi.findUser);
  const getDisableDays = useApi(disableDayApi.findDisabledDays);

  const [user, setUser] = useState({
    enabled: true,
    message: '',
  });
  const [disabledDates, setDisabledDates] = useState([]);
  const [isEcoCar, setIsEcoCar] = useState(false);
  const [discountPerDay, setDiscountPerDay] = useState(0);

  const handleUserData = async (uid) => {
    const resUser = await getUser.request(uid);

    if (resUser?.data?.status === 'success') {
      setUser({
        enabled: resUser.data.data.user.enabled,
        message: resUser.data.data.user.message,
      });
    }
  };

  const handleGetDisableDays = async (carId) => {
    const res = await getDisableDays.request(carId);

    if (res?.data?.status === 'success') {
      setDisabledDates(res.data.data);
    }
  };

  const handleViewAllPhotos = () => {
    // Handle photo gallery modal
    console.log('View all photos clicked');
  };

  const hanldeIsEcoCar = () => {
    const isEco = car?.fuel?.name === 'Eléctrico';

    if (isEco) {
      setIsEcoCar(true);
      setDiscountPerDay(car.price * DISCOUNT_ECO_FRIENDLY);
    }
  };

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) handleUserData(user.info.uid);

    hanldeIsEcoCar();
    handleGetDisableDays(car.carId);
  }, []);

  console.log('🎯 About to render CarProfileTemplate with features:', car?.features || []);

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

      <CarNavBar />

      <ActivityIndicator visible={router.isFallback} />

      {!router.isFallback && car && car.constructor === Object && Object.keys(car).length > 0 && (
        <div className={carNavStyles.carPageContent}>
          <div className={styles.imageContainer}>
            <CarImageGrid 
              images={car.images || []} 
              onViewAllPhotos={handleViewAllPhotos}
            />
          </div>

          <section className={styles.info}>
            <CarProfileTemplate
              carId={car.carId}
              userId={car.userOwner?.uuid}
              username={car.userOwner?.firstName}
              userPic={car.userOwner?.profilePhoto}
              userJoinAt={car.userOwner?.createdAt}
              title={`${car.maker?.name} ${car.model?.name} ${car.year}`}
              description={car.description}
              disabledDates={disabledDates}
              numSeats={car.model?.numOfSeats}
              typeTransmission={typeTransmissionEnum[car.model?.transmissionId]}
              typeGas={car.fuel?.name}
              features={car.features || []}
              reviews={car.reviews || []}
            />

            <CarDesktopPanel
              disableBooking={!user.enabled}
              disabledMessage={user.message}
              pricePerDay={car.price}
              slug={car.carId}
              discountPerDay={discountPerDay}
              withDiscount={isEcoCar}
              disabledDates={disabledDates}
            />
          </section>

          <PriceBottomBar
            disableBooking={!user.enabled}
            disabledMessage={user.message}
            pricePerDay={car.price}
            slug={car.carId}
            withDiscount={isEcoCar}
            discountPerDay={discountPerDay}
          />
        </div>
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
