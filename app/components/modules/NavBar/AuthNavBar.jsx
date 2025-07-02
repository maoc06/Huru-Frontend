import { useRouter } from 'next/router';

import { LogoColor } from '../../elements/Icons/Shared';
import styles from './AuthNavBar.module.scss';

export default function AuthNavBar() {
  const router = useRouter();

  const handleHome = () => {
    router.push('/');
  };

  return (
    <nav className={styles.authNav}>
      <div className={styles.logoSection} onClick={handleHome}>
        <LogoColor />
      </div>
    </nav>
  );
} 