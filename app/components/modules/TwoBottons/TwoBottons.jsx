import Button from '../../elements/Button/Button';

import styles from './TwoBottons.module.scss';

export default function TwoBottons({
  affirmativeText,
  declinedText,
  onSelectAffirmative,
  onSelectDelcined,
  withPadding = true,
  withBackground = true,
}) {
  return (
    <div
      className={`${styles.container} ${withPadding && styles.withPadding} ${
        withBackground && styles.withBackground
      }`}
    >
      <Button onClick={onSelectAffirmative}>{affirmativeText}</Button>

      <Button onClick={onSelectDelcined} isRejectAction={true}>
        {declinedText}
      </Button>
    </div>
  );
}
