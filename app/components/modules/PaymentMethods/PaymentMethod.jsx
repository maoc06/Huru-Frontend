import CheckedIcon from '../../elements/Icons/CheckedIcon';
import { paymentMethodsIcons } from '../../../utils/enums';

import styles from './PaymentMethod.module.scss';

export default function PaymentMethod({
  brand,
  number,
  isDefault,
  isCompact = false,
}) {
  return (
    <main
      className={`${styles.container} ${
        isCompact ? styles.container_compact : styles.container_full
      }`}
    >
      <div className={styles.brand}>{paymentMethodsIcons[brand]}</div>

      <div className={styles.number}>
        {brand !== 'NEQUI' ? <p>**** **** **** {number}</p> : <p>{number}</p>}
      </div>

      {!isCompact && (
        <div className={styles.select}>
          {isDefault ? <CheckedIcon /> : <div />}
        </div>
      )}
    </main>
  );
}
