import Head from 'next/head';
import { useEffect, useState } from 'react';

import withAuth from '../../../app/HOC/withAuth';
import AppLayout from '../../../app/components/layouts/AppLayout/AppLayout';
import UnderConstruction from '../../../app/components/modules/UnderConstruction/UnderConstruction';

const Performance = () => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    if (window.innerWidth > 720) setIsMobile(false);

    // listen window resize
    window.addEventListener('resize', () => {
      // responsive
      if (window.innerWidth > 720) setIsMobile(false);
    });
  }, []);

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
        <UnderConstruction isMobile={isMobile} />
      </AppLayout>
    </div>
  );
};

export default withAuth(Performance);
