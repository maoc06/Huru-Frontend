import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import useApi from '../../../app/hooks/useApi';
import carApi from '../../../app/api/VehicleApi';
import authStorage from '../../../app/utils/storageAuth';

import { withExtraLabelHosts } from '../../../app/utils/extraLabelText';

import AppLayout from '../../../app/components/layouts/AppLayout/AppLayout';
import TitlePage from '../../../app/components/elements/TitlePage/TitlePage';
import CardHorizontal from '../../../app/components/modules/CardHorizontal/CardHorizontal';
import ActivityIndicator from '../../../app/components/elements/ActivityIndicator/ActivityIndicator';
import AddVehicleCard from '../../../app/components/modules/AddVehicleCard/AddVehicleCard';

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
    console.log(res.data.data);
    setCars(res.data.data);
  };

  return (
    <div>
      <Head>
        <title>Huru | Mis vehículos</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ActivityIndicator visible={getCarsByOwner.loading} />

      <AppLayout withImage={false}>
        <TitlePage>Mis vehículos</TitlePage>

        <AddVehicleCard />

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
              href={`/host/vehicles/details/${encodeURIComponent(carId)}`}
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
