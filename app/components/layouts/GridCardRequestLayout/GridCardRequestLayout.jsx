import { withExtraLabelRequests } from '../../../utils/extraLabelText';
import RequestCard from '../../elements/RequestCard/RequestCard';
import SeeAll from '../../elements/SeeAll/SeeAll';

import style from './GridCardRequestLayout.module.scss';

export default function GridCardRequestLayout({
  requestList,
  sliceTo = 3,
  showSeeAll = true,
}) {
  return (
    <>
      <h6>Solicitudes recientes</h6>

      {requestList.length === 0 && <p>No tienes solicitudes</p>}

      <div className={style.container}>
        {requestList.slice(0, sliceTo).map((request) => {
          const { firstName, lastName } = request.bookedBy;
          const { images, maker, model, year } = request.bookedCar;

          const applicantName = `${firstName} ${lastName}`;
          const title = `${maker.name} ${model.name} ${year}`;

          const extraLabel = withExtraLabelRequests({
            already: request.alreadyReviewed,
            status: request.bookingStatus,
            checkout: request.checkout,
          });

          return (
            <RequestCard
              key={request.id}
              guestName={applicantName}
              guestImg={request.bookedBy.profilePhoto}
              carName={title}
              carImg={images[0].imagePath}
              dateStart={request.checkin}
              dateEnd={request.checkout}
              requestId={request.id}
              extraLabelColor={extraLabel.color}
              extraLabelText={extraLabel.text}
              withExtraLabel={extraLabel.show}
              href={extraLabel.link}
            />
          );
        })}

        {showSeeAll && <SeeAll href="/host/requests" />}
      </div>
    </>
  );
}
