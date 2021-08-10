import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useTravelDates from '../../../hooks/useTravelDates';

import Button from '../../elements/Button/Button';
import DatesPanel from '../DatesPanel/DatesPanel';
import PaymentDetails from '../PaymentDetails/PaymentDetails';
import styles from './CarDesktopPanel.module.scss';

function CarDesktopPanel({
  slug,
  pricePerDay,
  countDays = 2,
  disableBooking,
  disabledMessage,
}) {
  const router = useRouter();
  const travel = useTravelDates();
  const serviceFeePercentage = 0.17;

  const handleContinue = () => {
    router.push(`/car/confirmation/${encodeURIComponent(slug)}`);
  };

  // const dates = () => {
  //   let {
  //     raw: { start, end },
  //   } = travel.getDates();
  // };

  // useEffect(() => {
  //   // if (pricePerDay) calcTotal();
  // }, [pricePerDay]);

  return (
    <section className={styles.panel}>
      <p className={styles.price}>
        ${Number(pricePerDay).toLocaleString('en')}
        <span>/día</span>
      </p>

      <DatesPanel compact={true} />

      <PaymentDetails
        showTitle={false}
        pricePerDay={pricePerDay}
        numberOfDays={countDays ? countDays : 2}
        serviceFeePercentage={serviceFeePercentage}
        withMargin={true}
      />

      <div className={styles.button}>
        <Button
          marginTop={true}
          onClick={handleContinue}
          isDisabled={disableBooking}
          disabledMessage={disabledMessage}
        >
          Continuar
        </Button>
      </div>
    </section>
  );
}

export default CarDesktopPanel;
