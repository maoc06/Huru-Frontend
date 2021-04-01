import Link from 'next/link';

import EquisIcon from '../Icons/EquisIcon';

import styles from './AddPaymentMethodButton.module.scss';

export default function AddPaymentMethodButton() {
  return (
    <main className={styles.container}>
      <Link href="/profile/payment-methods/create">
        <a>
          <EquisIcon />
          <p>Agregar metodo de pago</p>
        </a>
      </Link>
    </main>
  );
}
