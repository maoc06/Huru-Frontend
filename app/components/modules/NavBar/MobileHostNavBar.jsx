import Link from 'next/link';
import { EqualizerOutlined, CalendarTodayOutlined } from '@material-ui/icons';

import { CarIcon, ProfileIcon } from '../../elements/Icons/Shared';

import styles from './MobileNavBar.module.scss';

export default function MobileHostNavBar({}) {
  return (
    <nav className={styles.mobileNav}>
      <Link href="/">
        <a className={styles.item}>
          <EqualizerOutlined />
          <p>Desempeño</p>
        </a>
      </Link>

      <Link href="/">
        <a className={styles.item}>
          <CalendarTodayOutlined />
          <p>Calendario</p>
        </a>
      </Link>

      <Link href="/">
        <a className={styles.item}>
          <CarIcon />
          <p>Vehículos</p>
        </a>
      </Link>

      <Link href="/profile">
        <a className={styles.item}>
          <ProfileIcon />
          <p>Perfil</p>
        </a>
      </Link>
    </nav>
  );
}
