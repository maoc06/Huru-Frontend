import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { FillStartIcon } from '../../elements/Icons/Shared';
import { materialTextAreaStyles } from '../../../styles/material/textarea';

import styles from './ReviewInHistory.module.scss';

export default function ReviewInHistory({
  comment,
  rating,
  isForCar = true,
  guest = '',
}) {
  const classes = materialTextAreaStyles();

  return (
    <main className={styles.container}>
      <h6 className={styles.title}>
        {isForCar ? 'Tu opinión de este vehículo' : `Tu opinion de ${guest}`}
      </h6>

      <p>
        {`Lo valoraste con `}

        <span>
          <FillStartIcon height={15} width={15} />
        </span>

        <span className={styles.rating}>{rating.toFixed(1)}</span>
      </p>

      <TextareaAutosize
        name={'comment'}
        value={comment}
        aria-label="minimum height"
        rowsMin={3}
        rowsMax={10}
        className={classes.formControl}
        disabled={true}
      />
    </main>
  );
}
