import { useState } from 'react';
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

import useMood from '../../../hooks/useMood';
import useAuth from '../../../hooks/useAuth';

import Avatar from '../../elements/Avatar/Avatar';
import ListItem from '../../elements/List/ListItem';
import AppSwitch from '../../elements/Switch/Switch';
import SwitchIndicator from '../../elements/SwitchIndicator/SwitchIndicator';

import styles from './UserProfile.module.scss';

const UserProfile = ({ user, isHostMood }) => {
  const app = useMood();
  const auth = useAuth();
  const router = useRouter();
  const [showIndicator, setShowIndicator] = useState(false);

  const { firstName, lastName, profilePicture } = user;

  const handleLogOut = () => {
    auth.logOut();
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
      <SwitchIndicator visible={showIndicator} />

      <main className={styles.wrapper}>
        <header>
          <Avatar src={profilePicture} />
          <h5>
            {firstName} {lastName}
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
              onSelectNotLink={handleSwitchMood}
              icon={<AppSwitch name="mood" checked={isHostMood} />}
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
      </main>
    </>
  );
};

export default UserProfile;
