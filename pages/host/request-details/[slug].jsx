import Head from 'next/head';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';

import authStorage from '../../../app/utils/storageAuth';
import useApi from '../../../app/hooks/useApi';
import bookingApi from '../../../app/api/BookingAPI';
import SearchForm from '../../../app/components/modules/SearchForm/SearchForm';

import AppLayout from '../../../app/components/layouts/AppLayout/AppLayout';
import TwoBottons from '../../../app/components/modules/TwoBottons/TwoBottons';
import Carousel from '../../../app/components/elements/Carousel/Carousel'; 

export default function RequestDetail(){
  const router = useRouter();
  const getBooking = useApi(bookingApi.findBooking);
  const [booking, setBooking] = useState({data: {user: {email: '@'}}});
  const { slug } = router.query;

  const handleGetData = async () => {
    console.log('slug', slug);
    const res = await getBooking.request(slug);
    const bookingRes= res.data.data;
    setBooking(bookingRes);
  }

  useEffect(() => {
    handleGetData();
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
      <Carousel images={[]} />
      <h3>{`$MOnye el dinero es dinero`}</h3>
      

      
      {!getBooking.loading && <TwoBottons bookingId={slug} email={booking} />}
    </AppLayout>
    
  </div>
     

 );


}