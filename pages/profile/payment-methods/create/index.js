import Head from 'next/head';
import { useEffect, useState } from 'react';

import authStorage from '../../../../app/utils/storageAuth';
import withAuth from '../../../../app/HOC/withAuth';

import ProfileNavBar from '../../../../app/components/modules/NavBar/ProfileNavBar';
import profileNavStyles from '../../../../app/components/modules/NavBar/ProfileNavBar.module.scss';
import AddPaymentMethodLayout from '../../../../app/components/layouts/AddPaymentMethod/AddPaymentMethodLayout';

const CreatePaymentMethod = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userLogged = authStorage.getUser();
    if (userLogged) setUser(userLogged.info);
  }, []);

  return (
    <div>
      <Head>
        <title>Huru | Agregar metodo de pago</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ProfileNavBar />

      <div className={profileNavStyles.profilePageContent}>
        {Object.keys(user).length > 0 && user.constructor === Object && (
          <AddPaymentMethodLayout uid={user.uid} email={user.email} />
        )}
      </div>
    </div>
  );
};

export default withAuth(CreatePaymentMethod);
