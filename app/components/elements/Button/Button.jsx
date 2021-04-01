import styles from './Button.module.scss';

export default function Button({
  type,
  children,
  onClick,
  isSecondary,
  marginTop,
  marginBottom,
  invert = false,
}) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`${styles.baseButton} ${
          isSecondary ? styles.sencondaryButton : styles.primaryButton
        } ${invert && styles.invertButton} ${marginTop && styles.margin_top} ${
          marginBottom && styles.margin_bottom
        }`}
      >
        {children}
      </button>
    </>
  );
}
