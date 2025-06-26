import { carFeaturesNames, carFeaturesIcons } from '../../../utils/enums';

import styles from './FeatureSimple.module.scss';

const FeatureSimple = ({ featureId }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        {carFeaturesIcons[featureId]}
      </div>
      <p className={styles.featureName}>{carFeaturesNames[featureId]}</p>
    </div>
  );
};

export default FeatureSimple;
