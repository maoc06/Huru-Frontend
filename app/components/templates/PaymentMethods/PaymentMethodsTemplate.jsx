import Link from 'next/link';

import PaymentMethod from '../../modules/PaymentMethods/PaymentMethod';
import AddPaymentMethodButton from '../../elements/Button/AddPaymentMethodButton';

import styles from './PaymentMethodsTemplate.module.scss';

const PaymentMethodTemplate = ({ list }) => {
  return (
    <section className={styles.container}>
      {list.length === 0 && (
        <p className={styles.empty}>
          Aún no tienes vinculado un metodo de pago.
        </p>
      )}

      {list.map(({ id, type, brand, lastFour, phone, isDefault }) => {
        return (
          <Link href={`/profile/payment-methods/edit/${id}`} key={id}>
            <a>
              <PaymentMethod
                brand={type === 'CARD' ? brand : 'NEQUI'}
                number={type === 'CARD' ? lastFour : phone}
                isDefault={isDefault}
              />
            </a>
          </Link>
        );
      })}
      <AddPaymentMethodButton />
    </section>
  );
};

export default PaymentMethodTemplate;
