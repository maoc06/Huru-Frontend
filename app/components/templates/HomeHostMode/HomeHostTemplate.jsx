import { useEffect, useState } from 'react';

import useApi from '../../../hooks/useApi';
import bookingApi from '../../../api/BookingAPI';
import AppLayout from '../../layouts/AppLayout/AppLayout';
import Avatar from '../../elements/Avatar/Avatar';
import Divider from '../../elements/Divider/Divider';
import { LogoColor } from '../../elements/Icons/Shared';
import MenuDesktop from '../../modules/MenuDesktop/MenuDesktop';
import GridCardRequestLayout from '../../layouts/GridCardRequestLayout/GridCardRequestLayout';
import authStorage from '../../../utils/storageAuth';
import styles from './HomeHostTemplate.module.scss';

export default function HomeHostTemplate() {
  const getBookingRequests = useApi(bookingApi.findBookingRequests);
  const [bookingRequests, setBookingRequest] = useState([]);
  const [user, setUser] = useState(null);
  const [showMenuDesktop, setShowMenuDesktop] = useState(false);

  const handleGetData = async (uuid) => {
    const res = await getBookingRequests.request({ uuid, limit: true });
    setBookingRequest(res.data.data);
  };

  const handleAvatar = () => {
    setShowMenuDesktop(!showMenuDesktop);
  };

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) {
      setUser(user.info);
      handleGetData(user.info.uid);
    }
  }, []);

  return (
    <AppLayout withImage={false}>
      <div className={styles.container}>
        <section className={styles.header}>
          <div
            onClick={() => {
              router.push('/');
            }}
            className={styles.logo}
          >
            <LogoColor />
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
          <div className={styles.requests}>
            <h6>Solicitudes recientes</h6>
            {bookingRequests.length === 0 && <p>No tienes solicitudes</p>}
            {bookingRequests.length > 0 && (
              <GridCardRequestLayout requestList={bookingRequests} />
            )}
          </div>

          <Divider size="mediumTop" />

          <div className={styles.stats}>
            <h6>Estadisticas Generales</h6>
            <span className={styles.upcoming}>
              Está funcionalidad estara disponible muy pronto en las nuevas
              versiones.
            </span>
          </div>

          <Divider size="mediumTop" />

          <div className={styles.trips}>
            <h6>Viajes más proximos</h6>
            <span className={styles.upcoming}>
              Está funcionalidad estara disponible muy pronto en las nuevas
              versiones.
            </span>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
