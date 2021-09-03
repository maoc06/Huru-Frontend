import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { diffDays } from '../../../utils/formatDates';
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
  withDiscount = false,
  discountPerDay = 0,
  disabledDates = [],
}) {
  const serviceFeePercentage = 0.17;
  const router = useRouter();
  const travel = useTravelDates();
  const [days, setDays] = useState(countDays);

  const handleContinue = () => {
    router.push(`/car/confirmation/${encodeURIComponent(slug)}`);
  };

  const calcDays = () => {
    const dates = travel.getDates();

    const diff = diffDays({
      dateOne: dates.raw.start,
      dateTwo: dates.raw.end,
      type: 'SQL',
    });

    setDays(diff);
  };

  useEffect(() => {
    calcDays();
  }, [travel]);

  return (
    <section className={styles.panel}>
      {withDiscount && (
        <p className={styles.msgDiscount}>
          Descuento para vehículos amigables con medio ambiente.
        </p>
      )}

      <div className={`${withDiscount && styles.contentPrice}`}>
        {withDiscount && (
          <p className={`${styles.price} ${styles.discount}`}>
            ${Number(discountPerDay).toLocaleString('en')}
            <span>/día</span>
          </p>
        )}
        {/* {withDiscount && <p>{`Antes `}</p>} */}
        <p className={`${styles.price} ${withDiscount && styles.old}`}>
          ${Number(pricePerDay).toLocaleString('en')}
          {!withDiscount && <span>/día</span>}
        </p>
      </div>

      <DatesPanel compact={true} disabledDates={disabledDates} />

      <PaymentDetails
        showTitle={false}
        pricePerDay={pricePerDay}
        numberOfDays={days ? days : 2}
        serviceFeePercentage={serviceFeePercentage}
        withMargin={true}
        discountPerDay={discountPerDay}
        withDiscount={withDiscount}
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
