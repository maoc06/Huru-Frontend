import { useEffect, useState } from 'react';
import BuildIcon from '@material-ui/icons/Build';

import useApi from '../../../hooks/useApi';
import bookingApi from '../../../api/BookingAPI';
import CarNavBar from '../../modules/NavBar/CarNavBar';
import carNavStyles from '../../modules/NavBar/CarNavBar.module.scss';
import FlexCardRequestLayout from '../../layouts/FlexCardRequestLayout/FlexCardRequestLayout';
import authStorage from '../../../utils/storageAuth';
import styles from './HomeHostTemplate.module.scss';

export default function HomeHostTemplate() {
  const getBookingRequests = useApi(bookingApi.findBookingRequests);
  const [bookingRequests, setBookingRequest] = useState([]);
  const [user, setUser] = useState(null);

  const handleGetData = async (uuid) => {
    const res = await getBookingRequests.request({ uuid, limit: false });
    if (res && res.data) {
      setBookingRequest(res.data.data);
      console.log(res.data.data);
    }
  };

  useEffect(() => {
    const currentUser = authStorage.getUser();
    if (currentUser) {
      setUser(currentUser);
      handleGetData(currentUser.info.uid);
    }
  }, []);

  return (
    <>
      <CarNavBar />
      
      <div className={carNavStyles.carPageContent}>
        <div className={styles.container}>
          <h1 className={styles.title}>¡Bienvenido, {user?.info?.firstName}!</h1>
          <p className={styles.subtitle}>Gestiona tus solicitudes y maximiza tus ganancias como anfitrión.</p>
          <section className={styles.content}>
            <div className={styles.requests}>
              <h4>Solicitudes recientes</h4>
              {bookingRequests.length === 0 && <p>No tienes solicitudes</p>}
              {bookingRequests.length > 0 && (
                <FlexCardRequestLayout requestList={bookingRequests} horizontal={true} />
              )}
            </div>

            <div className={styles.stats}>
              <h4>Estadisticas Generales</h4>
              <span className={styles.upcoming}>
                <BuildIcon className={styles.upcomingIcon} />
                <p>Está funcionalidad estara disponible muy pronto en las nuevas
                versiones.</p> 
              </span>
            </div>

            <div className={styles.trips}>
              <h4>Viajes más proximos</h4>
              <span className={styles.upcoming}>
                <BuildIcon className={styles.upcomingIcon} />
                <p>Está funcionalidad estara disponible muy pronto en las nuevas
                versiones.</p> 
              </span>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
