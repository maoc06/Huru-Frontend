// For Guests
const PENDING_APPROVAL_BOOKING_ID = 1;
const COMPLETED_BOOKING_ID = 4;
const APPROVED_BOOKING_ID = 5;
const REJECTED_BOOKING_ID = 6;
const CANCELED_BOOKING_ID = 7;

// For Hosts
const CAR_HIDDEN_STATUS_ID = 3;

const withExtraLabelGuests = ({ already = false, status, checkout = '' }) => {
  let extraLabel = { show: false, text: '', color: '' };

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
    case REJECTED_BOOKING_ID:
      extraLabel = {
        show: true,
        text: 'Reserva rechazada por el dueño',
        color: 'red',
      };
      break;
    case COMPLETED_BOOKING_ID:
      if (isFinishedBooking(checkout) && !already) {
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

const withExtraLabelHosts = ({ status }) => {
  let extraLabel = { show: false, text: '', color: '' };

  switch (status) {
    case CAR_HIDDEN_STATUS_ID:
      extraLabel = {
        show: true,
        text: 'Vehículo oculto',
        color: 'yellow',
      };
      break;
    default:
      break;
  }

  return extraLabel;
};

const withExtraLabelRequests = ({ already = false, status, checkout = '' }) => {
  let extraLabel = { show: false, text: '', color: '', link: '' };

  switch (status) {
    case PENDING_APPROVAL_BOOKING_ID:
      extraLabel = {
        show: true,
        text: 'Ver más',
        color: 'blue',
        link: '/host/request-details',
      };
      break;
    case APPROVED_BOOKING_ID:
      extraLabel = {
        show: true,
        text: 'Aprobada... El viaje iniciara pronto',
        color: 'green',
        link: '/trips/upcoming',
      };
      break;
    case COMPLETED_BOOKING_ID:
      extraLabel = { ...extraLabel, link: '/trips/history' };

      if (isFinishedBooking(checkout) && !already) {
        extraLabel = {
          show: true,
          text: 'Cúentanos tu experiencia con el invitado',
          color: 'blue',
          link: '/trips/history',
        };
      }
      break;
    case REJECTED_BOOKING_ID:
      extraLabel = {
        show: true,
        text: 'Rechazaste esta reserva',
        color: 'red',
        link: '/trips/history',
      };
      break;
    case CANCELED_BOOKING_ID:
      extraLabel = {
        show: true,
        text: 'Reserva cancelada',
        color: 'red',
        link: '/trips/history',
      };
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

export { withExtraLabelGuests, withExtraLabelHosts, withExtraLabelRequests };
