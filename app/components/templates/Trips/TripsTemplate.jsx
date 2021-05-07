import { convertToCompound } from '../../../utils/formatDates';
import { withExtraLabelGuests } from '../../../utils/extraLabelText';

import CardHorizontal from '../../modules/CardHorizontal/CardHorizontal';

const TripsTemplate = ({ renderList, onSelectCard }) => {
  return (
    <>
      {renderList.length === 0 && <p>No tienes nada</p>}

      {renderList.map((item) => {
        const {
          id,
          checkin,
          checkout,
          bookingStatus,
          bookedCar: { maker, model, year, images },
          alreadyReviewed,
        } = item || {};

        const extraLabel = withExtraLabelGuests({
          already: alreadyReviewed,
          status: bookingStatus,
          checkout,
        });

        return (
          <CardHorizontal
            dates={convertToCompound({ dateOne: checkin, dateTwo: checkout })}
            key={id}
            slug={id}
            title={`${maker.name} ${model.name} ${year}`}
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
