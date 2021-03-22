import TransmissionIcon from '../../elements/Icons/TrasmissionIcon';
import ChairIcon from '../../elements/Icons/ChairIcon';
import GasIcon from '../../elements/Icons/GasIcon';

import styles from './CarSpecifications.module.scss';

export default function CarSpecification({
  typeTransmission,
  numSeats,
  typeGas,
}) {
  return (
    <div className={styles.container}>
      <section>
        <TransmissionIcon />
        <p>{typeTransmission}</p>
      </section>

      <section>
        <ChairIcon />
        <p>{numSeats} sillas</p>
      </section>

      <section>
        <GasIcon />
        <p>{typeGas}</p>
      </section>
    </div>
  );
}
