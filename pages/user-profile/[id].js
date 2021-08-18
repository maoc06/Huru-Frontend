import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../app/hooks/useApi';
import carApi from '../../app/api/VehicleApi';
import userApi from '../../app/api/UserAPI';

import Divider from '../../app/components/elements/Divider/Divider';
import AppLayout from '../../app/components/layouts/AppLayout/AppLayout';
import ShowMoreText from '../../app/components/elements/ShowMoreText/ShowMoreText';
import ActivityIndicator from '../../app/components/elements/ActivityIndicator/ActivityIndicator';
import Button from '../../app/components/elements/Button/Button';
import SectionTitle from '../../app/components/elements/SectionTitle/SectionTitle';
import IndentityBadge from '../../app/components/modules/IndentityBadge/IndentityBadge';
import UserProfileBasicInfo from '../../app/components/modules/UserProfileBasicInfo/UserProfileBasicInfo';
import ScrollPanelCars from '../../app/components/modules/ScrollPanelCars/ScrollPanelCar';
import styles from './UserProfile.module.scss';

function ThridUserProfile() {
  const router = useRouter();
  const { id } = router.query;

  const getCars = useApi(carApi.findByOwner);
  const getUser = useApi(userApi.findUser);

  const [cars, setCars] = useState([]);
  const [user, setUser] = useState({});

  const handleGetUserCars = async (userId) => {
    const resCar = await getCars.request(userId);
    if (resCar.data.data) setCars(resCar.data.data);
  };

  const handleUserData = async (userId) => {
    const resUser = await getUser.request(userId);
    setUser(resUser.data.data);
  };

  useEffect(() => {
    if (id) {
      handleUserData(id);
      handleGetUserCars(id);
    }
  }, [id]);

  return (
    <div>
      <Head>
        <title>Usuario Huru</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ActivityIndicator visible={getUser.loading || getCars.loading} />

      <AppLayout withImage={false}>
        {user.constructor === Object && Object.keys(user).length > 0 && (
          <div className={styles.container}>
            <UserProfileBasicInfo
              userId={id}
              name={`${user.firstName} ${user.lastName}`}
              profilePicture={user.profilePhoto}
              createdAt={user.createdAt}
            />

            <Divider size="mediumTop" />

            <SectionTitle title="Verificación de identidad" />
            <IndentityBadge
              checked={user.isEmailVerified}
              title={
                user.isEmailVerified
                  ? 'Correo electrónico verificado'
                  : 'Correo electrónico sin verificar'
              }
            />
            <IndentityBadge
              checked={user.isPhoneVerified}
              title={
                user.isPhoneVerified
                  ? 'Número de teléfono verificado'
                  : 'Número de teléfono sin verificar'
              }
            />

            <Divider size="mediumTop" />

            <SectionTitle title={`Sobre ${user.firstName}`} />
            {user.about && (
              <ShowMoreText>
                <p>{user.about}</p>
              </ShowMoreText>
            )}
            {!user.about && (
              <span>{user.firstName} aún no ha escrito algo sobre él.</span>
            )}

            <Divider size="mediumTop" />

            <SectionTitle title={`Vehículos de ${user.firstName}`} />
            {cars.constructor === Array && cars.length > 0 && (
              <ScrollPanelCars cars={cars} />
            )}

            {cars.constructor === Array && cars.length === 0 && (
              <span>
                {user.firstName} no tiene ningun vehículo listado o visible
                dentro de la comunidad Huru.
              </span>
            )}

            <Divider size="mediumTop" />

            <Button
              invert={true}
              onClick={() => console.log('Reportar usuario')}
              marginTop={true}
            >
              Reportar usuario
            </Button>
          </div>
        )}
      </AppLayout>
    </div>
  );
}

export default ThridUserProfile;
