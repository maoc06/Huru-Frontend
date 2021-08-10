import { useEffect, useState } from 'react';

import useMood from '../../../hooks/useMood';

import MobileGuestNavBar from '../../modules/NavBar/MobileGuestNavBar';
import MobileHostNavBar from '../../modules/NavBar/MobileHostNavBar';

import storageAuth from '../../../utils/storageAuth';

import styles from './NavBarLayout.module.scss';

export default function NavBarLayout({ children }) {
  const app = useMood();
  const [isHostMood, setIsHostMood] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [showHideMobileNavbar, setShowHideMobileNavbar] = useState(true);

  useEffect(() => {
    const user = storageAuth.getUser();
    if (user) setIsAuth(true);

    if (window.innerWidth > 720) setShowHideMobileNavbar(false);

    // listen window resize
    window.addEventListener('resize', () => {
      // keyboard popup on mobile -> bottom navbar hide
      if (window.innerHeight <= 450) {
        setShowHideMobileNavbar(false);
      } else {
        setShowHideMobileNavbar(true);
      }

      // responsive
      if (window.innerWidth > 720) setShowHideMobileNavbar(false);
    });

    setIsHostMood(app.getMood());
  }, []);

  const renderNavBar = () => {
    if (!isHostMood) {
      return <MobileGuestNavBar isAuth={isAuth} />;
    } else {
      return <MobileHostNavBar />;
    }
  };

  return (
    <>
      <main>{children}</main>

      {showHideMobileNavbar && renderNavBar()}
    </>
  );
}
