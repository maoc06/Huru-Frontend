import Head from 'next/head';
import { useEffect, useState } from 'react';

import authStorage from '../../../../app/utils/storageAuth';

import AppLayout from '../../../../app/components/layouts/AppLayout/AppLayout';
import AddPaymentMethodLayout from '../../../../app/components/layouts/AddPaymentMethod/AddPaymentMethodLayout';

function CreatePaymentMethod() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userLogged = authStorage.getUser();
    if (userLogged) {
      setUser(userLogged.info);
    } else router.push('/signin');
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

      <AppLayout>
        {Object.keys(user).length > 0 && user.constructor === Object && (
          <AddPaymentMethodLayout uid={user.uid} email={user.email} />
        )}
      </AppLayout>
    </div>
  );
}

export default CreatePaymentMethod;
