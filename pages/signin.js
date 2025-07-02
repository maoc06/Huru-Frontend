import Head from 'next/head';

import AppLayout from '../app/components/layouts/AppLayout/AppLayout';
import AuthNavBar from '../app/components/modules/NavBar/AuthNavBar';
import LoginTemplate from '../app/components/templates/LoginPage/LoginTemplate';
import authNavStyles from '../app/components/modules/NavBar/AuthNavBar.module.scss';

export default function Signin() {
  return (
    <div>
      <Head>
        <title>Huru | Ingresar</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <AuthNavBar />
      
      <AppLayout centerContent={true} withLiquidBackground={true}>
        <div className={authNavStyles.authPageContent}>
          <LoginTemplate />
        </div>
      </AppLayout>
    </div>
  );
}
