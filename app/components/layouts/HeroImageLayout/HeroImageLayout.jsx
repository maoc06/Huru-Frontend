import styles from './HeroImageLayout.module.scss';

export default function HeroImageLayout({ children, heroSrc }) {
  return (
    <>
      <main
        className={`${styles.container}`}
        style={{
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${heroSrc})`,
        }}
      >
        {children}
      </main>
    </>
  );
}
