import formatPrice from '../../../utils/formatPrice';

import styles from './PaymentDetails.module.scss';

export default function PaymentDetails({ pricePerDay, serviceFeePercentage }) {
  const priceDays = pricePerDay * 2;
  const serviceFee = Math.round(priceDays * serviceFeePercentage);

  return (
    <section className={styles.container}>
      <h5>Detalle del pago</h5>

      <div>
        <p>
          {formatPrice({
            price: pricePerDay,
            currencyDisplay: 'symbol',
          })}{' '}
          x 2 dias
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

      <div className={styles.total}>
        <p>Total</p>
        <p>
          {formatPrice({
            price: priceDays + serviceFee,
            currencyDisplay: 'symbol',
          })}
        </p>
      </div>
    </section>
  );
}
