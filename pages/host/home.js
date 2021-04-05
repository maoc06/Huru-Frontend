import AppLayout from '../../app/components/layouts/AppLayout/AppLayout';

import authStorage from '../../app/utils/storageAuth';

import GridCardRequestLayout from '../../app/components/layouts/GridCardRequestLayout/GridCardRequestLayout';


import bookingApi from '../../app/api/BookingAPI';
import useApi from '../../app/hooks/useApi';
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function HomeHost(){ 
    const getBookingRequests = useApi(bookingApi.findBookingRequests)
    const [bookingRequests, setBookingRequest] = useState([]);

    const handleGetData = async (uid) => {
        console.log('uid', uid)
        const res = await getBookingRequests.request('9d738e6e-3bec-407b-bf2d-e443b9fcb36f');
        setBookingRequest(res.data.data);
        

    }

    useEffect(() => {
        const user = authStorage.getUser();
        if(user) handleGetData(user.info.uid)
    }, []);
    
 return(
    <div>
    <Head>
      <title>Huru | Renta carros</title>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </Head>

    <AppLayout>

    {!getBookingRequests.loading && <GridCardRequestLayout requestList={bookingRequests}  />}
    </AppLayout>
    
  </div>
     

 );


}