import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../../../app/hooks/useApi';
import userApi from '../../../../app/api/UserAPI';
import withAuth from '../../../../app/HOC/withAuth';

import ActivityIndicator from '../../../../app/components/elements/ActivityIndicator/ActivityIndicator';
import StatusIndicator from '../../../../app/components/elements/StatusIndicator/StatusIndicator';
import checkAnimationData from '../../../../public/animations/check.json';
import ProfileNavBar from '../../../../app/components/modules/NavBar/ProfileNavBar';
import profileNavStyles from '../../../../app/components/modules/NavBar/ProfileNavBar.module.scss';
import EditPasswordTemplate from '../../../../app/components/templates/EditPassword/EditPasswordTemplate';
import TitlePage from '../../../../app/components/elements/TitlePage/TitlePage';
import storageAuth from '../../../../app/utils/storageAuth';

const EditPasswordPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [wrongPassword, setWrongPassword] = useState(false);
  const updatePassword = useApi(userApi.updatePassword);

  useEffect(() => {
    const user = storageAuth.getUser();
    if (user) setUser(user.info);
  }, []);

  const handleUpdatePassword = async (password) => {
    setWrongPassword(false);
    const res = await updatePassword.request(password);
    if (res !== undefined) router.push('/profile/personal-data');
  };

  useEffect(() => {
    if (updatePassword.error) setWrongPassword(true);
  }, [updatePassword.error]);

  return (
    <div>
      <Head>
        <title>Huru | Editar contraseña</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ProfileNavBar />

      <ActivityIndicator visible={updatePassword.loading} />

      <StatusIndicator
        animationData={checkAnimationData}
        visible={
          !updatePassword.error &&
          !updatePassword.loading &&
          updatePassword.data.constructor === Object
        }
        title={'Listo!'}
        message={'La contraseña se actualizo exitosamente.'}
        buttonMsg={'Entendido'}
        onClickButton={() => router.push('/profile/personal-data')}
      />

      <div className={profileNavStyles.profilePageContent}>
        <TitlePage align="left">Editar contraseña</TitlePage>

        <EditPasswordTemplate
          currPasswordError={wrongPassword}
          onUpdate={handleUpdatePassword}
          userId={user.uid}
        />
      </div>
    </div>
  );
};

export default withAuth(EditPasswordPage);
