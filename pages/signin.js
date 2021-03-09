import Head from 'next/head';

import AppLayout from '../app/components/layouts/AppLayout/AppLayout';
import LoginTemplate from '../app/components/templates/LoginPage/LoginTemplate';

export default function Signin() {
  return (
    <div>
      <Head>
        <title>Huru | Login</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <AppLayout>
        <LoginTemplate />
      </AppLayout>
    </div>
  );
}
