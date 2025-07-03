import { CheckedIcon } from '../../elements/Icons/Shared';
import { paymentMethodsIcons } from '../../../utils/enums';

import styles from './PaymentMethod.module.scss';

export default function PaymentMethod({
  brand,
  number,
  isDefault,
  isCompact = false,
  isModern = false,
  cardHolder = null,
  expiryDate = null,
}) {
  // Define gradient colors for different card brands
  const getCardGradient = (brand) => {
    const gradients = {
      'VISA': 'visa',
      'MASTERCARD': 'mastercard', 
      'AMEX': 'amex',
      'NEQUI': 'nequi',
    };
    return gradients[brand] || 'default';
  };

  const cardNumber = brand !== 'NEQUI' ? `**** **** **** ${number}` : number;

  if (isModern) {
    return (
      <div className={`${styles.modernCard} ${styles[getCardGradient(brand)]}`}>
        {/* Default Badge */}
        {isDefault && (
          <div className={styles.defaultBadge}>
            <CheckedIcon />
            <span>Principal</span>
          </div>
        )}

        {/* Card Content */}
        <div className={styles.modernCardContent}>
          {/* Top Section */}
          <div className={styles.modernCardTop}>
            <div className={styles.modernBrandIcon}>
              {paymentMethodsIcons[brand]}
            </div>
            <div className={styles.modernBrandName}>
              {brand === 'NEQUI' ? 'Nequi' : brand}
            </div>
          </div>

          {/* Card Number */}
          <div className={styles.modernCardNumber}>
            <span>{cardNumber}</span>
          </div>

          {/* Bottom Section */}
          <div className={styles.modernCardBottom}>
            <div className={styles.modernCardInfo}>
              {cardHolder && brand !== 'NEQUI' && (
                <div className={styles.modernCardHolder}>
                  <div className={styles.modernCardLabel}>TITULAR</div>
                  <div className={styles.modernCardValue}>{cardHolder}</div>
                </div>
              )}
              <div className={styles.modernCardType}>
                {brand === 'NEQUI' ? 'Billetera digital' : 'Tarjeta de crédito'}
              </div>
            </div>
            
            {expiryDate && brand !== 'NEQUI' && (
              <div className={styles.modernCardExpiry}>
                <div className={styles.modernCardLabel}>VENCE</div>
                <div className={styles.modernCardValue}>{expiryDate}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Legacy design for backward compatibility
  return (
    <main
      className={`${styles.container} ${
        isCompact ? styles.container_compact : styles.container_full
      }`}
    >
      <div className={styles.brand}>{paymentMethodsIcons[brand]}</div>

      <div className={styles.number}>
        <p>{cardNumber}</p>
      </div>

      {!isCompact && (
        <div className={styles.select}>
          {isDefault ? <CheckedIcon /> : <div />}
        </div>
      )}
    </main>
  );
}
