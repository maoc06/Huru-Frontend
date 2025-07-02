import { useEffect, useState } from 'react';

import useApi from '../../../hooks/useApi';
import bookingApi from '../../../api/BookingAPI';
import CarNavBar from '../../modules/NavBar/CarNavBar';
import carNavStyles from '../../modules/NavBar/CarNavBar.module.scss';
import Divider from '../../elements/Divider/Divider';
import GridCardRequestLayout from '../../layouts/GridCardRequestLayout/GridCardRequestLayout';
import authStorage from '../../../utils/storageAuth';
import styles from './HomeHostTemplate.module.scss';

export default function HomeHostTemplate() {
  const getBookingRequests = useApi(bookingApi.findBookingRequests);
  const [bookingRequests, setBookingRequest] = useState([]);

  const handleGetData = async (uuid) => {
    const res = await getBookingRequests.request({ uuid, limit: true });
    if (res && res.data) {
      setBookingRequest(res.data.data);
    }
  };

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) {
      handleGetData(user.info.uid);
    }
  }, []);

  return (
    <>
      <CarNavBar />
      
      <div className={carNavStyles.carPageContent}>
        <div className={styles.container}>
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
      </div>
    </>
  );
}
