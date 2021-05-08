import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import useApi from '../../app/hooks/useApi';
import bookingApi from '../../app/api/BookingAPI';
import authStorage from '../../app/utils/storageAuth';

import AppLayout from '../../app/components/layouts/AppLayout/AppLayout';
import TabsLayout from '../../app/components/layouts/TabsLayout/TabsLayout';
import TripsTemplate from '../../app/components/templates/Trips/TripsTemplate';
import TitlePage from '../../app/components/elements/TitlePage/TitlePage';
import ActivityIndicator from '../../app/components/elements/ActivityIndicator/ActivityIndicator';

export default function Trips() {
  const router = useRouter();

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
    } else {
      router.push('/signin');
    }
  }, []);

  const handleUpcomingBookings = async (uuid) => {
    const res = await getUpcomingBookings.request(uuid);
    setUpcomingBookings(res.data.data);
  };

  const handleBookingsHistory = async (uuid) => {
    const res = await getBookingsHistory.request(uuid);

    setBookingHistory(res.data.data);
  };

  const handleClickUpcoming = (slug) => {
    return `/trips/upcoming/${encodeURIComponent(slug)}`;
  };

  const handleClickHistory = (slug) => {
    return `/trips/history/${encodeURIComponent(slug)}`;
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

      <ActivityIndicator
        visible={getUpcomingBookings.loading || getBookingsHistory.loading}
      />

      <AppLayout withImage={false}>
        <TitlePage>Viajes</TitlePage>

        <TabsLayout tabs={tabs} />
      </AppLayout>
    </div>
  );
}
