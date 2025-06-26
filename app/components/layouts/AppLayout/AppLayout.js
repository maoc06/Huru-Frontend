import styles from './AppLayout.module.scss';
import LiquidBackground from '../../elements/LiquidBackground/LiquidBackground';

export default function AppLayout({
  children,
  isFullHeigh = true,
  withImage = true,
  centerContent = false,
  widthAdap = false,
  withLiquidBackground = false,
}) {
  const content = (
    <main
      className={`${styles.container} ${
        isFullHeigh ? styles.full : styles.inline
      } ${withImage && styles.with_image} ${
        centerContent && styles.center_content
      } ${widthAdap && styles.adapat} ${
        withLiquidBackground && styles.liquid_mode
      }`}
    >
      {children}
    </main>
  );

  if (withLiquidBackground) {
    return (
      <LiquidBackground>
        {content}
      </LiquidBackground>
    );
  }

  return <>{content}</>;
}
