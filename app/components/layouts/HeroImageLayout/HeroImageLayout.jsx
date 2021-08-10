import styles from './HeroImageLayout.module.scss';

export default function HeroImageLayout({ children }) {
  return (
    <main className={`${styles.container}`}>
      <div className={styles.hero} />
      {children}
    </main>
  );
}
