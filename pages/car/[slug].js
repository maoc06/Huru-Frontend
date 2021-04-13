import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../app/hooks/useApi';
import carApi from '../../app/api/VehicleApi';
import userApi from '../../app/api/UserAPI';

import Carousel from '../../app/components/elements/Carousel/Carousel';
import PriceBottomBar from '../../app/components/modules/PriceBottomBar/PriceBottomBar';
import CarProfileTemplate from '../../app/components/templates/CarProfile/CarProfileTempate';

import ActivityIndicator from '../../app/components/elements/ActivityIndicator/ActivityIndicator';

import { typeTransmissionEnum } from '../../app/utils/enums';

function CarSlug() {
  const router = useRouter();

  const getCar = useApi(carApi.findCar);
  const getOwner = useApi(userApi.findUser);

  const [car, setCar] = useState({});
  const [owner, setOwner] = useState({});

  const { slug } = router.query;

  const handleGetCar = async () => {
    const resCar = await getCar.request(slug);
    const resUser = await getOwner.request(resCar.data.data.user_id);

    setCar(resCar.data.data);
    setOwner(resUser.data.data);
  };

  useEffect(() => {
    handleGetCar();
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

      <ActivityIndicator visible={getCar.loading} />

      {!getCar.loading && !getOwner.loading && (
        <>
          <Carousel images={car.images} />

          <CarProfileTemplate
            username={`${owner.firstName} ${owner.lastName}`}
            userPic={owner.profilePhoto}
            userJoinAt={owner.createdAt}
            title={`${car.name} ${car.model} ${car.year}`}
            description={car.description}
            numSeats={car.number_of_seats}
            typeTransmission={typeTransmissionEnum[car.transmission_id]}
            typeGas="extra"
            features={car.features}
          />

          <PriceBottomBar pricePerDay={car.price} total={150000} slug={slug} />
        </>
      )}
    </div>
  );
}

export default CarSlug;
