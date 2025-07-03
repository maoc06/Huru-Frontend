import Button from '../../elements/Button/Button';

import styles from './TwoBottons.module.scss';

export default function TwoBottons({
  affirmativeText,
  declinedText,
  onSelectAffirmative,
  onSelectDelcined,
  withBackground = true,
  withPadding = true,
  withMarginTop = false,
}) {
  return (
    <div
      className={`${styles.container} ${withPadding && styles.withPadding} ${
        withBackground && styles.withBackground
      } ${withMarginTop && styles.withMarginTop}`}
    >
      <Button onClick={onSelectAffirmative} className={styles.affirmativeButton}>{affirmativeText}</Button>

      <Button onClick={onSelectDelcined} isRejectAction={true}>
        {declinedText}
      </Button>
    </div>
  );
}
