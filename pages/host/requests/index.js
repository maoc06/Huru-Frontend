import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../../app/hooks/useApi';
import bookingApi from '../../../app/api/BookingAPI';
import authStorage from '../../../app/utils/storageAuth';

import AppLayout from '../../../app/components/layouts/AppLayout/AppLayout';
import GridCardRequestLayout from '../../../app/components/layouts/GridCardRequestLayout/GridCardRequestLayout';
import ActivityIndicator from '../../../app/components/elements/ActivityIndicator/ActivityIndicator';

export default function RequestDetail() {
  const router = useRouter();

  const getRequests = useApi(bookingApi.findBookingRequests);
  const [requests, setRequests] = useState({});

  const handleGetData = async (uuid) => {
    const res = await getRequests.request(uuid);
    setRequests(res.data.data);
  };

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) {
      const uuid = user.info.uid;
      handleGetData(uuid);
    } else {
      router.push('/signin');
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Huru |Solicitudes de reserva</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ActivityIndicator visible={getRequests.loading} />

      <AppLayout withImage={false}>
        {requests.length > 0 && (
          <GridCardRequestLayout
            requestList={requests}
            showSeeAll={false}
            sliceTo={requests.length}
          />
        )}
      </AppLayout>
    </div>
  );
}
