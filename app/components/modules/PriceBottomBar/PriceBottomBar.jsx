import Button from '../../elements/Button/Button';

import styles from './PriceBottomBar.module.scss';

export default function PriceBottomBar({ pricePerDay, total }) {
  return (
    <main className={styles.container}>
      <div className={styles.price}>
        <p>
          ${Number(pricePerDay).toLocaleString('en')}/<span>día</span>
        </p>
        <p>${Number(total).toLocaleString('en')} total</p>
      </div>

      <div className={styles.button}>
        <Button>Continuar</Button>
      </div>
    </main>
  );
}
