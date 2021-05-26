import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../../hooks/useApi';
import carApi from '../../../api/VehicleApi';
import disableDayApi from '../../../api/DisableDayAPI';

import Divider from '../../elements/Divider/Divider';
import SectionEditable from '../../modules/SectionEditable/SectionEditable';

import advanceNoticeGroupSchema from '../../../constants/validationSchema/advanceNoticeGroup';
import maxTripGroupSchema from '../../../constants/validationSchema/maxTripGroup';
import minTripGroupSchema from '../../../constants/validationSchema/minTripGroup';
import fuelSchema from '../../../constants/validationSchema/fuelType';
import citySchema from '../../../constants/validationSchema/citySelect';

import setPircePerDaySchema from '../../../constants/validationSchema/setPricePerDay';
import Calendar from '../../elements/Calendar/Calendar';
import SectionTitle from '../../elements/SectionTitle/SectionTitle';

import { formatDisableDays, isObjEqual } from '../../../utils/formatDates';

const CarBookingTermsOwnerTemplate = ({
  carId,
  bookingTerms = {},
  advanceNoticeOptions = [],
  minTripOptions = [],
  maxTripOptions = [],
  fuelOptions = [],
  cityOptions = [],
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

  const handleUpdateFuel = ({ fuelType: { fuelId } }) => {
    const fuel = { carId, fuelId };
    handleUpdateBookingTerms(fuel);
  };

  const handleUpdateCity = ({ city: { cityId } }) => {
    const city = { carId, cityId };
    handleUpdateBookingTerms(city);
  };

  const handleUpdateBookingTerms = async (updateData) => {
    await updateBookingTerms.request(updateData);

    if (updateBookingTerms.error) {
      console.error('Error updating booking terms');
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
        schema={advanceNoticeGroupSchema}
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
        schema={minTripGroupSchema}
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
        schema={maxTripGroupSchema}
        values={{ maxTrip: bookingTerms['maxTrip'].name }}
        options={maxTripOptions}
        showInfoTip={true}
        toolTip="¿Cuanto tiempo sera el viaje más largo que aceptaras por reservar este vehículo?"
      />

      <Divider size="mediumTop" />

      <SectionEditable
        title="Tipo de combustible"
        name="fuelType"
        type="dropdown"
        onSave={handleUpdateFuel}
        schema={fuelSchema}
        values={{ fuelType: bookingTerms['fuel'].name }}
        options={fuelOptions}
        propKey="fuelId"
        showInfoTip={true}
        toolTip="¿Con qué tipo de combustible cargas tu vehículo?"
      />

      <Divider size="mediumTop" />

      <SectionEditable
        title="Ciudad"
        name="city"
        type="dropdown"
        onSave={handleUpdateCity}
        schema={citySchema}
        values={{ city: bookingTerms['city'].name }}
        options={cityOptions}
        propKey="cityId"
        showInfoTip={true}
        toolTip="¿Dónde está ubicado tu vehículo?"
      />
    </>
  );
};

export default CarBookingTermsOwnerTemplate;
