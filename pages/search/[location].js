import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';

import { setResults } from '../../app/redux/slices/filterSearchSlice';
import { setDates } from '../../app/redux/slices/searchParamsSlice';

import useApi from '../../app/hooks/useApi';
import searchApi from '../../app/api/SearchApi';

import AppLayout from '../../app/components/layouts/AppLayout/AppLayout';
import SearchForm from '../../app/components/modules/SearchForm/SearchForm';
import FiletersPanel from '../../app/components/modules/FiltersPanel/FiltersPanel';
import NotFound from '../../app/components/modules/NotFound/NotFound';
import SearchResultsTemplate from '../../app/components/templates/SearchResults/SearchResultsTemplate';

import ActivityIndicator from '../../app/components/elements/ActivityIndicator/ActivityIndicator';

import { defaultDates } from '../../app/utils/formatDates';
import applyAllSettings from '../../app/utils/applySearchCarSettings';

function Cars() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSelector((state) => state.searchParams);

  const searchCars = useApi(searchApi.findCarsByCity);

  const [cars, setCars] = useState([]);

  const { location } = router.query;

  const handleCarsQuery = async ({ checkIn, checkOut }) => {
    if (!checkIn.toString().includes('T')) {
      checkIn = DateTime.fromSQL(checkIn).toISO();
    }

    if (!checkOut.toString().includes('T')) {
      checkOut = DateTime.fromSQL(checkOut).toISO();
    }

    const res = await searchCars.request(location, checkIn, checkOut);

    if (
      res.data.data !== undefined &&
      res.data.data !== null &&
      res.data.data.length > 0
    ) {
      const {
        data: { data },
      } = res;

      const resultsData = applyAllSettings({ data, checkIn, checkOut });

      setCars(resultsData);
      dispatch(setResults(JSON.stringify(resultsData)));
    }
  };

  const checkEmptyDates = () => {
    if (
      searchParams.dates.constructor === Object &&
      Object.keys(searchParams.dates).length === 0
    ) {
      return true;
    }
    return false;
  };

  const getCheckInOut = () => {
    let rawData = {};

    if (checkEmptyDates()) {
      const dates = defaultDates();
      dispatch(setDates(JSON.stringify(dates)));
      rawData = dates;
    } else {
      rawData = searchParams.dates;
    }

    const {
      raw: { start, end },
    } = rawData;

    return { checkIn: start, checkOut: end };
  };

  useEffect(() => {
    handleCarsQuery(getCheckInOut());
  }, []);

  return (
    <div>
      <Head>
        <title>{`Huru | Encuentra el carro perfecto en ${location}`}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ActivityIndicator visible={searchCars.loading} />

      <AppLayout withImage={false}>
        <SearchForm isCompact={true} showTopLabels={false} showBorder={true} />
        <FiletersPanel />

        {searchCars.error && <p>Ocurrio un error</p>}

        {!searchCars.loading && cars.length === 0 && (
          <NotFound text="No se encontraron resultados para su búsqueda." />
        )}

        {!searchCars.loading && cars.length > 0 && <SearchResultsTemplate />}
      </AppLayout>
    </div>
  );
}

export default Cars;
