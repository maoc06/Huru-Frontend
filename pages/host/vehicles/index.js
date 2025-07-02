import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import useApi from '../../../app/hooks/useApi';
import carApi from '../../../app/api/VehicleApi';
import authStorage from '../../../app/utils/storageAuth';

import { withExtraLabelHosts } from '../../../app/utils/extraLabelText';

import CarNavBar from '../../../app/components/modules/NavBar/CarNavBar';
import carNavStyles from '../../../app/components/modules/NavBar/CarNavBar.module.scss';
import TitlePage from '../../../app/components/elements/TitlePage/TitlePage';
import CardHorizontal from '../../../app/components/modules/CardHorizontal/CardHorizontal';
import ActivityIndicator from '../../../app/components/elements/ActivityIndicator/ActivityIndicator';
import AddVehicleCard from '../../../app/components/modules/AddVehicleCard/AddVehicleCard';
import styles from './Vehicles.module.scss';

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

      <CarNavBar />

      <ActivityIndicator visible={getCarsByOwner.loading} />

      <div className={carNavStyles.carPageContent}>
        <TitlePage align="left">Mis vehículos</TitlePage>

        <section className={styles.vehicles}>
          <AddVehicleCard />

          {cars.map((car) => {
            const { carId, status, maker, model, year } = car;
            const title = `${maker.name} ${model.name} ${year}`;
            const extraLabel = withExtraLabelHosts({ status });
            const imageSrc =
              car.images.length === 0
                ? '/images/default-car.png'
                : car.images[0].imagePath;

            return (
              <CardHorizontal
                key={carId}
                title={title}
                imageSrc={imageSrc}
                showPanelPrice={false}
                showFavoriteIcon={false}
                href={`/host/vehicles/details/${encodeURIComponent(carId)}`}
                withOpacity={extraLabel.show}
                withExtraLabel={extraLabel.show}
                extraLabelText={extraLabel.text}
                extraLabelColor={extraLabel.color}
                forceRowDirection={false}
              />
            );
          })}
        </section>
      </div>
    </div>
  );
}
