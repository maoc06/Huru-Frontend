import Head from 'next/head';

import withAuth from '../../../app/HOC/withAuth';
import CarNavBar from '../../../app/components/modules/NavBar/CarNavBar';
import carNavStyles from '../../../app/components/modules/NavBar/CarNavBar.module.scss';
import UnderConstruction from '../../../app/components/modules/UnderConstruction/UnderConstruction';

const Calendar = () => {
  return (
    <div>
      <Head>
        <title>Huru | Calendario de reservas</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <CarNavBar />

      <div className={carNavStyles.carPageContent}>
        <UnderConstruction />
      </div>
    </div>
  );
};

export default withAuth(Calendar);
