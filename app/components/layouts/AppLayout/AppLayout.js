import styles from './AppLayout.module.scss';

export default function AppLayout({ children, isFullHeigh = true }) {
  return (
    <>
      <main
        className={`${styles.container} ${
          isFullHeigh ? styles.full : styles.inline
        }`}
      >
        {children}
      </main>
    </>
  );
}
