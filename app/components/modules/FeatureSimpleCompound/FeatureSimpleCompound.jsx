import SeeAll from '../../elements/SeeAll/SeeAll';
import FeatureSimple from '../../elements/FeatureSimple/FeatureSimple';
import SectionTitle from '../../elements/SectionTitle/SectionTitle';
import { useState } from 'react';

import styles from './FeatureSimpleCompound.module.scss';

const FeatureSimpleCompound = ({
  carId,
  title,
  features = [],
  seeAllInline = false,
}) => {
  const [limit, setLimit] = useState(3);
  const [seeAllText, setSeeAllText] = useState('Ver todas');

  const handleSimulateSeeAll = () => {
    if (limit === 3) {
      setSeeAllText('Ver menos');
      setLimit(features.length - 1);
    } else {
      setSeeAllText('Ver todas');
      setLimit(3);
    }
  };

  return (
    <div className={styles.container}>
      {title && <SectionTitle title={title} />}

      {features.length === 0 && (
        <p>Este carro no tiene caracteristicas asignadas.</p>
      )}

      {features.length > 0 && (
        <div className={styles.featuresGrid}>
          {features.slice(0, limit).map(({ featureId }) => {
            return <FeatureSimple key={featureId} featureId={featureId} />;
          })}
        </div>
      )}

      {features.length > 0 && (
        <SeeAll
          text={seeAllText}
          href={`/car/details/features/${encodeURIComponent(carId)}`}
          simulate={seeAllInline}
          onSimulate={handleSimulateSeeAll}
        />
      )}
    </div>
  );
};

export default FeatureSimpleCompound;
