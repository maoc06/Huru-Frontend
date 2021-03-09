import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import AppLayout from '../app/components/layouts/AppLayout/AppLayout';
import Button from '../app/components/elements/Button/Button';
import useAuth from '../app/hooks/useAuth';
import authStorage from '../app/utils/storageAuth';
import ProtectRoute from '../app/components/layouts/ProtectRoute/ProtectRouteLayout';

function Profile() {
  const auth = useAuth();
  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) setUser(user.info);
    else router.push('/signin');
  }, []);

  const handleLogOut = () => {
    auth.logOut();
    router.push('/');
  };

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

      <AppLayout>
        <h1>Bienvenido,</h1>

        <h1>
          {user.firstName} {user.lastName}
        </h1>

        <Link href="/add-vehicle">
          <a>Hazte Host</a>
        </Link>

        <Button onClick={handleLogOut}>Cerrar sesión</Button>
      </AppLayout>
    </div>
  );
}

export default Profile;
