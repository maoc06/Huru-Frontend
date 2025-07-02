import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import useApi from '../../app/hooks/useApi';
import authApi from '../../app/api/AuthAPI';

import AppLayout from '../../app/components/layouts/AppLayout/AppLayout';
import VerifyEmailTemplate from '../../app/components/templates/VerifyEmail/VerifyEmailTemplate';
import ActivityIndicator from '../../app/components/elements/ActivityIndicator/ActivityIndicator';

function VerifyEmail() {
  const router = useRouter();
  const verifyEmailApi = useApi(authApi.verifyEmail);
  const [isValid, setIsValid] = useState(true);
  const { token } = router.query;

  const handleVerifyEmail = async () => {
    const res = await verifyEmailApi.request(token);
    if (res === undefined) setIsValid(false);
  };

  useEffect(() => {
    if (token) {
      handleVerifyEmail();
    }
  }, [token]);

  return (
    <div>
      <Head>
        <title>Huru | Validar el correo electrónico</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ActivityIndicator
        visible={verifyEmailApi.loading && token !== undefined}
      />

      <AppLayout withLiquidBackground centerContent>
        <VerifyEmailTemplate
          verifyEmailApi={verifyEmailApi}
          isValid={isValid}
        />
      </AppLayout>
    </div>
  );
}

export default VerifyEmail;
