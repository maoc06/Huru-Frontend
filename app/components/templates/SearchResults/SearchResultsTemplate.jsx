import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import CardHorizontal from '../../elements/CardHorizontal/CardHorizontal';
import SearchForm from '../../modules/SearchForm/SearchForm';
import FiletersPanel from '../../modules/FiltersPanel/FiltersPanel';

const SearchResultsTemplate = () => {
  const router = useRouter();
  const filterStore = useSelector((state) => state.filterSearch);
  const [items, setItems] = useState([]);

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

      {items.map(({ car_id: slug, name, model, year, price, image }) => {
        return (
          <CardHorizontal
            key={slug}
            title={`${name} ${model} ${year}`}
            price={price}
            imageSrc={image}
            onSelect={() => handleClick(slug)}
          />
        );
      })}
    </>
  );
};

export default SearchResultsTemplate;
