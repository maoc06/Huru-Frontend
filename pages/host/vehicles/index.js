import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import useApi from '../../../app/hooks/useApi';
import carApi from '../../../app/api/VehicleApi';
import authStorage from '../../../app/utils/storageAuth';

import { withExtraLabelHosts } from '../../../app/utils/extraLabelText';

import AppLayout from '../../../app/components/layouts/AppLayout/AppLayout';
import TitlePage from '../../../app/components/elements/TitlePage/TitlePage';
import CardHorizontal from '../../../app/components/elements/CardHorizontal/CardHorizontal';
import ActivityIndicator from '../../../app/components/elements/ActivityIndicator/ActivityIndicator';

export default function HostVehicles() {
  const router = useRouter();
  const getCarsByOwner = useApi(carApi.findByOwner);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) {
      const uuid = user.info.uid;
      handleGetData(uuid);
    } else {
      router.push('/signin');
    }
  }, []);

  const handleGetData = async (uuid) => {
    const res = await getCarsByOwner.request(uuid);
    setCars(res.data.data);
  };

  const goToDetails = (slug) => {
    router.push(`/host/vehicles/details/${encodeURIComponent(slug)}`);
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

      <ActivityIndicator visible={getCarsByOwner.loading} />

      <AppLayout withImage={false}>
        <TitlePage>Mis vehículos</TitlePage>

        {cars.map(({ carId, status, maker, model, year, images: [image] }) => {
          const title = `${maker.name} ${model.name} ${year}`;
          const extraLabel = withExtraLabelHosts({ status });

          return (
            <CardHorizontal
              key={carId}
              title={title}
              imageSrc={image.imagePath}
              showPanelPrice={false}
              showFavoriteIcon={false}
              onSelect={() => goToDetails(carId)}
              withOpacity={extraLabel.show}
              withExtraLabel={extraLabel.show}
              extraLabelText={extraLabel.text}
              extraLabelColor={extraLabel.color}
            />
          );
        })}
      </AppLayout>
    </div>
  );
}
