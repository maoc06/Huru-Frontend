import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import useTravelDates from '../../../hooks/useTravelDates';

import Button from '../../elements/Button/Button';

import { getDiffDates } from '../../../utils/formatFullDate';

import styles from './PriceBottomBar.module.scss';

export default function PriceBottomBar({
  pricePerDay,
  slug,
  disableBooking = true,
  disabledMessage = '',
}) {
  const router = useRouter();
  const travel = useTravelDates();

  const [total, setTotal] = useState(1);

  useEffect(() => {
    if (pricePerDay) calcTotal();
  }, [pricePerDay]);

  const calcTotal = () => {
    const {
      raw: { start, end },
    } = travel.getDates();

    const days = getDiffDates(start, end);
    const calc = pricePerDay * days;

    setTotal(calc);
  };

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
        <Button
          onClick={handleContinue}
          isDisabled={disableBooking}
          disabledMessage={disabledMessage}
        >
          Continuar
        </Button>
      </div>
    </main>
  );
}
