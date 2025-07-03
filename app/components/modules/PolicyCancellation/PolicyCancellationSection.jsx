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
    let type = 'SQL';
    const dates = travel.getDates();

    if (dates.raw.start.includes('T')) type = 'ISO';

    const compundLastDate = lastDay({
      date: dates.raw.start,
      outputFormat: 'compound',
      type,
    });
    setDateFreeCancellation(compundLastDate);
  }, []);

  const PolicyIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const ClockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const RefundIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2V6L16 2L12 2Z" fill="currentColor"/>
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="currentColor"/>
      <path d="M9 16L15 10M15 16L9 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  return (
    <div className={styles.policyContainer}>
      {showTitle && (
        <div className={styles.titleSection}>
          <PolicyIcon />
          <SectionTitle title="Políticas de cancelación" />
        </div>
      )}

      <div className={styles.policyContent}>
        <div className={styles.mainPolicy}>
          <div className={styles.policyHighlight}>
            <div className={styles.iconWrapper}>
              <ClockIcon />
            </div>
            <div className={styles.policyText}>
              <h6 className={styles.policyTitle}>Cancelación gratuita</h6>
              <p className={`${styles.content} ${contentLimit && styles.limit}`}>
                {dateFreeCancellation.date && dateFreeCancellation.time
                  ? `Cancela antes de las ${dateFreeCancellation.time} del ${dateFreeCancellation.date} para un reembolso completo.`
                  : 'Cancela antes de la fecha límite para un reembolso completo.'}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.additionalInfo}>
          <div className={styles.infoItem}>
            <div className={styles.iconWrapper}>
              <RefundIcon />
            </div>
            <div className={styles.infoText}>
              <span className={styles.infoLabel}>Reembolso completo</span>
              <span className={styles.infoDescription}>Según términos y condiciones</span>
            </div>
          </div>
        </div>
      </div>

      {/* {showSeeMore && (
        <div className={styles.seeMoreWrapper}>
          <SeeAll text="Ver detalles completos" href="/car/details/cancellation-policy" />
        </div>
      )} */}
    </div>
  );
};

export default PolicyCancellationSection;
