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

const UserProfileLayout = ({ children, user, showName }) => {
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
    if (user) {
      const { firstName, lastName, profilePhoto } = user;
      setNameUser({ firstName, lastName });
      setPicture(profilePhoto);
    }
  }, [user]);

  return (
    <>
      <SwitchIndicator visible={showIndicator} />

      <main className={styles.container}>
        <div className={styles.desktopLayout}>
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
          <div className={styles.contentArea}>{children}</div>
        </div>
      </main>
    </>
  );
};

export default UserProfileLayout;
