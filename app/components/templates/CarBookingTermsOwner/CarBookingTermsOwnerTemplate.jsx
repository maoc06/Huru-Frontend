import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../../hooks/useApi';
import carApi from '../../../api/VehicleApi';
import disableDayApi from '../../../api/DisableDayAPI';

import Divider from '../../elements/Divider/Divider';
import SectionEditable from '../../modules/SectionEditable/SectionEditable';

import radioGroupSchema from '../../../constants/validationSchema/radioGroup';
import setPircePerDaySchema from '../../../constants/validationSchema/setPricePerDay';
import Calendar from '../../elements/Calendar/Calendar';
import SectionTitle from '../../elements/SectionTitle/SectionTitle';
// import DateRangePicker from '../../elements/DateRangePicker/DateRangePicker';

import { formatDisableDays, isObjEqual } from '../../../utils/formatDates';

const CarBookingTermsOwnerTemplate = ({
  carId,
  bookingTerms = {},
  advanceNoticeOptions = [],
  minTripOptions = [],
  maxTripOptions = [],
}) => {
  const router = useRouter();

  const updateBookingTerms = useApi(carApi.updateBookingTerms);
  const postDisableDay = useApi(disableDayApi.addDisableDay);
  const deleteDisableDay = useApi(disableDayApi.removeDisableDay);
  const getDisableDays = useApi(disableDayApi.listByCar);

  const [disabledDays, setDisabledDays] = useState([]);

  const handleUpdateprice = ({ price }) => {
    price = price.replace(/[\D\s\._\-]+/g, '');
    price = price ? parseInt(price, 10) : 0;

    const priceUpdate = { carId, price };
    handleUpdateBookingTerms(priceUpdate);
  };

  const handleUpdateAdvanceNotice = ({ advance: { id } }) => {
    const advanceNotice = { carId, advanceNoticeId: id };
    handleUpdateBookingTerms(advanceNotice);
  };

  const handleUpdateMinTrip = ({ minTrip: { id } }) => {
    const minTrip = { carId, minTripDurationId: id };
    handleUpdateBookingTerms(minTrip);
  };

  const handleUpdateMaxTrip = ({ maxTrip: { id } }) => {
    const maxTrip = { carId, maxTripDurationId: id };
    handleUpdateBookingTerms(maxTrip);
  };

  const handleUpdateBookingTerms = async (updateData) => {
    await updateBookingTerms.request(updateData);

    if (updateBookingTerms.error) {
      console.log('Error updating booking terms...');
    } else {
      router.reload();
    }
  };

  const handleRequestDisableDay = ({ date, onRequest = () => {} }) => {
    const { day, month, year } = date;
    const disableDay = `${year}-${month}-${day}`;

    const disable = { carId, disableDay };

    onRequest.request(disable);
  };

  const handleDisableDay = (selection) => {
    handleRequestDisableDay({ date: selection, onRequest: postDisableDay });
    setDisabledDays([...disabledDays, selection]);
  };

  const handleEnableDay = (selection) => {
    handleRequestDisableDay({ date: selection, onRequest: deleteDisableDay });
    setDisabledDays(
      disabledDays.filter((day) => {
        const equal = isObjEqual({ dateStored: day, dateSelected: selection });
        return !equal;
      })
    );
  };

  const handleGetDisableDays = async () => {
    const days = await getDisableDays.request(carId);

    const formatDays = formatDisableDays({ days: days.data.data });
    setDisabledDays(formatDays);
  };

  useEffect(() => {
    handleGetDisableDays();
  }, []);

  return (
    <>
      <SectionEditable
        title="Precio"
        name="price"
        type="price"
        onSave={handleUpdateprice}
        schema={setPircePerDaySchema}
        values={{ price: bookingTerms['price'] }}
      />

      <Divider size="mediumTop" />

      <SectionTitle title="Disponibilidad" />
      <Calendar
        disabledDays={disabledDays}
        onSelectDay={handleDisableDay}
        onSelectDisableDay={handleEnableDay}
      />

      <Divider size="mediumTop" />

      <SectionEditable
        title="Antelación"
        name="advance"
        type="options"
        onSave={handleUpdateAdvanceNotice}
        schema={radioGroupSchema}
        values={{ advance: bookingTerms['advanceNotice'].name }}
        options={advanceNoticeOptions}
        showInfoTip={true}
        toolTip="¿Cuanto tiempo antes deseas que te avisen para reservar este vehículo?"
      />

      <Divider size="mediumTop" />

      <SectionEditable
        title="Viaje más corto"
        name="minTrip"
        type="options"
        onSave={handleUpdateMinTrip}
        schema={radioGroupSchema}
        values={{ minTrip: bookingTerms['minTrip'].name }}
        options={minTripOptions}
        showInfoTip={true}
        toolTip="¿Cuanto tiempo sera el viaje más corto que aceptaras por reservar este vehículo?"
      />

      <Divider size="mediumTop" />

      <SectionEditable
        title="Viaje más largo"
        name="maxTrip"
        type="options"
        onSave={handleUpdateMaxTrip}
        schema={radioGroupSchema}
        values={{ maxTrip: bookingTerms['maxTrip'].name }}
        options={maxTripOptions}
        showInfoTip={true}
        toolTip="¿Cuanto tiempo sera el viaje más largo que aceptaras por reservar este vehículo?"
      />
    </>
  );
};

export default CarBookingTermsOwnerTemplate;
