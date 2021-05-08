import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { setResults } from '../../app/redux/slices/filterSearchSlice';
import { setDates } from '../../app/redux/slices/searchParamsSlice';

import useApi from '../../app/hooks/useApi';
import searchApi from '../../app/api/SearchApi';

import AppLayout from '../../app/components/layouts/AppLayout/AppLayout';
import SearchResultsTemplate from '../../app/components/templates/SearchResults/SearchResultsTemplate';

import ActivityIndicator from '../../app/components/elements/ActivityIndicator/ActivityIndicator';

import getDefaultDates from '../../app/utils/getDefaultDates';

function Cars() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSelector((state) => state.searchParams);

  const searchCars = useApi(searchApi.findCarsByCity);

  const [cars, setCars] = useState([]);

  const { location } = router.query;

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
      const dates = getDefaultDates();
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
        <title>Huru | Encuentra el carro perfecto</title>
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
