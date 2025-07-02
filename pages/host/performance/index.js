import Head from 'next/head';
import { useEffect, useState } from 'react';

import withAuth from '../../../app/HOC/withAuth';
import CarNavBar from '../../../app/components/modules/NavBar/CarNavBar';
import carNavStyles from '../../../app/components/modules/NavBar/CarNavBar.module.scss';
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

      <CarNavBar />

      <div className={carNavStyles.carPageContent}>
        <UnderConstruction isMobile={isMobile} />
      </div>
    </div>
  );
};

export default withAuth(Performance);
