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

  const [nameUser, setNameUser] = useState({ firstName: '', lastName: '' });
  const [picture, setPicture] = useState(null);

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

  useEffect(() => {
    const { firstName, lastName, profilePicture } = user;
    setNameUser({ firstName, lastName });
    setPicture(profilePicture);
  }, [user]);

  return (
    <>
      <SwitchIndicator visible={showIndicator} />

      <main className={styles.container}>
        {/* Desktop Layout with Image Panel */}
        <div className={styles.desktopLayout}>
          {/* Left Image Panel - Desktop Only */}
          <div className={styles.imagePanel}>
            <div className={styles.imagePanelContent}>
              <picture>
                <source 
                  media="(min-width: 1920px)" 
                  srcSet="/images/payment-methods-panel-pic.jpg"
                />
                <source 
                  media="(min-width: 1200px)" 
                  srcSet="/images/payment-methods-panel-pic.jpg"
                />
                <img
                  src="/images/payment-methods-panel-pic.jpg"
                  alt="Perfil de usuario"
                  className={styles.panelImage}
                  loading="eager"
                  decoding="async"
                />
              </picture>
            </div>
          </div>

          {/* Right Content Area */}
          <div className={styles.contentArea}>
            <div className={styles.wrapper}>
              <header>
                <Avatar src={picture} />
                <h5>
                  {nameUser.firstName} {nameUser.lastName}
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserProfile;
