import { useRouter } from 'next/router';

import Button from '../../elements/Button/Button';

import styles from './PriceBottomBar.module.scss';

export default function PriceBottomBar({ pricePerDay, total, slug }) {
  const router = useRouter();

  const handleContinue = () => {
    router.push(`/car/confirmation/${encodeURIComponent(slug)}`);
  };

  return (
    <main className={styles.container}>
      <div className={styles.price}>
        <p>
          ${Number(pricePerDay).toLocaleString('en')}/<span>día</span>
        </p>
        <p>${Number(total).toLocaleString('en')} total</p>
      </div>

      <div className={styles.button}>
        <Button onClick={handleContinue}>Continuar</Button>
      </div>
    </main>
  );
}
