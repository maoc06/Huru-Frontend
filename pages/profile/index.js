import Head from 'next/head';
import { useEffect, useState } from 'react';

import useMood from '../../app/hooks/useMood';
import withAuth from '../../app/HOC/withAuth';

import ProfileNavBar from '../../app/components/modules/NavBar/ProfileNavBar';
import profileNavStyles from '../../app/components/modules/NavBar/ProfileNavBar.module.scss';
import UserProfileTemplate from '../../app/components/templates/UserProfile/UserProfile';

import authStorage from '../../app/utils/storageAuth';

const Profile = () => {
  const app = useMood();
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) setUser(user.info);
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

      <ProfileNavBar />

      <div className={profileNavStyles.profilePageContent}>
        <UserProfileTemplate user={user} isHostMood={app.getMood} />
      </div>
    </div>
  );
};

export default withAuth(Profile);
