import { useEffect, useState } from 'react';

import useApi from '../../../hooks/useApi';
import bookingApi from '../../../api/BookingAPI';

import authStorage from '../../../utils/storageAuth';

import AppLayout from '../../layouts/AppLayout/AppLayout';
import GridCardRequestLayout from '../../layouts/GridCardRequestLayout/GridCardRequestLayout';

export default function HomeHostTemplate() {
  const getBookingRequests = useApi(bookingApi.findBookingRequests);
  const [bookingRequests, setBookingRequest] = useState([]);

  const handleGetData = async (uuid) => {
    const res = await getBookingRequests.request({ uuid, limit: true });
    setBookingRequest(res.data.data);
  };

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) handleGetData(user.info.uid);
  }, []);

  return (
    <AppLayout withImage={false}>
      <h6>Solicitudes recientes</h6>
      {bookingRequests.length === 0 && <p>No tienes solicitudes</p>}
      {bookingRequests.length > 0 && (
        <GridCardRequestLayout requestList={bookingRequests} />
      )}

      <h6>Estadisticas Generales</h6>

      <h6>Viajes más proximos</h6>
    </AppLayout>
  );
}
