import parse from 'html-react-parser';

import styles from './CardSelectable.module.scss';

export default function CardSelectable({
  item,
  propKey,
  propValue,
  onSelect,
  isSelected,
  icon,
}) {
  const handleClick = () => {
    onSelect(item);
  };

  return (
    <div
      className={`${styles.container} ${isSelected ? styles.selected : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
      aria-pressed={isSelected}
    >
      <div className={styles.iconWrapper}>
        <div className={styles.iconContainer}>
          {icon && parse(icon)}
        </div>
      </div>
      <span className={styles.label}>{item[propValue]}</span>
    </div>
  );
}
