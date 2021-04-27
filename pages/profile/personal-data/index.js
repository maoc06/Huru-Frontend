import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../../app/hooks/useApi';
import userApi from '../../../app/api/UserAPI';

import authStorage from '../../../app/utils/storageAuth';
import ActivityIndicator from '../../../app/components/elements/ActivityIndicator/ActivityIndicator';
import AppLayout from '../../../app/components/layouts/AppLayout/AppLayout';
import PersonalDataTemplate from '../../../app/components/templates/PersonalData/PersonalDataTemplate';

function PersonalData() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const getUser = useApi(userApi.findUser);

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) handleUserData(user.info.uid);
    else router.push('/signin');
  }, []);

  const handleUserData = async (userId) => {
    const res = await getUser.request(userId);
    setUser(res.data.data);
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

      <ActivityIndicator visible={getUser.loading} />

      <AppLayout withImage={false}>
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
          />
        )}
      </AppLayout>
    </div>
  );
}

export default PersonalData;
