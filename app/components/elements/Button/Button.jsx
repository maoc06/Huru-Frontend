import styles from './Button.module.scss';

export default function Button({
  type,
  children,
  onClick,
  isSecondary,
  marginTop,
  marginBottom,
  withTinyMarginBottom = false,
  invert = false,
  icon,
  withIcon = false,
  isRejectAction = false,
  tinyBorder = false,
  ...otherProps
}) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        {...otherProps}
        className={`${styles.baseButton} ${
          isSecondary ? styles.sencondaryButton : styles.primaryButton
        } ${invert && !isSecondary && styles.invertButton} ${
          marginTop && styles.margin_top
        } ${marginBottom && styles.margin_bottom} ${
          isRejectAction && styles.rejectButton
        } ${tinyBorder && styles.tinyBorder} ${
          withTinyMarginBottom && styles.withTinyMarginBottom
        }`}
      >
        {withIcon && icon}
        {children}
      </button>
    </>
  );
}
