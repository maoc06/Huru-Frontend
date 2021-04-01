import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import CardHorizontal from '../../elements/CardHorizontal/CardHorizontal';
import SearchForm from '../../modules/SearchForm/SearchForm';
import FiletersPanel from '../../modules/FiltersPanel/FiltersPanel';

const SearchResultsTemplate = () => {
  const filterStore = useSelector((state) => state.filterSearch);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (filterStore.filterRes.length > 0) {
      setItems(JSON.parse(filterStore.filterRes));
    }
  }, [filterStore.filterRes]);

  return (
    <>
      <SearchForm isCompact={true} showTopLabels={false} showBorder={true} />

      <FiletersPanel />

      <h6
        style={{ marginTop: '32px' }}
      >{`${items.length} resultados de busquedas`}</h6>

      {items.map((item) => {
        return (
          <CardHorizontal
            key={item.car_id}
            slug={item.car_id}
            title={`${item.name} ${item.model} ${item.year}`}
            price={item.price}
            imageSrc={item.image}
          />
        );
      })}
    </>
  );
};

export default SearchResultsTemplate;
