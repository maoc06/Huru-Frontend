import { useRouter } from 'next/router';
import styles from './ProfileNavBar.module.scss';

const BackArrowIcon = () => (
  <svg 
    width="48" 
    height="48" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M15 18L9 12L15 6" 
      stroke="currentColor" 
      strokeWidth="3.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export default function ProfileNavBar() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <header className={styles.profileNavBar}>
      <button 
        onClick={handleBack}
        className={styles.backButton}
        aria-label="Volver a la página anterior"
      >
        <BackArrowIcon />
      </button>
    </header>
  );
} 