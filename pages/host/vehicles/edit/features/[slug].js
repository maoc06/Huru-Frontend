import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../../../../app/hooks/useApi';
import carApi from '../../../../../app/api/VehicleApi';
import carBasicsApi from '../../../../../app/api/VehicleBasicsAPI';

import { carFeaturesIcons } from '../../../../../app/utils/enums';
import CardSelectableLayout from '../../../../../app/components/layouts/CardSelectableLayout/CardSelectableLayout';
import AppLayout from '../../../../../app/components/layouts/AppLayout/AppLayout';
import TitlePage from '../../../../../app/components/elements/TitlePage/TitlePage';
import ActivityIndicator from '../../../../../app/components/elements/ActivityIndicator/ActivityIndicator';
import TwoBottons from '../../../../../app/components/modules/TwoBottons/TwoBottons';

const EditCarFeatures = ({}) => {
  const router = useRouter();
  const { slug } = router.query;

  const getCarFeatures = useApi(carApi.findCar);
  const getFeaturesOptions = useApi(carBasicsApi.getFeaturesOptions);
  const updateCarFeatures = useApi(carApi.updateFeatures);

  const [featuresOptions, setFeaturesOptions] = useState([]);
  const [carFeatures, setCarFeatures] = useState({});
  const [updateFeatures, setUpdateFeatures] = useState([]);

  useEffect(() => {
    if (slug) handleGetData();
  }, [slug]);

  const handleGetData = () => {
    handleGetFeaturesOptions();
    handleGetCarFeatures();
  };

  const handleGetFeaturesOptions = async () => {
    const res = await getFeaturesOptions.request();
    setFeaturesOptions(res.data.data);
  };

  const handleGetCarFeatures = async () => {
    const res = await getCarFeatures.request(slug);

    const features = res.data.data.features;
    const values = features.map((feature) => feature.featureId);

    setCarFeatures(values);
  };

  const handleUpdateFeatures = async () => {
    const bulkFeatures = { carId: slug, features: updateFeatures };
    await updateCarFeatures.request(bulkFeatures);

    console.log('Save changes', bulkFeatures);

    if (updateCarFeatures.error) {
      console.log('ERROR UPDATING FEATURES');
    } else {
      handleGoToCarDetails();
    }
  };

  const handleGoToCarDetails = () => {
    router.push(`/host/vehicles/details/${encodeURIComponent(slug)}`);
  };

  return (
    <div>
      <Head>
        <title>Huru | Editar caracteristicas de mi vehículo</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ActivityIndicator
        visible={
          getFeaturesOptions.loading ||
          getCarFeatures.loading ||
          updateCarFeatures.loading
        }
      />

      <AppLayout withImage={false}>
        <TitlePage>Caracteristicas</TitlePage>

        {featuresOptions.constructor === Array &&
          featuresOptions.length > 0 &&
          carFeatures.constructor === Array && (
            <CardSelectableLayout
              list={featuresOptions}
              initialSelected={carFeatures}
              propKey={'featureId'}
              propValue={'name'}
              propSelect={'featureId'}
              onSelect={(selected) => setUpdateFeatures(selected)}
              selectFull={true}
              withIconEnum={true}
              iconEnum={carFeaturesIcons}
            />
          )}

        <TwoBottons
          affirmativeText="Guardar"
          declinedText="Cancelar"
          onSelectAffirmative={handleUpdateFeatures}
          onSelectDelcined={handleGoToCarDetails}
          withBackground={false}
          withPadding={false}
          withMarginTop={true}
        />
      </AppLayout>
    </div>
  );
};

export default EditCarFeatures;
