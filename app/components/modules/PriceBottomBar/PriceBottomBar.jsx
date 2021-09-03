import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import useTravelDates from '../../../hooks/useTravelDates';

import Button from '../../elements/Button/Button';

import { diffDays } from '../../../utils/formatDates';

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
  }, [pricePerDay, travel]);

  const calcTotal = () => {
    let {
      raw: { start, end },
    } = travel.getDates();

    if (!start.toString().includes('T'))
      start = DateTime.fromSQL(start).toISO();
    if (!end.toString().includes('T')) end = DateTime.fromSQL(end).toISO();

    const days = diffDays({ dateOne: start, dateTwo: end, type: 'ISO' });
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
