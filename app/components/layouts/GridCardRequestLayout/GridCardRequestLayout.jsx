import RequestCard from '../../elements/RequestCard/RequestCard';

import style from './GridCardRequestLayout.module.scss';

export default function GridCardRequsetLayout({ requestList }) {
  return (
    <>
      <h6>Solicitudes recientes</h6>

      {requestList.length === 0 && <p>No tienes solicitudes</p>}

      <div className={style.container}>
        {requestList.slice(0, 3).map((request) => {
          return (
            <RequestCard
              key={request.booking_id}
              guestName={`${request.bookingBy.firstName} ${request.bookingBy.lastName}`}
              guestImg={request.bookingBy.profilePhoto}
              carName={request.bookingCar.car}
              carImg={request.bookingCar.image}
              dateStart={request.check_in_date}
              dateEnd={request.check_out_date}
              requestId={request.booking_id}
            />
          );
        })}
      </div>
    </>
  );
}
