import Link from 'next/link';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useEffect } from 'react';

import FeatureSimple from '../../elements/FeatureSimple/FeatureSimple';
import SectionTitle from '../../elements/SectionTitle/SectionTitle';

import styles from './CarFeatures.module.scss';

const FeaturesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const CarFeatures = ({ features = [], editable = false, href = '/', title = 'Características' }) => {
  // Debug logs
  console.log('🚗 CarFeatures Component Debug:');
  console.log('- Features received:', features);
  console.log('- Features length:', features.length);
  console.log('- Features type:', typeof features);
  console.log('- Features is array:', Array.isArray(features));
  
  if (features.length > 0) {
    console.log('- First feature:', features[0]);
    console.log('- Feature structure:', Object.keys(features[0] || {}));
  }

  if (features.length === 0) {
    console.log('⚠️ No features found - showing empty state');
    return (
      <div className={styles.featuresSection}>
        <div className={styles.titleWrapper}>
          <div className={styles.titleSection}>
            <FeaturesIcon />
            <SectionTitle title={title} />
          </div>
        </div>
        <p className={styles.noFeatures}>Este carro no tiene características asignadas.</p>
      </div>
    );
  }

  console.log('✅ Rendering features slider with', features.length, 'features');

  return (
    <div className={styles.featuresSection}>
      <div className={styles.titleWrapper}>
        <div className={styles.titleSection}>
          <FeaturesIcon />
          <SectionTitle title={title} />
          {editable && (
            <Link href={href}>
              <a className={styles.editLink}>Editar</a>
            </Link>
          )}
        </div>
      </div>

      <div className={styles.sliderWrapper}>
        <ScrollContainer 
          vertical={false}
          horizontal={true}
          activationDistance={5}
          className={styles.scrollContainer}
          ignoreElements=""
          nativeMobileScroll={true}
          style={{ 
            width: '100%', 
            overflow: 'hidden',
            touchAction: 'pan-x' // Enable horizontal touch scrolling
          }}
        >
          <div className={styles.featuresContainer}>
            {features.map((feature, index) => {
              console.log(`- Rendering feature ${index + 1}:`, feature);
              return (
                <FeatureSimple key={feature.featureId || index} featureId={feature.featureId} />
              );
            })}
          </div>
        </ScrollContainer>
      </div>
    </div>
  );
};

export default CarFeatures;
