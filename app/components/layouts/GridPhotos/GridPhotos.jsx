import styles from './GridPhotos.module.scss';

export default function GridPhotos({ children, className = '' }) {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.grid}>
        {children}
      </div>
    </div>
  );
}
