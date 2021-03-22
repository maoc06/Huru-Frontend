import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../app/hooks/useApi';
import carApi from '../../app/api/VehicleApi';

import AppLayout from '../../app/components/layouts/AppLayout/AppLayout';
import Carousel from '../../app/components/elements/Carousel/Carousel';
import PriceBottomBar from '../../app/components/modules/PriceBottomBar/PriceBottomBar';
import CarProfileTemplate from '../../app/components/templates/CarProfile/CarProfileTempate';

import ActivityIndicator from '../../app/components/elements/ActivityIndicator/ActivityIndicator';

import { typeTransmissionEnum } from '../../app/utils/enums';

function CarSlug() {
  const router = useRouter();
  const getCar = useApi(carApi.findCar);
  const [car, setCar] = useState({});
  const { slug } = router.query;

  const handleGetCar = async () => {
    const res = await getCar.request(slug);
    console.log('Enum Transmission:', typeTransmissionEnum[1]);
    setCar(res.data.data);
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

      {!getCar.loading && (
        <>
          <Carousel images={car.images} />
          <AppLayout withImage={false} isFullHeigh={false}>
            <CarProfileTemplate
              title={`${car.name} ${car.model} ${car.year}`}
              description={car.description}
              numSeats={car.number_of_seats}
              typeTransmission={typeTransmissionEnum[car.transmission_id]}
              typeGas="extra"
            />
          </AppLayout>
          <PriceBottomBar pricePerDay={car.price} total={150000} />
        </>
      )}
    </div>
  );
}

export default CarSlug;
