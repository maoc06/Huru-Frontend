import styles from './Button.module.scss';

export default function Button({
  type,
  children,
  onClick,
  isSecondary,
  marginTop,
  marginBottom,
  invert = false,
  isRejectAction = false,
}) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`${styles.baseButton} ${
          isSecondary ? styles.sencondaryButton : styles.primaryButton
        } ${invert && !isSecondary && styles.invertButton} ${
          marginTop && styles.margin_top
        } ${marginBottom && styles.margin_bottom} ${
          isRejectAction && styles.rejectButton
        }`}
      >
        {children}
      </button>
    </>
  );
}
