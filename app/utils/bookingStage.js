import { diffDays, lastDay } from './formatDates';

const PENDING_APPROVAL = 1;
const APPROVED = 5;

export const calcBookingStage = ({ bookingStatus, checkin, checkout }) => {
  let stage = 1;
  const today = new Date().toISOString();

  const refundDate = lastDay({
    date: checkin,
    type: 'ISO',
    outputFormat: 'raw',
  });

  const daysToRefund = diffDays({
    dateOne: today,
    dateTwo: refundDate,
    returnInAbs: false,
  });

  const daysToStart = diffDays({
    dateOne: today,
    dateTwo: checkin,
    returnInAbs: false,
  });

  const daysToFinish = diffDays({
    dateOne: today,
    dateTwo: checkout,
    returnInAbs: false,
  });

  if (bookingStatus === PENDING_APPROVAL) stage = 1; // return stage one: booking pending to confirm
  if (bookingStatus === APPROVED) stage = 2; // return stage two: accept booking
  if (daysToRefund < 0) stage = 3; // return stage three: refund pass
  if (daysToStart < 0) stage = 4; // return stage four: start trip
  if (daysToFinish < 0) stage = 5; // return stage five: finished trip

  return stage;
};
