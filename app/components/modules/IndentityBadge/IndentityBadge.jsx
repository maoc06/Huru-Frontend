import { CheckedIcon } from '../../elements/Icons/Shared';

import styles from './IndentityBadge.module.scss';

export default function IndentityBadge({ checked, title }) {
  return (
    <section className={styles.container}>
      <div className={`${styles.check} ${!checked && styles.checkEmpty}`}>
        {checked && <CheckedIcon height={16} width={16} />}
      </div>

      <p className={`${!checked && styles.notVerified}`}>{title}</p>
    </section>
  );
}
