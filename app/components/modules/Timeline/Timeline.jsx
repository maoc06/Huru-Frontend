import { useEffect, useState } from 'react';

import useTravelDates from '../../../hooks/useTravelDates';
import {
  CarIcon,
  CheckedIcon,
  RefundIcon,
  ReturnIcon,
} from '../../elements/Icons/Shared';
import { formatFullDate, lastDay } from '../../../utils/formatDates';
import TimelineElement from '../../elements/TimelineElement/TimelineElement';

import styles from './Timeline.module.scss';

function Timeline({ checkin, checkout, initialStage = 1 }) {
  let type = 'SQL';
  const travel = useTravelDates();
  const [dates, setDates] = useState({
    start: checkin,
    end: checkout,
    type: 'ISO',
  });

  useEffect(() => {
    if (!checkin || !checkout) {
      const defaultDates = travel.getDates();
      if (defaultDates.raw.start.includes('T')) type = 'ISO';
      setDates({
        ...dates,
        start: defaultDates.raw.start,
        end: defaultDates.raw.end,
        type,
      });
    }
  }, []);

  return (
    <main
      className={`${styles.wrapper} ${
        initialStage === 2 && styles.approvedStage
      } ${initialStage === 3 && styles.refundStage} ${
        initialStage === 4 && styles.startStage
      } ${initialStage === 5 && styles.finishStage}`}
    >
      <ul>
        <TimelineElement
          title="Reserva confirmada"
          icon={
            <CheckedIcon color={initialStage >= 2 ? '#00b349' : '#070d9a'} />
          }
          isFirstElement={true}
        />

        <TimelineElement
          title={lastDay({ date: dates.start, type: dates.type })}
          subtitle={[
            'Reembolso total.',
            '24 horas antes del inicio del viaje.',
          ]}
          showLink={true}
          linkText="Ver en detalle las políticas de cancelación."
          href="https://www.notion.so/Pol-ticas-de-cancelaci-n-f09dae6913d44386b4ef9cc6c6a14b27"
          backgroundColor={initialStage >= 3 ? 'green' : 'yellow'}
          icon={<RefundIcon width={15} height={15} />}
        />

        <TimelineElement
          title={formatFullDate({ date: dates.start, type: dates.type })}
          subtitle={['Recibir el vehículo e iniciar el viaje.']}
          backgroundColor={initialStage >= 4 ? 'green' : 'red'}
          icon={<CarIcon width={15} height={15} color="#E7ECF3" />}
        />

        <TimelineElement
          title={formatFullDate({ date: dates.end, type: dates.type })}
          subtitle={['Devolver el vehículo al dueño.']}
          backgroundColor={initialStage === 5 ? 'green' : 'red'}
          icon={<ReturnIcon width={15} height={15} />}
        />
      </ul>
    </main>
  );
}

export default Timeline;
