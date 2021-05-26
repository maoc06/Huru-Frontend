import Head from 'next/head';
import { useEffect, useState } from 'react';

import useApi from '../../app/hooks/useApi';
import favoriteApi from '../../app/api/FavoriteAPI';
import authStorage from '../../app/utils/storageAuth';

import ActivityIndicator from '../../app/components/elements/ActivityIndicator/ActivityIndicator';
import AppLayout from '../../app/components/layouts/AppLayout/AppLayout';
import CardHorizontal from '../../app/components/modules/CardHorizontal/CardHorizontal';
import TitlePage from '../../app/components/elements/TitlePage/TitlePage';
import NotFound from '../../app/components/modules/NotFound/NotFound';

export default function Favorites() {
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

        {favorites.constructor === Array &&
          favorites.length > 0 &&
          favorites.map(({ car }) => {
            return (
              <CardHorizontal
                carId={car.carId}
                userId={user.uid}
                key={car.carId}
                imageSrc={car.images[0].imagePath}
                href={`/car/${encodeURIComponent(car.carId)}`}
                showPanelPrice={false}
                title={`${car.maker.name} ${car.model.name} ${car.year}`}
                favorite={true}
                onRemoveFavorite={handleRemoveFavorite}
              />
            );
          })}
      </AppLayout>
    </div>
  );
}
