import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import useApi from '../../../../app/hooks/useApi';
import paymentUserApi from '../../../../app/api/PaymentUserAPI';
import authStorage from '../../../../app/utils/storageAuth';

import AppLayout from '../../../../app/components/layouts/AppLayout/AppLayout';
import CardTemplate from '../../../../app/components/templates/PaymentMethods/CardTemplate';
import NequiTemplate from '../../../../app/components/templates/PaymentMethods/NequiTemplate';
import PaymentEditControlls from '../../../../app/components/modules/PaymentEditControlls/PaymentEditControlls';
import ActivityIndicator from '../../../../app/components/elements/ActivityIndicator/ActivityIndicator';

function PaymentMethods() {
  const router = useRouter();

  const getPayment = useApi(paymentUserApi.findPayment);
  const getDefaultPayment = useApi(paymentUserApi.findDefaultPaymentByUser);

  const [payment, setPayment] = useState({});
  const [defaultPayment, setDefaultPayment] = useState({});

  const { slug } = router.query;

  const handlePaymentInfo = async () => {
    const res = await getPayment.request(slug);
    setPayment(res.data.data);
  };

  const handleGetDefault = async (uid) => {
    const res = await getDefaultPayment.request(uid);
    console.log('Default', res.data.data[0]);
    setDefaultPayment(res.data.data[0]);
  };

  const handleGetData = (uid) => {
    handlePaymentInfo();
    handleGetDefault(uid);
  };

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) {
      handleGetData(user.info.uid);
    } else router.push('/signin');
  }, []);

  const renderTemplate = () => {
    switch (payment.type) {
      case 'CARD':
        return (
          <CardTemplate
            readOnly={true}
            number={`xxxx xxxx xxxx ${payment.lastFour}`}
          />
        );
      case 'NEQUI':
        return <NequiTemplate readOnly={true} phone={payment.phone} />;
      default:
        console.error('unkown-error: template case unkown');
        return null;
    }
  };

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
        <ActivityIndicator
          visible={getPayment.loading || getDefaultPayment.loading}
        />

        <AppLayout withImage={false}>
          <h3>Metodo de pago</h3>

          {Object.keys(payment).length > 0 && payment.constructor === Object && (
            <>
              {renderTemplate()}

              {!getDefaultPayment.loading && (
                <PaymentEditControlls
                  defaultId={defaultPayment.id}
                  paymentId={payment.id}
                  isDefault={payment.isDefault}
                />
              )}
            </>
          )}
        </AppLayout>
      </>
    </div>
  );
}

export default PaymentMethods;
