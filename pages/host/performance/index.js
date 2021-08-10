import Head from 'next/head';

import withAuth from '../../../app/HOC/withAuth';
import AppLayout from '../../../app/components/layouts/AppLayout/AppLayout';
import UnderConstruction from '../../../app/components/modules/UnderConstruction/UnderConstruction';

const Performance = () => {
  return (
    <div>
      <Head>
        <title>Huru | Desempeño de usuario</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <AppLayout withImage={false}>
        <UnderConstruction />
      </AppLayout>
    </div>
  );
};

export default withAuth(Performance);
