import Link from 'next/link';

import SeeAll from '../../elements/SeeAll/SeeAll';
import FeatureSimple from '../../elements/FeatureSimple/FeatureSimple';

import styles from './CarFeatures.module.scss';

const CarFeatures = ({ features = [], editable = false, href = '/' }) => {
  return (
    <>
      <div className={styles.title}>
        <h5>Caracteristicas</h5>

        {editable && (
          <Link href={href}>
            <a>Editar</a>
          </Link>
        )}
      </div>

      {features.length === 0 && (
        <p>Este carro no tiene caracteristicas asignadas.</p>
      )}

      {features.length > 0 &&
        features.slice(0, 3).map(({ featureId }) => {
          return <FeatureSimple key={featureId} featureId={featureId} />;
        })}

      <SeeAll />
    </>
  );
};

export default CarFeatures;
