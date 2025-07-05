import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

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

// Modern Icons
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4c.55 0 1 .45 1 1v6h6c.55 0 1 .45 1 1s-.45 1-1 1h-6v6c0 .55-.45 1-1 1s-1-.45-1-1v-6H5c-.55 0-1-.45-1-1s.45-1 1-1h6V5c0-.55.45-1 1-1z"/>
  </svg>
);

const CarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
  </svg>
);

export default function HostVehicles() {
  const router = useRouter();
  const getCarsByOwner = useApi(carApi.findByOwner);
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) {
      const uuid = user.info.uid;
      handleGetData(uuid);
    } else {
      router.push('/signin');
    }
  }, []);

  // Refresh data when user returns to the page (e.g., after adding a vehicle)
  useEffect(() => {
    const handleRouteChange = () => {
      const user = authStorage.getUser();
      if (user) {
        const uuid = user.info.uid;
        handleGetData(uuid);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  const handleGetData = async (uuid) => {
    try {
      setIsLoading(true);
      const res = await getCarsByOwner.request(uuid);
      setCars(res.data.data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      setCars([]);
    } finally {
      setIsLoading(false);
    }
  };



  const renderEmptyState = () => (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>
        <CarIcon />
      </div>
      <h3 className={styles.emptyTitle}>No tienes vehículos registrados</h3>
      <p className={styles.emptyDescription}>
        Agrega tu primer vehículo para comenzar a generar ingresos extra
      </p>
    </div>
  );

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

      <ActivityIndicator visible={getCarsByOwner.loading || isLoading} />

      <div className={carNavStyles.carPageContent}>
        <TitlePage align="left">Mis vehículos</TitlePage>

        {/* Mobile Header with count only */}
        <div className={styles.mobileHeader}>
          <span className={styles.vehicleCount}>
            {cars.length} {cars.length === 1 ? 'vehículo' : 'vehículos'}
          </span>
        </div>

        <div className={styles.vehiclesContainer}>
          <section className={styles.vehicles}>
            {/* Add Vehicle Card - Always visible */}
            <div className={styles.addVehicleCard}>
              <AddVehicleCard />
            </div>

            {/* Vehicle Cards or Empty State */}
            {!isLoading && cars.length === 0 ? (
              renderEmptyState()
            ) : (
              cars.map((car, index) => {
                const { carId, status, maker, model, year } = car;
                const title = `${maker.name} ${model.name} ${year}`;
                const extraLabel = withExtraLabelHosts({ status });
                const imageSrc =
                  car.images.length === 0
                    ? '/images/default-car.png'
                    : car.images[0].imagePath;

                return (
                  <div key={carId} className={styles.vehicleCard}>
                    <CardHorizontal
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
                  </div>
                );
              })
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
