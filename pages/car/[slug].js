import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../app/hooks/useApi';
import carApi from '../../app/api/VehicleApi';

import Carousel from '../../app/components/elements/Carousel/Carousel';
import PriceBottomBar from '../../app/components/modules/PriceBottomBar/PriceBottomBar';
import CarProfileTemplate from '../../app/components/templates/CarProfile/CarProfileTempate';
import ActivityIndicator from '../../app/components/elements/ActivityIndicator/ActivityIndicator';

import { typeTransmissionEnum } from '../../app/utils/enums';

function CarSlug() {
  const router = useRouter();
  const { slug } = router.query;

  const getCar = useApi(carApi.findCar);

  const [car, setCar] = useState({});

  const handleGetData = async () => {
    const resCar = await getCar.request(slug);
    setCar(resCar.data.data);
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

          <PriceBottomBar pricePerDay={car.price} slug={slug} />
        </>
      )}
    </div>
  );
}

export default CarSlug;
