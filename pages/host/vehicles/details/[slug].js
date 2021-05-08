import Head from 'next/head';
import { useRouter } from 'next/router';

import { capitalize } from '../../../../app/utils/capitalize';

import AppLayout from '../../../../app/components/layouts/AppLayout/AppLayout';
import CarProfileOwnerTemplate from '../../../../app/components/templates/CarProfileOwner/CarProfileOwnerTemplate';
import CarBookingTermsOwnerTemplate from '../../../../app/components/templates/CarBookingTermsOwner/CarBookingTermsOwnerTemplate';
import ActivityIndicator from '../../../../app/components/elements/ActivityIndicator/ActivityIndicator';
import TabsLayout from '../../../../app/components/layouts/TabsLayout/TabsLayout';
import TitlePage from '../../../../app/components/elements/TitlePage/TitlePage';

function CarOwnerSlug({
  car,
  advanceNoticeOptions,
  minTripOptions,
  maxTripOptions,
  metaTitle,
}) {
  const router = useRouter();

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
        <title>{metaTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ActivityIndicator visible={router.isFallback} />

      <AppLayout withImage={false}>
        {car.constructor === Object && Object.keys(car).length > 0 && (
          <>
            <TitlePage>{`${car.maker.name} ${car.model.name} ${car.year}`}</TitlePage>
            <TabsLayout tabs={tabs} />
          </>
        )}
      </AppLayout>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const resCar = await fetch(`${process.env.BASE_API_URL}/car/${params.slug}`);
  const resAdvance = await fetch(
    `${process.env.BASE_API_URL}/car-basics/advance-notice`
  );
  const resMinTrip = await fetch(
    `${process.env.BASE_API_URL}/car-basics/min-trip`
  );
  const resMaxTrip = await fetch(
    `${process.env.BASE_API_URL}/car-basics/max-trip`
  );

  let car = await resCar.json();
  let advanceNoticeOptions = await resAdvance.json();
  let minTripOptions = await resMinTrip.json();
  let maxTripOptions = await resMaxTrip.json();

  if (car.data) car = car.data;
  if (advanceNoticeOptions.data)
    advanceNoticeOptions = advanceNoticeOptions.data;
  if (minTripOptions.data) minTripOptions = minTripOptions.data;
  if (maxTripOptions.data) maxTripOptions = maxTripOptions.data;

  const {
    maker: { name: carMaker },
    model: { name: carModel },
    year,
  } = car;
  const metaTitle = `${capitalize(carMaker)} ${capitalize(carModel)} ${year}`;

  return {
    props: {
      advanceNoticeOptions,
      car,
      minTripOptions,
      maxTripOptions,
      metaTitle,
    },
  };
}

export default CarOwnerSlug;
