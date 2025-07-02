import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../../app/hooks/useApi';
import bookingApi from '../../../app/api/BookingAPI';
import authStorage from '../../../app/utils/storageAuth';

import ActivityIndicator from '../../../app/components/elements/ActivityIndicator/ActivityIndicator';
import AppLayout from '../../../app/components/layouts/AppLayout/AppLayout';
import Avatar from '../../../app/components/elements/Avatar/Avatar';
import { LogoColor } from '../../../app/components/elements/Icons/Shared';
import MenuDesktop from '../../../app/components/modules/MenuDesktop/MenuDesktop';
import NotFound from '../../../app/components/modules/NotFound/NotFound';
import TitlePage from '../../../app/components/elements/TitlePage/TitlePage';
import GridCardRequestLayout from '../../../app/components/layouts/GridCardRequestLayout/GridCardRequestLayout';
import styles from './Requests.module.scss';

export default function RequestDetail() {
  const router = useRouter();

  const getRequests = useApi(bookingApi.findBookingRequests);
  const [requests, setRequests] = useState([]);

  const [user, setUser] = useState(null);
  const [showMenuDesktop, setShowMenuDesktop] = useState(false);

  const handleGetData = async (uuid) => {
    try {
      const res = await getRequests.request({ uuid, limit: false });
      console.log('Requests response:', res);
      
      if (res?.data?.data && Array.isArray(res.data.data)) {
        setRequests(res.data.data);
      } else {
        console.warn('Invalid requests data structure:', res);
        setRequests([]);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      setRequests([]);
    }
  };

  const handleAvatar = () => {
    setShowMenuDesktop(!showMenuDesktop);
  };

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) {
      const uuid = user.info.uid;
      handleGetData(uuid);
      setUser(user.info);
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
        <main>
          <section className={styles.header}>
            <div
              onClick={() => {
                router.push('/');
              }}
              className={styles.logo}
            >
              <LogoColor />
            </div>

            <div>
              <TitlePage>Solicitudes de Reserva</TitlePage>
            </div>

            <div className={styles.avatar} onClick={handleAvatar}>
              {user ? (
                <Avatar src={user.profilePicture} size="large" />
              ) : (
                <Avatar />
              )}
              {showMenuDesktop && (
                <div className={styles.menuDesktop}>
                  <MenuDesktop user={user} />
                </div>
              )}
            </div>
          </section>

          <section className={styles.content}>
            {!getRequests.loading && Array.isArray(requests) && requests.length === 0 && (
              <NotFound text="No tienes solicitudes de reserva para mostrar. Asegurate de tener vehículos listados y habilitados." />
            )}

            {!getRequests.loading && Array.isArray(requests) && requests.length > 0 && (
              <GridCardRequestLayout
                requestList={requests}
                showSeeAll={false}
                sliceTo={requests.length}
              />
            )}
          </section>
        </main>
      </AppLayout>
    </div>
  );
}
