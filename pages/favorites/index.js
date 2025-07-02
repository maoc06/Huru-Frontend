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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = authStorage.getUser();
    if (user?.info?.uid) {
      setUser(user.info);
      handleGetFavorites(user.info.uid);
    } else {
      setIsLoading(false);
      setError('No user information found');
    }
  }, []);

  const handleGetFavorites = async (userId) => {
    try {
      const res = await getFavorites.request(userId);
      console.log('Favorites response:', res);
      
      if (res?.data?.data) {
        // Filter out any favorites with invalid car data
        const validFavorites = res.data.data.filter(favorite => {
          const isValid = favorite?.car && 
                         favorite.car.id && 
                         favorite.car.slug;
          
          if (!isValid) {
            console.warn('Found invalid favorite:', favorite);
          }
          return isValid;
        });
        
        console.log('Valid favorites:', validFavorites);
        setFavorites(validFavorites);
      } else {
        console.warn('No favorites data in response:', res);
        setFavorites([]);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setError('Error loading favorites');
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFavorite = (carId) => {
    const remove = favorites.filter((favorite) => favorite.car.carId !== carId);
    setFavorites(remove);
  };

  return (
    <div className="favorites-page">
      <Head>
        <title>Huru | Favoritos</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ActivityIndicator visible={isLoading || getFavorites.loading} />

      <AppLayout withImage={false}>
        <TitlePage>Favoritos</TitlePage>

        {error && (
          <NotFound
            text="Error"
            subtitle={error}
          />
        )}

        {!error && favorites.length === 0 && !isLoading && (
          <NotFound
            text="Sin Favoritos"
            subtitle="Aún no tienes favoritos. Busca y guarda tus carros favoritos, y podrás encontrarlos fácilmente aquí."
          />
        )}

        <div className={styles.grid_container}>
          <section className={styles.grid}>
            {favorites.map(({ car }) => {
              // Skip invalid car entries
              if (!car || !car.id || !car.slug) {
                console.warn('Skipping invalid car entry:', car);
                return null;
              }

              // Debug log
              console.log('Rendering car:', car);

              // Safely extract all required properties with defaults
              const imageSrc = car?.images?.[0]?.imagePath || '/images/default-car.png';
              const brand = car.brand || 'Marca no especificada';
              const model = car.model || 'Modelo no especificado';
              const year = car.year || 'Año no especificado';
              const price = car.price || 0;

              return (
                <Link href={`/car/${car.slug}`} key={car.id}>
                  <a>
                    <CardHorizontal
                      carId={car.id}
                      userId={user.uid}
                      key={car.id}
                      imageSrc={imageSrc}
                      brand={brand}
                      model={model}
                      year={year}
                      city={car.city?.name || 'Ciudad no especificada'}
                      price={price}
                      isVerified={car.isVerified || false}
                      onRemoveFavorite={handleRemoveFavorite}
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
