import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import useApi from '../../../hooks/useApi';
import favoriteApi from '../../../api/FavoriteAPI';
import authStorage from '../../../utils/storageAuth';

import CardHorizontal from '../../modules/CardHorizontal/CardHorizontal';
import NotFound from '../../modules/NotFound/NotFound';
import styles from './SearchResultsTemplate.module.scss';
import { typeTransmissionEnum, typeFuelEnum } from '../../../utils/enums';

const SearchResultsTemplate = ({ initialState = [] }) => {
  const filterStore = useSelector((state) => state.filterSearch);
  const getFavorites = useApi(favoriteApi.findByUser);

  const [user, setUser] = useState({});
  const [items, setItems] = useState(initialState);
  const [favorites, setFavorites] = useState({});

  const handleGetFavorites = async (userId) => {
    console.log('🔍 handleGetFavorites called with userId:', userId);
    const res = await getFavorites.request(userId);
    console.log('📦 getFavorites response:', res);
    if (typeof res !== 'undefined' && res.data) {
      setFavorites(res);
      console.log('✅ Favorites set:', res);
    } else {
      console.log('❌ No favorites data received');
    }
  };

  const handleCheckIsFavorite = (carId) => {
    return favorites?.data?.some((favorite) => favorite.car.carId === carId) || false;
  };

  useEffect(() => {
    const user = authStorage.getUser();
    console.log('👤 User from authStorage:', user);
    if (user) {
      console.log('👤 User info:', user.info);
      console.log('🔑 User type:', user.info?.userType);
      setUser(user.info);
      handleGetFavorites(user.info.uid);
    } else {
      console.log('❌ No user found in authStorage');
    }
  }, []);

  useEffect(() => {
    if (filterStore.filterRes.length > 0)
      setItems(JSON.parse(filterStore.filterRes));
  }, [filterStore.filterRes]);

  return (
    <>
      <h6
        className={styles.numResults}
      >{`${items.length} resultados de busquedas`}</h6>

      {/* If not logged  */}
      {(!user || (user.constructor === Object && Object.keys(user).length === 0)) &&
        items.map(
          ({
            car_id: slug,
            name,
            model,
            year,
            price,
            image,
            categories,
            description,
            transmission_id,
            number_of_seats,
            fuel_id,
          }) => {
            return (
              <CardHorizontal
                carId={slug}
                key={slug}
                title={`${name} ${model} ${year}`}
                price={price}
                imageSrc={image ? image : '/images/default-car.png'}
                href={`/car/${encodeURIComponent(slug)}`}
                isEco={categories && categories.includes(8)}
                description={description}
                seats={number_of_seats}
                transmission={typeTransmissionEnum[transmission_id]}
                fuel={typeFuelEnum[fuel_id]}
              />
            );
          }
        )}

      {/* If logged */}
      {user.constructor === Object &&
        Object.keys(user).length > 0 &&
        items.map(
          ({
            car_id: slug,
            name,
            model,
            year,
            price,
            image,
            categories,
            description,
            transmission_id,
            number_of_seats,
            fuel_id,
          }) => {
            return (
              <CardHorizontal
                userId={user.uid ? user.uid : null}
                carId={slug}
                key={slug}
                title={`${name} ${model} ${year}`}
                price={price}
                imageSrc={
                  !image || image.length === 0 ? '/images/default-car.png' : image
                }
                href={`/car/${encodeURIComponent(slug)}`}
                favorite={() => handleCheckIsFavorite(slug)}
                isEco={categories && categories.includes(8)}
                description={description}
                seats={number_of_seats}
                transmission={typeTransmissionEnum[transmission_id]}
                fuel={typeFuelEnum[fuel_id]}
              />
            );
          }
        )}

      {items.length === 0 && (
        <NotFound text="No se encontraron resultados para su búsqueda." />
      )}
    </>
  );
};

export default SearchResultsTemplate;
