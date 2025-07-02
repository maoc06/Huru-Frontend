import Head from 'next/head';
import { useEffect, useState } from 'react';

import useApi from '../../../app/hooks/useApi';
import userApi from '../../../app/api/UserAPI';
import withAuth from '../../../app/HOC/withAuth';

import authStorage from '../../../app/utils/storageAuth';
import ActivityIndicator from '../../../app/components/elements/ActivityIndicator/ActivityIndicator';
import ProfileNavBar from '../../../app/components/modules/NavBar/ProfileNavBar';
import profileNavStyles from '../../../app/components/modules/NavBar/ProfileNavBar.module.scss';
import PersonalDataTemplate from '../../../app/components/templates/PersonalData/PersonalDataTemplate';

const PersonalData = () => {
  const [user, setUser] = useState({});
  const getUser = useApi(userApi.findUser);

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) handleUserData(user.info.uid);
  }, []);

  const handleUserData = async (userId) => {
    const res = await getUser.request(userId);
    setUser(res.data.data);
  };

  return (
    <div>
      <Head>
        <title>Huru | Información personal</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ProfileNavBar />

      <ActivityIndicator visible={getUser.loading} />

      <div className={profileNavStyles.profilePageContent}>
        {user.constructor === Object && Object.keys(user).length > 0 && (
          <PersonalDataTemplate
            biography={
              user.about
                ? user.about
                : 'Aún no tienes una descripción detallada de ti.'
            }
            userJoinAt={user.createdAt}
            email={user.email}
            emailVerified={user.isEmailVerified}
            phone={user.phone.slice(3)}
            phoneCountryCode={user.phone.slice(0, 3)}
            phoneVerified={user.isPhoneVerified}
            picture={user.profilePhoto}
            username={`${user.firstName} ${user.lastName}`}
            userId={user.uuid}
            editablePicture={true}
          />
        )}
      </div>
    </div>
  );
};

export default withAuth(PersonalData);
