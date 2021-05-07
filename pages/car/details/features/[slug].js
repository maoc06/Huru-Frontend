import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../../../app/hooks/useApi';
import carApi from '../../../../app/api/VehicleApi';

import { carFeaturesIcons } from '../../../../app/utils/enums';

import AppLayout from '../../../../app/components/layouts/AppLayout/AppLayout';
import TitlePage from '../../../../app/components/elements/TitlePage/TitlePage';
import ActivityIndicator from '../../../../app/components/elements/ActivityIndicator/ActivityIndicator';
import CardSelectableLayout from '../../../../app/components/layouts/CardSelectableLayout/CardSelectableLayout';

function CarDetailsFeatures() {
  const router = useRouter();
  const { slug } = router.query;

  const getFeatures = useApi(carApi.findFeatures);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    if (slug) handleGetData(slug);
  }, [slug]);

  const handleGetData = async (carId) => {
    const res = await getFeatures.request(carId);
    setFeatures(res.data.data);
  };

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

      <ActivityIndicator visible={getFeatures.loading} />

      <AppLayout withImage={false}>
        <TitlePage>Caracteristicas</TitlePage>

        {features.constructor === Array && Object.keys(features).length > 0 && (
          <CardSelectableLayout
            list={features}
            propKey={'featureId'}
            propValue={'feature'}
            propValueNested={'name'}
            propSelect={'featureId'}
            onSelect={() => {}}
            withIconEnum={true}
            iconEnum={carFeaturesIcons}
            valueNested={true}
            selectables={false}
            isAllActives={true}
            cardSizes="large"
          />
        )}
      </AppLayout>
    </div>
  );
}

export default CarDetailsFeatures;
