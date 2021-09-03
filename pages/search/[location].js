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
import Avatar from '../../app/components/elements/Avatar/Avatar';
import { LogoColor } from '../../app/components/elements/Icons/Shared';
import ActivityIndicator from '../../app/components/elements/ActivityIndicator/ActivityIndicator';

import { defaultDates } from '../../app/utils/formatDates';
import applyAllSettings from '../../app/utils/applySearchCarSettings';
import storageAuth from '../../app/utils/storageAuth';
import styles from './search.module.scss';
import MenuDesktop from '../../app/components/modules/MenuDesktop/MenuDesktop';

function Cars() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSelector((state) => state.searchParams);

  const searchCars = useApi(searchApi.findCarsByCity);

  const [cars, setCars] = useState([]);
  const [user, setUser] = useState(null);
  const [showMenuDesktop, setShowMenuDesktop] = useState(false);

  const [location, setLocation] = useState(router.query);
  // const { location } = router.query;

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

  const handleListenPlaces = (place) => {
    setLocation(place.value.structured_formatting.main_text);
  };

  const handleListenDates = () => {
    handleCarsQuery(getCheckInOut());
  };

  const handleAvatar = () => {
    setShowMenuDesktop(!showMenuDesktop);
  };

  useEffect(() => {
    if (location) handleCarsQuery(getCheckInOut());
  }, [location]);

  useEffect(() => {
    const user = storageAuth.getUser();
    if (user) setUser(user.info);
  }, []);

  return (
    <AppLayout withImage={false}>
      <Head>
        <title>{`Huru | Encuentra el carro perfecto en ${location}`}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ActivityIndicator visible={searchCars.loading} />

      <section className={styles.header}>
        <div
          onClick={() => {
            router.push('/');
          }}
          className={styles.logo}
        >
          <LogoColor />
        </div>

        <div className={styles.searchBar}>
          <SearchForm
            isCompact={true}
            showTopLabels={false}
            showBorder={true}
            startDateBorder={true}
            listenPlaces={true}
            listenDates={true}
            listenerPlaces={handleListenPlaces}
            listenerDates={handleListenDates}
          />
        </div>

        <div className={styles.avatar} onClick={handleAvatar}>
          {user ? <Avatar src={user.profilePicture} /> : <Avatar />}
          {showMenuDesktop && (
            <div className={styles.menuDesktop}>
              <MenuDesktop user={user} />
            </div>
          )}
        </div>
      </section>

      <section className={styles.inner}>
        <FiletersPanel />

        <div className={styles.result}>
          {searchCars.error && <p>Ocurrio un error</p>}

          {!searchCars.loading && cars.length === 0 && (
            <NotFound text="No se encontraron resultados para su búsqueda." />
          )}

          {!searchCars.loading && cars.length > 0 && <SearchResultsTemplate />}
        </div>
      </section>
    </AppLayout>
    // </div>
  );
}

export default Cars;
