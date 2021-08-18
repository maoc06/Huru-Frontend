import formatPrice from '../../../utils/formatPrice';
import styles from './PaymentDetails.module.scss';

export default function PaymentDetails({
  pricePerDay,
  serviceFeePercentage,
  numberOfDays = 2,
  showTitle = true,
  withMargin = false,
  withDiscount = false,
  discountPerDay = 0,
}) {
  const priceDays = pricePerDay * numberOfDays;
  const serviceFee = Math.round(priceDays * serviceFeePercentage);

  return (
    <section className={`${styles.container} ${withMargin && styles.margin}`}>
      {showTitle && <h5>Detalle del pago</h5>}

      <div>
        <p>
          {formatPrice({
            price: pricePerDay,
            currencyDisplay: 'symbol',
          })}{' '}
          x {numberOfDays} {numberOfDays > 1 ? 'dias' : 'dia'}
        </p>
        <p>
          {formatPrice({
            price: priceDays,
            currencyDisplay: 'symbol',
          })}
        </p>
      </div>

      <div>
        <p>Tarifa de servicio</p>
        <p>
          {formatPrice({
            price: serviceFee,
            currencyDisplay: 'symbol',
          })}
        </p>
      </div>

      {withDiscount && (
        <div>
          <p>Sub-Total</p>
          <p>
            {formatPrice({
              price: priceDays + serviceFee,
              currencyDisplay: 'symbol',
            })}
          </p>
        </div>
      )}

      {withDiscount && (
        <div className={styles.discount}>
          <p>Dcto. eco-friendly</p>
          <p>
            -
            {formatPrice({
              price: priceDays - discountPerDay * numberOfDays,
              currencyDisplay: 'symbol',
            })}
          </p>
        </div>
      )}

      <div className={styles.total}>
        <p>Total</p>
        {!withDiscount ? (
          <p>
            {formatPrice({
              price: priceDays + serviceFee,
              currencyDisplay: 'symbol',
            })}
          </p>
        ) : (
          <p>
            {formatPrice({
              price:
                priceDays +
                serviceFee -
                (priceDays - discountPerDay * numberOfDays),
              currencyDisplay: 'symbol',
            })}
          </p>
        )}
      </div>
    </section>
  );
}
