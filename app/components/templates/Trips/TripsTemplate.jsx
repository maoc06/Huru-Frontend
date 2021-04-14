import { withExtraLabel } from '../../../utils/extraLabelText';

import CardHorizontal from '../../elements/CardHorizontal/CardHorizontal';

const TripsTemplate = ({ renderList, onSelectCard }) => {
  return (
    <>
      {renderList.length === 0 && <p>No tienes nada</p>}

      {renderList.map((item) => {
        const {
          id,
          checkout,
          bookingStatus,
          bookingCar: { car, images },
          alreadyReviewed,
        } = item || {};

        const extraLabel = withExtraLabel(
          alreadyReviewed,
          bookingStatus,
          checkout
        );

        return (
          <CardHorizontal
            key={id}
            slug={id}
            title={car}
            showPanelDates={true}
            imageSrc={images[0].imagePath}
            onSelect={() => onSelectCard(id)}
            withExtraLabel={extraLabel.show}
            extraLabelText={extraLabel.text}
            extraLabelColor={extraLabel.color}
          />
        );
      })}
    </>
  );
};

export default TripsTemplate;
