import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useMood from '../../app/hooks/useMood';

import AppLayout from '../../app/components/layouts/AppLayout/AppLayout';
import UserProfileTemplate from '../../app/components/templates/UserProfile/UserProfile';

import authStorage from '../../app/utils/storageAuth';

function Profile() {
  const app = useMood();
  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) setUser(user.info);
    else router.push('/signin');
  }, []);

  return (
    <div>
      <Head>
        <title>Huru | Perfil de usuario</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <AppLayout withImage={false}>
        <UserProfileTemplate user={user} isHostMood={app.getMood} />
      </AppLayout>
    </div>
  );
}

export default Profile;
