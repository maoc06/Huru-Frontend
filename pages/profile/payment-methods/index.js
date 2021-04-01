import { useState, useEffect } from 'react';
import Head from 'next/head';

import useApi from '../../../app/hooks/useApi';
import authStorage from '../../../app/utils/storageAuth';
import paymentUserApi from '../../../app/api/PaymentUserAPI';

import AppLayout from '../../../app/components/layouts/AppLayout/AppLayout';
import PaymentMethodsTemplate from '../../../app/components/templates/PaymentMethods/PaymentMethodsTemplate';
import ActivityIndicator from '../../../app/components/elements/ActivityIndicator/ActivityIndicator';

function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const paymentMethodsByUser = useApi(paymentUserApi.findPaymentsByUser);

  const handleData = async (uuid) => {
    const res = await paymentMethodsByUser.request(uuid);
    setPaymentMethods(res.data.data);
  };

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) {
      handleData(user.info.uid);
    } else router.push('/signin');
  }, []);

  return (
    <div>
      <Head>
        <title>Huru | Metodos de pago</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <>
        <ActivityIndicator visible={paymentMethodsByUser.loading} />

        <AppLayout>
          <h3>Metodos de pago</h3>
          <p>Selecciona tu metodo de pago de preferencia.</p>

          {!paymentMethodsByUser.loading && (
            <PaymentMethodsTemplate list={paymentMethods} />
          )}
        </AppLayout>
      </>
    </div>
  );
}

export default PaymentMethods;
