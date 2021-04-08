import { useEffect, useState } from 'react';

import useApi from '../../../hooks/useApi';
import bookingApi from '../../../api/BookingAPI';

import authStorage from '../../../utils/storageAuth';

import AppLayout from '../../layouts/AppLayout/AppLayout';
import GridCardRequestLayout from '../../layouts/GridCardRequestLayout/GridCardRequestLayout';

export default function HomeHostTemplate() {
  const getBookingRequests = useApi(bookingApi.findBookingRequests);
  const [bookingRequests, setBookingRequest] = useState([]);

  const handleGetData = async (uid) => {
    const res = await getBookingRequests.request(uid);
    setBookingRequest(res.data.data);
  };

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) handleGetData(user.info.uid);
  }, []);

  return (
    <AppLayout withImage={false}>
      {!getBookingRequests.loading && (
        <GridCardRequestLayout requestList={bookingRequests} />
      )}

      <h6>Estadisticas Generales</h6>

      <h6>Viajes más proximos</h6>
    </AppLayout>
  );
}
