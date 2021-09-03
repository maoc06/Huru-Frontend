import { useEffect, useState } from 'react';

import Divider from '../../elements/Divider/Divider';
import DatesPanel from '../../modules/DatesPanel/DatesPanel';
import AppLayout from '../../layouts/AppLayout/AppLayout';
import styles from './CanceledBookingDetailsTemplate.module.scss';

const CanceledBookingDetailsTemplate = ({
  bookingDates,
  title = '',
  type = 7,
}) => {
  const [typeText, setTypeText] = useState('Cancelada');

  useEffect(() => {
    getTypeText();
  }, []);

  const getTypeText = () => {
    switch (type) {
      case 6:
        setTypeText('Rechazada');
        break;
      case 7:
        setTypeText('Cancelada');
        break;
      default:
        break;
    }
  };

  return (
    <AppLayout withImage={false} isFullHeigh={false}>
      <div className={styles.container}>
        <h4 className={styles.title}>
          {`La reserva del ${title} fue `}
          <span className={styles.cancel}>{typeText}</span>
        </h4>

        <Divider size="mediumTop" />

        <h6>Marco de tiempo</h6>
        <DatesPanel paramDates={bookingDates} clickleable={false} />

        {/* <Divider size="mediumTop" />

        <h6>Reembolso</h6> */}
      </div>
    </AppLayout>
  );
};

export default CanceledBookingDetailsTemplate;
