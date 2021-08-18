import styles from './AppLayout.module.scss';

export default function AppLayout({
  children,
  isFullHeigh = true,
  withImage = true,
  centerContent = false,
  widthAdap = false,
}) {
  return (
    <>
      <main
        className={`${styles.container} ${
          isFullHeigh ? styles.full : styles.inline
        } ${withImage && styles.with_image} ${
          centerContent && styles.center_content
        } ${widthAdap && styles.adapat}`}
      >
        {children}
      </main>
    </>
  );
}
