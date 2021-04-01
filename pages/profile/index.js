import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import AppLayout from '../../app/components/layouts/AppLayout/AppLayout';
import UserProfileTemplate from '../../app/components/templates/UserProfile/UserProfile';
import useAuth from '../../app/hooks/useAuth';
import authStorage from '../../app/utils/storageAuth';

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

      <AppLayout withImage={false}>
        <UserProfileTemplate user={user} onLogOut={handleLogOut} />
      </AppLayout>
    </div>
  );
}

export default Profile;
