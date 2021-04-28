import Link from 'next/link';

import {
  CarIcon,
  FavoriteIcon,
  ProfileIcon,
  SearchIcon,
} from '../../elements/Icons/Shared';

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

      <Link href="/favorites">
        <a className={styles.item}>
          <FavoriteIcon />
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
