import { carFeaturesNames, carFeaturesIcons } from '../../../utils/enums';

import styles from './FeatureSimple.module.scss';

const FeatureSimple = ({ featureId }) => {
  return (
    <div className={styles.container}>
      <p>{carFeaturesNames[featureId]}</p>
      {carFeaturesIcons[featureId]}
    </div>
  );
};

export default FeatureSimple;
