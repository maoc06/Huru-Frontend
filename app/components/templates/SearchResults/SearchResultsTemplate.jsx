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

  const handleGetFilters = () => {
    console.log('Filters:', filterStore.listFilters);
  };

  return (
    <>
      <SearchForm isCompact={true} />

      <FiletersPanel />

      {/* <p onClick={handleFilterByMaker}>Fabricante</p> */}
      {/* <p onClick={handleFilterByNumOfSeats}>Asientos</p> */}
      {/* <p onClick={handleFilterByTransmission}>Transmisión</p> */}
      {/* <p onClick={handleFilterByPrice}>Precio</p> */}
      {/* <p onClick={handleGetFilters}>get filters</p> */}

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
