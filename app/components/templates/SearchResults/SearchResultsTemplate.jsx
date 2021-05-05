import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import useApi from '../../../hooks/useApi';
import favoriteApi from '../../../api/FavoriteAPI';
import authStorage from '../../../utils/storageAuth';

import CardHorizontal from '../../elements/CardHorizontal/CardHorizontal';
import SearchForm from '../../modules/SearchForm/SearchForm';
import FiletersPanel from '../../modules/FiltersPanel/FiltersPanel';

const SearchResultsTemplate = () => {
  const router = useRouter();

  const filterStore = useSelector((state) => state.filterSearch);
  const getFavorites = useApi(favoriteApi.findByUser);

  const [user, setUser] = useState({});
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleGetFavorites = async (userId) => {
    const res = await getFavorites.request(userId);
    setFavorites(res.data);
  };

  const handleCheckIsFavorite = (carId) => {
    return favorites.data.some((favorite) => favorite.car.carId === carId);
  };

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) {
      setUser(user.info);
      handleGetFavorites(user.info.uid);
    }
  }, []);

  useEffect(() => {
    if (filterStore.filterRes.length > 0) {
      setItems(JSON.parse(filterStore.filterRes));
    }
  }, [filterStore.filterRes]);

  const handleClick = (slug) => {
    router.push(`/car/${encodeURIComponent(slug)}`);
  };

  return (
    <>
      <SearchForm isCompact={true} showTopLabels={false} showBorder={true} />

      <FiletersPanel />

      <h6
        style={{ marginTop: '32px' }}
      >{`${items.length} resultados de busquedas`}</h6>

      {/* If not logged  */}
      {user.constructor === Object &&
        Object.keys(user).length === 0 &&
        items.map(({ car_id: slug, name, model, year, price, image }) => {
          return (
            <CardHorizontal
              carId={slug}
              key={slug}
              title={`${name} ${model} ${year}`}
              price={price}
              imageSrc={image ? image : '../../'}
              onSelect={() => handleClick(slug)}
            />
          );
        })}

      {/* If logged */}
      {favorites.constructor === Object &&
        Object.keys(favorites).length > 0 &&
        items.map(({ car_id: slug, name, model, year, price, image }) => {
          return (
            <CardHorizontal
              userId={user.uid ? user.uid : null}
              carId={slug}
              key={slug}
              title={`${name} ${model} ${year}`}
              price={price}
              imageSrc={image.length === 0 ? '/images/default-car.png' : image}
              onSelect={() => handleClick(slug)}
              favorite={() => handleCheckIsFavorite(slug)}
            />
          );
        })}
    </>
  );
};

export default SearchResultsTemplate;
