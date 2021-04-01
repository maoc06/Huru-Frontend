import Head from 'next/head';

import AppLayout from '../../../../app/components/layouts/AppLayout/AppLayout';

function CarDetailsFeatures() {
  return (
    <div>
      <Head>
        <title>Huru | Renta carros</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <AppLayout withImage={false}>
        <h3>Caracteristicas</h3>
      </AppLayout>
    </div>
  );
}

export default CarDetailsFeatures;
