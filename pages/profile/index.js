import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {
  PersonOutlineOutlined,
  LocalAtmOutlined,
  InfoOutlined,
  SecurityOutlined,
  HelpOutlineOutlined,
  ExitToAppOutlined,
} from '@material-ui/icons';

import useMood from '../../app/hooks/useMood';
import useAuth from '../../app/hooks/useAuth';
import withAuth from '../../app/HOC/withAuth';

import ProfileNavBar from '../../app/components/modules/NavBar/ProfileNavBar';
import UserProfileLayout from '../../app/components/templates/UserProfile/UserProfile';
import Avatar from '../../app/components/elements/Avatar/Avatar';
import ListItem from '../../app/components/elements/List/ListItem';
import AppSwitch from '../../app/components/elements/Switch/Switch';
import SwitchIndicator from '../../app/components/elements/SwitchIndicator/SwitchIndicator';

import authStorage from '../../app/utils/storageAuth';
import styles from '../../app/components/templates/UserProfile/UserProfile.module.scss';

const Profile = () => {
  const app = useMood();
  const auth = useAuth();
  const router = useRouter();
  const [user, setUser] = useState({});
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) setUser(user.info);
  }, []);

  const handleLogOut = () => {
    auth.logOut();
    if (window.FB) window.FB.logout();
    router.push('/');
  };

  const handleSwitchMood = () => {
    app.setMood();
    setShowIndicator(true);
    setTimeout(() => {
      setShowIndicator(false);
      router.push('/');
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>Huru | Perfil de usuario</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ProfileNavBar />
      <SwitchIndicator visible={showIndicator} />

      <UserProfileLayout user={user}>
        <div className={styles.wrapper}>
          <header>
            <Avatar src={user?.profilePhoto} />
            <h5>
              {user?.firstName} {user?.lastName}
            </h5>
          </header>

          <section>
            <h6>Configuración de la cuenta</h6>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem
                text="Información personal"
                icon={<PersonOutlineOutlined />}
                href="/profile/personal-data"
              />
              <Divider />
              <ListItem
                text="Metodos de pago"
                icon={<LocalAtmOutlined />}
                href="/profile/payment-methods"
              />
              <Divider />
              <ListItem
                text="Modo Anfitrion"
                isLink={false}
                icon={<AppSwitch name="mood" checked={app.mood} onChangeState={handleSwitchMood} />}
              />
              <Divider />
            </List>
          </section>

          <section>
            <h6>Soporte</h6>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem text="¿Cómo funciona Huru?" icon={<InfoOutlined />} />
              <Divider />
              <ListItem text="Centro de seguridad" icon={<SecurityOutlined />} />
              <Divider />
              <ListItem text="Ayuda" icon={<HelpOutlineOutlined />} />
              <Divider />
            </List>
          </section>

          <section onClick={handleLogOut}>
            <ListItem
              text="Cerrar sesión"
              isLink={false}
              icon={<ExitToAppOutlined />}
              onSelectNotLink={handleLogOut}
            />
          </section>
        </div>
      </UserProfileLayout>
    </>
  );
};

export default withAuth(Profile);
