import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { LogoColor } from '../../elements/Icons/Shared';
import Avatar from '../../elements/Avatar/Avatar';
import MenuDesktop from '../MenuDesktop/MenuDesktop';
import authStorage from '../../../utils/storageAuth';
import styles from './CarNavBar.module.scss';

export default function CarNavBar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showMenuDesktop, setShowMenuDesktop] = useState(false);

  const handleHome = () => {
    router.push('/');
  };

  const handleAvatar = () => {
    setShowMenuDesktop(!showMenuDesktop);
  };

  useEffect(() => {
    const resUser = authStorage.getUser();
    if (resUser) {
      setUser(resUser.info);
    }
  }, []);

  return (
    <nav className={styles.carNav}>
      <div className={styles.logoSection} onClick={handleHome}>
        <LogoColor />
      </div>

      <div className={styles.avatarSection} onClick={handleAvatar}>
        {user ? (
          <Avatar src={user.profilePicture} size="large" />
        ) : (
          <Avatar size="large" />
        )}
        {showMenuDesktop && (
          <div className={styles.menuDesktop}>
            <MenuDesktop user={user} />
          </div>
        )}
      </div>
    </nav>
  );
} 