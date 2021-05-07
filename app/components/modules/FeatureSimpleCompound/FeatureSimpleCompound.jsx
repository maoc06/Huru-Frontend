import SeeAll from '../../elements/SeeAll/SeeAll';
import FeatureSimple from '../../elements/FeatureSimple/FeatureSimple';
import SectionTitle from '../../elements/SectionTitle/SectionTitle';

const FeatureSimpleCompound = ({ carId, title, features = [] }) => {
  return (
    <>
      {title && <SectionTitle title={title} />}

      {features.length === 0 && (
        <p>Este carro no tiene caracteristicas asignadas.</p>
      )}

      {features.length > 0 &&
        features.slice(0, 3).map(({ featureId }) => {
          return <FeatureSimple key={featureId} featureId={featureId} />;
        })}

      <SeeAll href={`/car/details/features/${encodeURIComponent(carId)}`} />
    </>
  );
};

export default FeatureSimpleCompound;
