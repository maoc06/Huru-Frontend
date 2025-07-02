import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import useApi from '../../../../app/hooks/useApi';
import paymentUserApi from '../../../../app/api/PaymentUserAPI';
import authStorage from '../../../../app/utils/storageAuth';
import withAuth from '../../../../app/HOC/withAuth';

import TitlePage from '../../../../app/components/elements/TitlePage/TitlePage';
import ProfileNavBar from '../../../../app/components/modules/NavBar/ProfileNavBar';
import profileNavStyles from '../../../../app/components/modules/NavBar/ProfileNavBar.module.scss';
import CardTemplate from '../../../../app/components/templates/PaymentMethods/CardTemplate';
import NequiTemplate from '../../../../app/components/templates/PaymentMethods/NequiTemplate';
import PaymentEditControlls from '../../../../app/components/modules/PaymentEditControlls/PaymentEditControlls';
import ActivityIndicator from '../../../../app/components/elements/ActivityIndicator/ActivityIndicator';

import styles from './EditPayment.module.scss';

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
    setDefaultPayment(res.data.data[0] || {});
  };

  const handleGetData = (uid) => {
    handlePaymentInfo();
    handleGetDefault(uid);
  };

  useEffect(() => {
    if (slug) {
      const user = authStorage.getUser();
      if (user) handleGetData(user.info.uid);
    }
  }, [slug]);

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
        <title>Huru | Editar metodo de pago</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ProfileNavBar />

      <ActivityIndicator
        visible={getPayment.loading || getDefaultPayment.loading}
      />

      <div className={profileNavStyles.profilePageContent}>
        <TitlePage align="left">Metodo de pago</TitlePage>

        {Object.keys(payment).length > 0 && payment.constructor === Object && (
          <>
            <section className={styles.container}>
              {renderTemplate()}

              {!getDefaultPayment.loading && (
                <PaymentEditControlls
                  defaultId={defaultPayment?.id}
                  paymentId={payment.id}
                  isDefault={payment.isDefault}
                />
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default withAuth(PaymentMethods);
