import Head from 'next/head';
import { useState, useEffect } from 'react';

import useApi from '../../../app/hooks/useApi';
import authStorage from '../../../app/utils/storageAuth';
import paymentUserApi from '../../../app/api/PaymentUserAPI';
import withAuth from '../../../app/HOC/withAuth';

import ProfileNavBar from '../../../app/components/modules/NavBar/ProfileNavBar';
import PaymentMethodsTemplate from '../../../app/components/templates/PaymentMethods/PaymentMethodsTemplate';
import ActivityIndicator from '../../../app/components/elements/ActivityIndicator/ActivityIndicator';

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [user, setUser] = useState(null);
  const paymentMethodsByUser = useApi(paymentUserApi.findPaymentsByUser);

  const handleData = async (uuid) => {
    const res = await paymentMethodsByUser.request(uuid);
    setPaymentMethods(res.data.data);
  };

  useEffect(() => {
    const userLogged = authStorage.getUser();
    if (userLogged) {
      setUser(userLogged.info);
      handleData(userLogged.info.uid);
    }
  }, []);

  return (
    <div className="payment-methods-page">
      <Head>
        <title>Huru | Métodos de pago</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ProfileNavBar />

      <ActivityIndicator visible={paymentMethodsByUser.loading} />

      <div className="payment-methods-page-content">
        {/* Always render the template, but with empty list while loading */}
        <PaymentMethodsTemplate 
          list={!paymentMethodsByUser.loading ? paymentMethods : []} 
          user={user}
        />
      </div>

      <style jsx>{`
        .payment-methods-page {
          min-height: 100vh;
          background-color: #F6FFFC;
        }
        
        .payment-methods-page-content {
          width: 100%;
          background-color: #F6FFFC;
        }
      `}</style>
    </div>
  );
};

export default withAuth(PaymentMethods);
