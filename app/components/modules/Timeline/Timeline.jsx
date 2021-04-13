import {
  CarIcon,
  CheckedIcon,
  RefundIcon,
  ReturnIcon,
} from '../../elements/Icons/Shared';
import {
  getDayBefore,
  formatSimpleFullDate,
} from '../../../utils/formatFullDate';
import TimelineElement from '../../elements/TimelineElement/TimelineElement';

import styles from './Timeline.module.scss';

function Timeline({ checkin, checkout }) {
  return (
    <main className={styles.wrapper}>
      <ul>
        <TimelineElement
          title="Reserva confirmada"
          icon={<CheckedIcon />}
          isFirstElement={true}
        />

        <TimelineElement
          title={getDayBefore(checkin)}
          subtitle={[
            'Reembolso total.',
            '24 horas antes del inicio del viaje.',
          ]}
          showLink={true}
          linkText="Ver en detalle las políticas de cancelación."
          href="https://www.notion.so/Pol-ticas-de-cancelaci-n-f09dae6913d44386b4ef9cc6c6a14b27"
          backgroundColor="yellow"
          icon={<RefundIcon width={15} height={15} />}
        />

        <TimelineElement
          title={formatSimpleFullDate(checkin)}
          subtitle={['Recibir el vehículo e iniciar el viaje.']}
          backgroundColor="red"
          icon={<CarIcon width={15} height={15} color="#E7ECF3" />}
        />

        <TimelineElement
          title={formatSimpleFullDate(checkout)}
          subtitle={['Devolver el vehículo al dueño.']}
          backgroundColor="red"
          icon={<ReturnIcon width={15} height={15} />}
        />
      </ul>
    </main>
  );
}

export default Timeline;
