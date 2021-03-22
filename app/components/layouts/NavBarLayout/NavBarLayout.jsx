import { useEffect, useState } from 'react';
import Link from 'next/link';

import SearchIcon from '../../elements/Icons/SearchIcon';
import FavotiteIcon from '../../elements/Icons/FavoriteIcon';
import CarIcon from '../../elements/Icons/CarIcon';
import ProfileIcon from '../../elements/Icons/ProfileIcon';

import storageAuth from '../../../utils/storageAuth';

import styles from './NavBarLayout.module.scss';

export default function NavBarLayout({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [showHideMobileNavbar, setShowHideMobileNavbar] = useState(true);

  useEffect(() => {
    const user = storageAuth.getUser();
    if (user) setIsAuth(true);

    // listen window resize (keyboard popup on mobile -> bottom navbar hide)
    window.addEventListener('resize', () => {
      if (window.innerHeight <= 450) {
        setShowHideMobileNavbar(false);
      } else {
        setShowHideMobileNavbar(true);
      }
    });
  }, []);

  return (
    <>
      <main>{children}</main>

      {showHideMobileNavbar && (
        <nav className={styles.mobileNav}>
          <Link href="/">
            <a className={styles.item}>
              <SearchIcon />
              <p>Explorar</p>
            </a>
          </Link>

          {isAuth && (
            <Link href="/">
              <a className={styles.item}>
                <CarIcon />
                <p>Viajes</p>
              </a>
            </Link>
          )}

          <Link href="/">
            <a className={styles.item}>
              <FavotiteIcon />
              <p>Favoritos</p>
            </a>
          </Link>

          {isAuth && (
            <Link href="/profile">
              <a className={styles.item}>
                <ProfileIcon />
                <p>Perfil</p>
              </a>
            </Link>
          )}

          {!isAuth && (
            <Link href="/signin">
              <a className={styles.item}>
                <ProfileIcon />
                <p>Iniciar sesión</p>
              </a>
            </Link>
          )}
        </nav>
      )}
    </>
  );
}
