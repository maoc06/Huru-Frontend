import styles from './CardSelectable.module.scss';

export default function CardSelectable({
  withIcon = false,
  icon,
  title,
  selected,
  lightBackground = false,
}) {
  return (
    <div
      className={`${styles.card} ${lightBackground && styles.lightBg} ${
        selected && styles.selected
      }`}
    >
      {withIcon && <div className={styles.icon}>{icon}</div>}

      <span>{title}</span>
    </div>
  );
}
