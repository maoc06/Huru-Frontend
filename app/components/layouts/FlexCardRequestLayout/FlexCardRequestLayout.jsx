import { withExtraLabelRequests } from '../../../utils/extraLabelText';
import RequestCard from '../../modules/RequestCard/RequestCard';
import SeeAll from '../../elements/SeeAll/SeeAll';

import style from './FlexCardRequestLayout.module.scss';

export default function FlexCardRequestLayout({
  requestList = [],
  sliceTo = 4, // Changed to 4 as per requirement
  showSeeAll = true,
  horizontal = false, // This prop might not be as relevant for flex, but keeping for consistency
}) {
  // Validate requestList
  if (!Array.isArray(requestList)) {
    console.warn('FlexCardRequestLayout: requestList is not an array', requestList);
    return null;
  }

  return (
    <>
      <div className={`${style.container} ${horizontal && style.horizontal}`}>
        {requestList.slice(0, sliceTo).map((request) => {
          // Skip invalid requests
          if (!request || !request.id) {
            console.warn('FlexCardRequestLayout: Invalid request object', request);
            return null;
          }
          // Safely extract bookedBy info with defaults
          const firstName = request.bookedBy?.firstName || 'Usuario';
          const lastName = request.bookedBy?.lastName || '';
          
          // Safely extract bookedCar info with defaults
          const maker = request.bookedCar?.maker || { name: 'Marca no especificada' };
          const model = request.bookedCar?.model || { name: 'Modelo no especificado' };
          const year = request.bookedCar?.year || 'Año no especificado';
          
          // Safely handle images with proper null checks
          const images = request.bookedCar?.images;
          const imageSrc = (!images || !Array.isArray(images) || images.length === 0)
            ? '/images/default-car.png'
            : (images[0]?.imagePath || '/images/default-car.png');

          const applicantName = `${firstName} ${lastName}`.trim();
          const title = `${maker.name} ${model.name} ${year}`;

          // Safely handle extra label generation
          const extraLabel = withExtraLabelRequests({
            already: request.alreadyReviewed || false,
            status: request.bookingStatus || 'PENDING',
            checkout: request.checkout,
          });

          return (
            <div key={request.id} className={style['card-wrapper']}>
              <RequestCard
                guestName={applicantName}
                guestImg={request.bookedBy?.profilePhoto || '/images/default-avatar.png'}
                carName={title}
                carImg={imageSrc}
                dateStart={request.checkin || 'Fecha no especificada'}
                dateEnd={request.checkout || 'Fecha no especificada'}
                requestId={request.id}
                extraLabelColor={extraLabel?.color || 'blue'}
                extraLabelText={extraLabel?.text || 'Estado desconocido'}
                withExtraLabel={extraLabel?.show || false}
                href={extraLabel?.link || '#'}
                horizontal={horizontal}
              />
            </div>
          );
        })}

      </div>
        {showSeeAll && <SeeAll href="/host/requests" />}
    </>
  );
}