import { useEffect, useState } from 'react';

import { lastDay } from '../../../utils/formatDates';
import useTravelDates from '../../../hooks/useTravelDates';
import SeeAll from '../../elements/SeeAll/SeeAll';
import SectionTitle from '../../elements/SectionTitle/SectionTitle';

import styles from './PolicyCancellationSection.module.scss';

const PolicyCancellationSection = ({
  contentLimit = true,
  showSeeMore = true,
  showTitle = true,
}) => {
  const travel = useTravelDates();
  const [dateFreeCancellation, setDateFreeCancellation] = useState({});

  useEffect(() => {
    const dates = travel.getDates();
    const compundLastDate = lastDay({
      date: dates.raw.start,
      outputFormat: 'compound',
    });
    setDateFreeCancellation(compundLastDate);
  }, []);

  return (
    <>
      {showTitle && <SectionTitle title="Políticas de cancelación" />}

      <p className={`${styles.content} ${contentLimit && styles.limit}`}>
        {`Si cancelas antes de las ${dateFreeCancellation.time} del ${dateFreeCancellation.date}, recibiras un reembolso
            completo, según excepciones y condiciones.`}
      </p>

      {showSeeMore && (
        <SeeAll text="Ver detalles" href="/car/details/cancellation-policy" />
      )}
    </>
  );
};

export default PolicyCancellationSection;
