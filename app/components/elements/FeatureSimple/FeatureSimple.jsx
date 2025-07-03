import { carFeaturesNames } from '../../../utils/enums';

import styles from './FeatureSimple.module.scss';

// Modern feature icons
const FeatureIcons = {
  1: () => ( // Wheelchair accessibility
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="4" r="2"/>
      <path d="M19 13v-2a2 2 0 0 0-2-2H9l-1.5-3H5v2h2l3.5 7 1.5-3H17v4h2z"/>
      <circle cx="10.5" cy="19.5" r="1.5"/>
      <circle cx="16.5" cy="19.5" r="1.5"/>
    </svg>
  ),
  2: () => ( // All-wheel drive
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
      <path d="M8 12h8M12 8v8"/>
    </svg>
  ),
  3: () => ( // Android Auto
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
      <circle cx="9" cy="9" r="2"/>
      <circle cx="15" cy="9" r="2"/>
    </svg>
  ),
  4: () => ( // Apple CarPlay
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
      <path d="M8 10h8v4H8z"/>
    </svg>
  ),
  5: () => ( // AUX input
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6h.01M6 18h.01M18 6h.01M18 18h.01"/>
      <path d="M2 12h20"/>
      <circle cx="8" cy="12" r="2"/>
      <circle cx="16" cy="12" r="2"/>
    </svg>
  ),
  6: () => ( // Backup camera
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  7: () => ( // Bike rack
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="5.5" cy="17.5" r="3.5"/>
      <circle cx="18.5" cy="17.5" r="3.5"/>
      <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
      <path d="M8.5 10L15 6l-3-3 1.5-1.5L17 5l1 1-8.5 4z"/>
    </svg>
  ),
  8: () => ( // Blind spot monitoring
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <path d="M12 17h.01"/>
    </svg>
  ),
  9: () => ( // Bluetooth
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6.5 6.5L17.5 17.5L12 23L12 1L17.5 6.5L6.5 17.5"/>
    </svg>
  ),
  10: () => ( // Child seat
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
      <path d="M8 15h8"/>
    </svg>
  ),
  11: () => ( // GPS
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="10" r="3"/>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    </svg>
  ),
  12: () => ( // Heated seats
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12V7a7 7 0 0 1 14 0v5"/>
      <path d="M5 20a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2"/>
      <path d="M9 16v-4M15 16v-4"/>
    </svg>
  ),
  13: () => ( // Keyless entry
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      <circle cx="12" cy="16" r="1"/>
    </svg>
  ),
  14: () => ( // Pet friendly
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8.5 8.5L12 12l3.5-3.5L18 10l-6 6-6-6z"/>
      <circle cx="7" cy="4" r="2"/>
      <circle cx="17" cy="4" r="2"/>
      <circle cx="12" cy="20" r="2"/>
      <circle cx="4" cy="16" r="2"/>
      <circle cx="20" cy="16" r="2"/>
    </svg>
  ),
  16: () => ( // USB charger
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 7v8a5 5 0 0 1-5 5 5 5 0 0 1-5-5V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3z"/>
      <path d="M9 1v4M15 1v4"/>
    </svg>
  ),
  17: () => ( // USB input
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <rect x="9" y="9" width="6" height="6"/>
      <line x1="9" y1="1" x2="15" y2="1"/>
    </svg>
  ),
};

const FeatureSimple = ({ featureId }) => {
  // Debug logs
  console.log('🔧 FeatureSimple Component Debug:');
  console.log('- Feature ID received:', featureId);
  console.log('- Feature ID type:', typeof featureId);
  
  const IconComponent = FeatureIcons[featureId];
  const featureName = carFeaturesNames[featureId];
  
  console.log('- Icon component found:', !!IconComponent);
  console.log('- Feature name found:', featureName);
  console.log('- Available feature IDs:', Object.keys(FeatureIcons));
  console.log('- Available feature names:', Object.keys(carFeaturesNames));
  
  if (!featureId) {
    console.log('⚠️ No featureId provided');
    return null;
  }
  
  if (!IconComponent) {
    console.log('⚠️ No icon found for featureId:', featureId);
  }
  
  if (!featureName) {
    console.log('⚠️ No name found for featureId:', featureId);
  }
  
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        {IconComponent ? <IconComponent /> : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 12h8M12 8v8"/>
          </svg>
        )}
      </div>
      <p className={styles.featureName}>{featureName || `Feature ${featureId}`}</p>
    </div>
  );
};

export default FeatureSimple;
