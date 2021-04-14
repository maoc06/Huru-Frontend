import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../app/hooks/useApi';
import carApi from '../../app/api/VehicleApi';
import carReviewApi from '../../app/api/VehicleReviewAPI';
import userApi from '../../app/api/UserAPI';

import Carousel from '../../app/components/elements/Carousel/Carousel';
import PriceBottomBar from '../../app/components/modules/PriceBottomBar/PriceBottomBar';
import CarProfileTemplate from '../../app/components/templates/CarProfile/CarProfileTempate';
import ActivityIndicator from '../../app/components/elements/ActivityIndicator/ActivityIndicator';

import { typeTransmissionEnum } from '../../app/utils/enums';

function CarSlug() {
  const router = useRouter();
  const { slug } = router.query;

  const getCar = useApi(carApi.findCar);
  const getReviews = useApi(carReviewApi.getReviews);
  const getOwner = useApi(userApi.findUser);

  const [car, setCar] = useState({});
  const [reviews, setReviews] = useState([]);
  const [owner, setOwner] = useState({});

  const handleGetData = async () => {
    const resCar = await getCar.request(slug);
    const reviews = await getReviews.request(resCar.data.data.car_id);
    const resUser = await getOwner.request(resCar.data.data.user_id);

    setCar(resCar.data.data);
    setReviews(reviews.data.data);
    setOwner(resUser.data.data);
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

      {!getCar.loading && !getReviews.loading && !getOwner.loading && (
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
            reviews={reviews}
          />

          <PriceBottomBar pricePerDay={car.price} slug={slug} />
        </>
      )}
    </div>
  );
}

export default CarSlug;
