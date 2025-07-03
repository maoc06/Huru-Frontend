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
  // Debug logs
  console.log('📋 FeatureSimpleCompound Component Debug:');
  console.log('- Car ID:', carId);
  console.log('- Title:', title);
  console.log('- Features received:', features);
  console.log('- Features length:', features.length);
  console.log('- Features type:', typeof features);
  console.log('- Features is array:', Array.isArray(features));
  console.log('- seeAllInline:', seeAllInline);
  
  if (features.length > 0) {
    console.log('- First feature:', features[0]);
    console.log('- Feature structure:', Object.keys(features[0] || {}));
    features.forEach((feature, index) => {
      console.log(`- Feature ${index + 1}:`, feature);
    });
  }

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

  if (features.length === 0) {
    console.log('⚠️ No features found in FeatureSimpleCompound - showing empty state');
  } else {
    console.log(`✅ FeatureSimpleCompound rendering ${features.slice(0, limit).length} features (limit: ${limit})`);
  }

  return (
    <div className={styles.container}>
      {title && <SectionTitle title={title} />}

      {features.length === 0 && (
        <p>Este carro no tiene caracteristicas asignadas.</p>
      )}

      {features.length > 0 && (
        <div className={styles.featuresGrid}>
          {features.slice(0, limit).map((feature, index) => {
            console.log(`- FeatureSimpleCompound rendering feature ${index + 1}:`, feature);
            return <FeatureSimple key={feature.featureId || index} featureId={feature.featureId} />;
          })}
        </div>
      )}

      {/* {features.length > 0 && (
        <SeeAll
          text={seeAllText}
          href={`/car/details/features/${encodeURIComponent(carId)}`}
          simulate={seeAllInline}
          onSimulate={handleSimulateSeeAll}
        />
      )} */}
    </div>
  );
};

export default FeatureSimpleCompound;
