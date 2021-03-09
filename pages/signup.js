import Head from 'next/head';

import AppLayout from '../app/components/layouts/AppLayout/AppLayout';
import RegisterUserTemplate from '../app/components/templates/RegisterUserPage/RegisterUserPage';

export default function Signup() {
  return (
    <div>
      <Head>
        <title>Huru | Registro de usuario</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <AppLayout>
        <RegisterUserTemplate />
      </AppLayout>
    </div>
  );
}
