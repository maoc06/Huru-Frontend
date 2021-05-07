import styles from './CardSelectable.module.scss';

export default function CardSelectable({
  withIcon = false,
  icon,
  title,
  selected,
}) {
  return (
    <div className={`${styles.card} ${selected && styles.selected}`}>
      {withIcon && <div className={styles.icon}>{icon}</div>}

      <span>{title}</span>
    </div>
  );
}
