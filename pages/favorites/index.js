import Head from 'next/head';
import { useEffect, useState } from 'react';

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

        <section className={styles.favorites}>
          {favorites.constructor === Array &&
            favorites.length > 0 &&
            favorites.map(({ car }) => {
              const imageSrc =
                car.images.length === 0
                  ? '/images/default-car.png'
                  : car.images[0].imagePath;

              return (
                <CardHorizontal
                  carId={car.carId}
                  userId={user.uid}
                  key={car.carId}
                  imageSrc={imageSrc}
                  href={`/car/${encodeURIComponent(car.carId)}`}
                  showPanelPrice={false}
                  title={`${car.maker.name} ${car.model.name} ${car.year}`}
                  favorite={true}
                  onRemoveFavorite={handleRemoveFavorite}
                  forceRowDirection={false}
                />
              );
            })}
        </section>
      </AppLayout>
    </div>
  );
};

export default withAuth(Favorites);
