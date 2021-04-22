import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../../../app/hooks/useApi';
import carApi from '../../../../app/api/VehicleApi';
import carBasicsApi from '../../../../app/api/VehicleBasicsAPI';

import AppLayout from '../../../../app/components/layouts/AppLayout/AppLayout';
import CarProfileOwnerTemplate from '../../../../app/components/templates/CarProfileOwner/CarProfileOwnerTemplate';
import CarBookingTermsOwnerTemplate from '../../../../app/components/templates/CarBookingTermsOwner/CarBookingTermsOwnerTemplate';
import ActivityIndicator from '../../../../app/components/elements/ActivityIndicator/ActivityIndicator';
import TabsLayout from '../../../../app/components/layouts/TabsLayout/TabsLayout';

function CarOwnerSlug() {
  const router = useRouter();
  const { slug } = router.query;

  const getCar = useApi(carApi.findCar);
  const getAdvanceNoticesOptions = useApi(carBasicsApi.getAdvanceNotices);
  const getMinTripOptions = useApi(carBasicsApi.getMinTrip);
  const getMaxTripOptions = useApi(carBasicsApi.getMaxTrip);

  const [car, setCar] = useState({});
  const [advanceNoticeOptions, setAdvanceNoticeOptions] = useState({});
  const [minTripOptions, setMinTripOptions] = useState({});
  const [maxTripOptions, setMaxTripOptions] = useState({});

  useEffect(() => {
    if (slug) {
      handleGetData();
    }
  }, [slug]);

  const handleGetData = () => {
    handleGetCar();
    handleAdvanceNoticeOptions();
    handleMinTripOptions();
    handleMaxTripOptions();
  };

  const handleGetCar = async () => {
    const res = await getCar.request(slug);
    setCar(res.data.data);
  };

  const handleAdvanceNoticeOptions = async () => {
    const res = await getAdvanceNoticesOptions.request();
    setAdvanceNoticeOptions(res.data.data);
  };

  const handleMinTripOptions = async () => {
    const res = await getMinTripOptions.request();
    setMinTripOptions(res.data.data);
  };

  const handleMaxTripOptions = async () => {
    const res = await getMaxTripOptions.request();
    setMaxTripOptions(res.data.data);
  };

  const renderVehicleTemplate = () => {
    const { carId, maker, model, year, description, images, features } = car;

    return (
      car.constructor === Object &&
      Object.keys(car).length > 0 && (
        <CarProfileOwnerTemplate
          carId={carId}
          title={`${maker.name || ''} ${model.name || ''} ${year || ''}`}
          description={description}
          images={images}
          features={features}
        />
      )
    );
  };

  const renderBookingTermsTemplate = () => {
    const { carId, advanceNotice, maxTrip, minTrip, price } = car;

    const bookingTerms = {
      advanceNotice,
      maxTrip,
      minTrip,
      price,
    };

    return (
      <CarBookingTermsOwnerTemplate
        carId={carId}
        advanceNoticeOptions={advanceNoticeOptions}
        bookingTerms={bookingTerms}
        maxTripOptions={maxTripOptions}
        minTripOptions={minTripOptions}
      />
    );
  };

  const tabs = [
    {
      title: 'Vehículo',
      component: renderVehicleTemplate(),
    },
    {
      title: 'Configuración',
      component: renderBookingTermsTemplate(),
    },
  ];

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

      <AppLayout withImage={false}>
        {car.constructor === Object && Object.keys(car).length > 0 && (
          <h4>{`${car.maker.name} ${car.model.name} ${car.year}`}</h4>
        )}

        <TabsLayout tabs={tabs} />
      </AppLayout>
    </div>
  );
}

export default CarOwnerSlug;
