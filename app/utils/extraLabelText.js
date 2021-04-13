const PENDING_APPROVAL_BOOKING_ID = 1;
const COMPLETED_BOOKING_ID = 4;
const APPROVED_BOOKING_ID = 5;
const CANCELED_BOOKING_ID = 7;

const withExtraLabel = (status, checkout) => {
  let extraLabel = { show: false, text: '', color: '' };
  +console.log('Status', status);

  switch (status) {
    case PENDING_APPROVAL_BOOKING_ID:
      extraLabel = {
        show: true,
        text: 'Pendiente de aprobación',
        color: 'blue',
      };
      break;
    case APPROVED_BOOKING_ID:
      extraLabel = {
        show: true,
        text: 'Aprobada... El viaje iniciara pronto',
        color: 'green',
      };
      break;
    case COMPLETED_BOOKING_ID:
      if (isFinishedBooking(checkout)) {
        extraLabel = {
          show: true,
          text: 'Cúentanos tu experiencia',
          color: 'blue',
        };
      }
      break;
    case CANCELED_BOOKING_ID:
      extraLabel = { show: true, text: 'Reserva cancelada', color: 'red' };
      break;
    default:
      break;
  }

  return extraLabel;
};

const isFinishedBooking = (checkout) => {
  const dateEnd = new Date(checkout);
  const today = new Date();

  if (today > dateEnd) return true;
  return false;
};

export { withExtraLabel };
