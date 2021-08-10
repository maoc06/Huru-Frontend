import Head from 'next/head';
import { useState, useEffect } from 'react';

import useApi from '../../../app/hooks/useApi';
import authStorage from '../../../app/utils/storageAuth';
import paymentUserApi from '../../../app/api/PaymentUserAPI';
import withAuth from '../../../app/HOC/withAuth';

import AppLayout from '../../../app/components/layouts/AppLayout/AppLayout';
import PaymentMethodsTemplate from '../../../app/components/templates/PaymentMethods/PaymentMethodsTemplate';
import ActivityIndicator from '../../../app/components/elements/ActivityIndicator/ActivityIndicator';

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const paymentMethodsByUser = useApi(paymentUserApi.findPaymentsByUser);

  const handleData = async (uuid) => {
    const res = await paymentMethodsByUser.request(uuid);
    setPaymentMethods(res.data.data);
  };

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) handleData(user.info.uid);
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
          {!paymentMethodsByUser.loading && (
            <PaymentMethodsTemplate list={paymentMethods} />
          )}
        </AppLayout>
      </>
    </div>
  );
};

export default withAuth(PaymentMethods);
