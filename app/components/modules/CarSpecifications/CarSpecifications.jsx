import TransmissionIcon from '../../elements/Icons/TrasmissionIcon';
import ChairIcon from '../../elements/Icons/ChairIcon';
import SectionTitle from '../../elements/SectionTitle/SectionTitle';
import GasIcon from '../../elements/Icons/GasIcon';

import styles from './CarSpecifications.module.scss';

export default function CarSpecification({
  typeTransmission,
  numSeats,
  typeGas,
  title,
}) {
  return (
    <>
      {title && <SectionTitle title={title} />}

      <div className={styles.container}>
        <div className={styles.badge}>
          <ChairIcon color="#282828" width="16" height="16" />
          <span>{numSeats} asientos</span>
        </div>

        <div className={styles.badge}>
          <GasIcon color="#282828" width="16" height="16" />
          <span>{typeGas}</span>
        </div>

        <div className={styles.badge}>
          <TransmissionIcon color="#282828" width="16" height="16" />
          <span>{typeTransmission}</span>
        </div>
      </div>
    </>
  );
}
