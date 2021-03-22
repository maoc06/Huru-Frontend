import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { setResults } from '../../app/redux/slices/filterSearchSlice';

import useApi from '../../app/hooks/useApi';
import searchApi from '../../app/api/SearchApi';

import AppLayout from '../../app/components/layouts/AppLayout/AppLayout';
import SearchResultsTemplate from '../../app/components/templates/SearchResults/SearchResultsTemplate';

import ActivityIndicator from '../../app/components/elements/ActivityIndicator/ActivityIndicator';

import formatShortDate from '../../app/utils/formatShortDate';
import addDays from '../../app/utils/addDays';
import formatAMPM from '../../app/utils/formatAMPM';

function Cars() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSelector((state) => state.searchParams);
  const searchCars = useApi(searchApi.findCarsByCity);
  const [cars, setCars] = useState([]);
  const { location } = router.query;

  const today = new Date();
  const upcoming = addDays(today, 2);
  const time = `${today.getHours() + 1}:${today.getMinutes()}`;

  const defaultDates = {
    raw: { start: today, end: upcoming },
    formatLocale: {
      start: formatShortDate(today),
      end: formatShortDate(upcoming),
    },
  };
  const defaultHourStart = formatAMPM(time);
  const defaultHourEnd = formatAMPM(time);

  const handleCarsQuery = async ({ checkIn, checkOut }) => {
    const res = await searchCars.request(location, checkIn, checkOut);

    if (
      res.data.data !== undefined &&
      res.data.data !== null &&
      res.data.data.length > 0
    ) {
      const {
        data: { data },
      } = res;
      setCars(data);
      dispatch(setResults(JSON.stringify(data)));
    }
  };

  const getCheckInOut = () => {
    if (
      searchParams.dates.constructor === Object &&
      Object.keys(searchParams.dates).length === 0
    ) {
      console.log('EMPTY SEARCH PARAMS -> SET DEAFULTS');
      searchParams.cityLabel = JSON.stringify({
        cityLabel: 'Cali, Valle del Cauca',
      });
      searchParams.dates = JSON.stringify(defaultDates);
      searchParams.startHour = JSON.stringify(defaultHourStart);
      searchParams.endHour = JSON.stringify(defaultHourEnd);
    }

    console.log(searchParams);

    const {
      raw: { start, end },
    } = JSON.parse(searchParams.dates);
    const { raw: startHour } = JSON.parse(searchParams.startHour);
    const { raw: endHour } = JSON.parse(searchParams.endHour);

    const checkIn = `${start.split('T')[0]} ${startHour}:00`;
    const checkOut = `${end.split('T')[0]} ${endHour}:00`;

    return { checkIn, checkOut };
  };

  useEffect(() => {
    handleCarsQuery(getCheckInOut());
  }, []);

  return (
    <div>
      <Head>
        <title>Huru | Renta carros</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ActivityIndicator visible={searchCars.loading} />

      <AppLayout withImage={false}>
        {searchCars.error && <p>Ocurrio un error</p>}

        {!searchCars.loading && cars.length === 0 && (
          <p>No se encontraron resultados</p>
        )}

        {!searchCars.loading && cars.length > 0 && <SearchResultsTemplate />}
      </AppLayout>
    </div>
  );
}

export default Cars;
