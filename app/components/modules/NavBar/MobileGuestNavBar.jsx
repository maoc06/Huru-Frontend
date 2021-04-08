import Link from 'next/link';

import SearchIcon from '../../elements/Icons/SearchIcon';
import FavotiteIcon from '../../elements/Icons/FavoriteIcon';
import CarIcon from '../../elements/Icons/CarIcon';
import ProfileIcon from '../../elements/Icons/ProfileIcon';

import styles from './MobileNavBar.module.scss';

export default function MobileGuestNavBar({ isAuth }) {
  return (
    <nav className={styles.mobileNav}>
      <Link href="/">
        <a className={styles.item}>
          <SearchIcon />
          <p>Explorar</p>
        </a>
      </Link>

      {isAuth && (
        <Link href="/trips">
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
  );
}
