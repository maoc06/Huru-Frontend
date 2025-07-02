import Head from 'next/head';
import { useEffect, useState } from 'react';

import useApi from '../../app/hooks/useApi';
import bookingApi from '../../app/api/BookingAPI';
import authStorage from '../../app/utils/storageAuth';
import withAuth from '../../app/HOC/withAuth';

import CarNavBar from '../../app/components/modules/NavBar/CarNavBar';
import carNavStyles from '../../app/components/modules/NavBar/CarNavBar.module.scss';
import TabsLayout from '../../app/components/layouts/TabsLayout/TabsLayout';
import TripsTemplate from '../../app/components/templates/Trips/TripsTemplate';
import TitlePage from '../../app/components/elements/TitlePage/TitlePage';
import ActivityIndicator from '../../app/components/elements/ActivityIndicator/ActivityIndicator';
import styles from './Trips.module.scss';

const Trips = () => {
  const getUpcomingBookings = useApi(bookingApi.findUpcomingBookings);
  const getBookingsHistory = useApi(bookingApi.findBookingsHistory);

  const [upcomingBooking, setUpcomingBookings] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) {
      const uuid = user.info.uid;
      handleUpcomingBookings(uuid);
      handleBookingsHistory(uuid);
    }
  }, []);

  const handleUpcomingBookings = async (uuid) => {
    const res = await getUpcomingBookings.request(uuid);
    if (res?.data) {
      setUpcomingBookings(res.data.data);
    }
  };

  const handleBookingsHistory = async (uuid) => {
    const res = await getBookingsHistory.request(uuid);
    if (res?.data) {
      setBookingHistory(res.data.data);
    }
  };

  const tabs = [
    {
      title: 'Reservas',
      component: (
        <TripsTemplate renderList={upcomingBooking} domain="upcoming" />
      ),
    },
    {
      title: 'Historial',
      component: <TripsTemplate renderList={bookingHistory} domain="history" />,
    },
  ];

  return (
    <div>
      <Head>
        <title>Huru | Historial de viajes</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <CarNavBar />

      <ActivityIndicator
        visible={getUpcomingBookings.loading || getBookingsHistory.loading}
      />

      <div className={`${carNavStyles.carPageContent} ${styles.tripsContainer}`}>
        <div className={styles.tripsContent}>
          <TitlePage>Viajes</TitlePage>

          <TabsLayout tabs={tabs} />
        </div>
      </div>
    </div>
  );
};

export default withAuth(Trips);
