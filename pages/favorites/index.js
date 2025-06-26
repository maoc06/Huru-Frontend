import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import useApi from '../../app/hooks/useApi';
import favoriteApi from '../../app/api/FavoriteAPI';
import authStorage from '../../app/utils/storageAuth';

import withAuth from '../../app/HOC/withAuth';

import ActivityIndicator from '../../app/components/elements/ActivityIndicator/ActivityIndicator';
import AppLayout from '../../app/components/layouts/AppLayout/AppLayout';
import CardHorizontal from '../../app/components/modules/CardHorizontal/CardHorizontal';
import TitlePage from '../../app/components/elements/TitlePage/TitlePage';
import NotFound from '../../app/components/modules/NotFound/NotFound';
import styles from './Favorites.module.scss';

const Favorites = () => {
  const getFavorites = useApi(favoriteApi.findByUser);
  const [user, setUser] = useState({});
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) {
      setUser(user.info);
      handleGetFavorites(user.info.uid);
    }
  }, []);

  const handleGetFavorites = async (userId) => {
    const res = await getFavorites.request(userId);
    console.log('favorites', res);
    if (res !== undefined && res.data !== undefined) {
      setFavorites(res.data.data);
    }
  };

  const handleRemoveFavorite = (carId) => {
    const remove = favorites.filter((favorite) => favorite.car.carId !== carId);
    setFavorites(remove);
  };

  return (
    <div>
      <Head>
        <title>Huru | Favoritos</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ActivityIndicator visible={getFavorites.loading} />

      <AppLayout withImage={false}>
        <TitlePage>Favoritos</TitlePage>

        {favorites.constructor === Array && favorites.length === 0 && (
          <NotFound
            text="Sin Favoritos"
            subtitle="Aún no tienes favoritos. Busca y guarda tus carros favoritos, y podrás encontrarlos fácilmente aquí."
          />
        )}

        <div className={styles.grid_container}>
          <section className={styles.grid}>
            {favorites.map(({ car }) => {
              if (!car) return null;
              const imageSrc =
                car?.images?.[0]?.imagePath || '/images/default-car.png';

              return (
                <Link href={`/car/${car.slug}`} key={car.id}>
                  <a>
                    <CardHorizontal
                      carId={car.id}
                      userId={user.uid}
                      key={car.id}
                      imageSrc={imageSrc}
                      brand={car.brand}
                      model={car.model}
                      year={car.year}
                      city={car.city.name}
                      price={car.price}
                      isVerified={car.isVerified}
                    />
                  </a>
                </Link>
              );
            })}
          </section>
        </div>
      </AppLayout>
    </div>
  );
};

export default withAuth(Favorites);
