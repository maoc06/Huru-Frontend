import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ScrollContainer from 'react-indiana-drag-scroll';

import useApi from '../../../hooks/useApi';
import makersApi from '../../../api/MakerAPI';
import carBasics from '../../../api/VehicleBasicsAPI';

import {
  filterByMaker,
  filterByNumOfSeats,
  filterByPrice,
  filterByTransmission,
  filterByYear,
  filterByCategory,
  filterByFeatures,
} from '../../../redux/slices/filterSearchSlice';

import SliderRange from '../../elements/Slider/SliderRange';
import SliderStepper from '../../elements/Slider/SliderStepper';
import SimpleList from '../../elements/List/SimpleList';
import CardSelectableLayout from '../../layouts/CardSelectableLayout/CardSelectableLayout';

import styles from './FiltersPanel.module.scss';

import {
  carBrandLogos,
  carFeaturesIcons,
  carTypesIcons,
} from '../../../utils/enums';

export default function FiltersPanel() {
  const dispatch = useDispatch();

  const allMakers = useApi(makersApi.getMakers);
  const allCarCategories = useApi(carBasics.getVehicleCategory);
  const allFeatures = useApi(carBasics.getFeaturesOptions);

  const [makers, setMakers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);

  const [showHideFilters, setShowHideFilter] = useState({
    price: false,
    features: false,
    type: false,
    maker: false,
    year: false,
    seats: false,
    transmission: false,
  });

  const getAllMakers = async () => {
    const res = await allMakers.request();
    setMakers(res.data.data);
  };

  const getAllCategories = async () => {
    const res = await allCarCategories.request();
    setCategories(res.data.data);
  };

  const getAllFeatures = async () => {
    const res = await allFeatures.request();
    setFeatures(res.data.data);
  };

  useEffect(() => {
    getAllMakers();
    getAllCategories();
    getAllFeatures();
  }, []);

  const handleOnStartScroll = () => {
    for (let idx in showHideFilters) {
      if (showHideFilters[idx] === true) {
        setShowHideFilter({ idx: false });
        break;
      }
    }
  };

  const handleFilterByMaker = (value) => {
    dispatch(filterByMaker(value));
  };

  const handleFilterByCarType = (value) => {
    dispatch(filterByCategory(value));
  };

  const handleFilterByTransmission = (value) => {
    dispatch(filterByTransmission(value));
  };

  const handleFilterByNumOfSeats = (value) => {
    const range = { min: parseInt(value), max: 20 };
    dispatch(filterByNumOfSeats(range));
  };

  const handleFilterByPrice = ({ min, max }) => {
    dispatch(filterByPrice({ min, max }));
  };

  const handleFilterByYear = ({ min, max }) => {
    dispatch(filterByYear({ min, max }));
  };

  const handleFilterByFeatures = (value) => {
    dispatch(filterByFeatures(value));
  };

  return (
    <div className={styles.wrapper}>
      <ScrollContainer
        onStartScroll={handleOnStartScroll}
        vertical={false}
        activationDistance={5}
      >
        <div className={styles.scroll_container}>
          <p
            className={`${styles.filter} ${
              showHideFilters.price
                ? styles.triangle_show
                : styles.triangle_hide
            }`}
            onClick={() => setShowHideFilter({ price: !showHideFilters.price })}
          >
            Precio
          </p>

          <p
            className={`${styles.filter} ${
              showHideFilters.features
                ? styles.triangle_show
                : styles.triangle_hide
            }`}
            onClick={() =>
              setShowHideFilter({ features: !showHideFilters.features })
            }
          >
            Caracteristicas
          </p>

          <p
            className={`${styles.filter} ${
              showHideFilters.type ? styles.triangle_show : styles.triangle_hide
            }`}
            onClick={() => setShowHideFilter({ type: !showHideFilters.type })}
          >
            Tipo
          </p>

          <p
            className={`${styles.filter} ${
              showHideFilters.maker
                ? styles.triangle_show
                : styles.triangle_hide
            }`}
            onClick={() => setShowHideFilter({ maker: !showHideFilters.maker })}
          >
            Fabricante
          </p>

          <p
            className={`${styles.filter} ${
              showHideFilters.year ? styles.triangle_show : styles.triangle_hide
            }`}
            onClick={() => setShowHideFilter({ year: !showHideFilters.year })}
          >
            Año
          </p>

          <p
            className={`${styles.filter} ${
              showHideFilters.seats
                ? styles.triangle_show
                : styles.triangle_hide
            }`}
            onClick={() => setShowHideFilter({ seats: !showHideFilters.seats })}
          >
            Asientos
          </p>

          <p
            className={`${styles.filter} ${
              showHideFilters.transmission
                ? styles.triangle_show
                : styles.triangle_hide
            }`}
            onClick={() =>
              setShowHideFilter({ transmission: !showHideFilters.transmission })
            }
          >
            Transmisión
          </p>
        </div>
      </ScrollContainer>

      {/* PRICE PANEL START */}
      <div
        className={`${styles.filter_aux} ${
          showHideFilters.price
            ? styles.filter_aux_show
            : styles.filter_aux_hide
        }`}
      >
        <SliderRange
          numStep={25000}
          min={50000}
          max={1000000}
          onChange={handleFilterByPrice}
          formatToPrice={true}
        />
      </div>
      {/* PRICE PANEL END */}

      {/* FEATURES PANEL START */}
      {!allFeatures.loading && features.length > 0 && (
        <div
          className={`${styles.filter_aux} ${
            showHideFilters.features
              ? styles.filter_aux_show
              : styles.filter_aux_hide
          }`}
        >
          <CardSelectableLayout
            list={features}
            propKey={'featureId'}
            propValue={'name'}
            propSelect={'featureId'}
            onSelect={handleFilterByFeatures}
            withIconEnum={true}
            iconEnum={carFeaturesIcons}
          />
        </div>
      )}
      {/* FEATURES PANEL END */}

      {/* MAKER PANEL START */}
      {!allMakers.loading && makers.length > 0 && (
        <div
          className={`${styles.filter_aux} ${
            showHideFilters.maker
              ? styles.filter_aux_show
              : styles.filter_aux_hide
          }`}
        >
          <CardSelectableLayout
            list={makers}
            propKey={'makerId'}
            propValue={'name'}
            propSelect={'name'}
            onSelect={handleFilterByMaker}
            withIconEnum={true}
            iconEnum={carBrandLogos}
          />
        </div>
      )}
      {/* MAKER PANEL END */}

      {/* TYPE PANEL START */}
      {!allCarCategories.loading && categories.length > 0 && (
        <div
          className={`${styles.filter_aux} ${
            showHideFilters.type
              ? styles.filter_aux_show
              : styles.filter_aux_hide
          }`}
        >
          <CardSelectableLayout
            list={categories}
            propKey={'categoryId'}
            propValue={'name'}
            propSelect={'categoryId'}
            onSelect={handleFilterByCarType}
            withIconEnum={true}
            iconEnum={carTypesIcons}
          />
        </div>
      )}
      {/* TYPE PANEL END */}

      {/* YEAR PANEL START */}
      <div
        className={`${styles.filter_aux} ${
          showHideFilters.year ? styles.filter_aux_show : styles.filter_aux_hide
        }`}
      >
        <SliderRange
          numStep={1}
          min={2010}
          max={2021}
          onChange={handleFilterByYear}
        />
      </div>
      {/* YEAR PANEL END */}

      {/* SEATS PANEL START */}
      <div
        className={`${styles.filter_aux} ${
          showHideFilters.seats
            ? styles.filter_aux_show
            : styles.filter_aux_hide
        }`}
      >
        <SliderStepper
          label="Cantidad de asientos"
          numSteps={1}
          min={2}
          max={8}
          defaultStep={2}
          message="o más"
          onChange={handleFilterByNumOfSeats}
        />
      </div>
      {/* SEATS PANEL END */}

      {/* TRANSMISSION PANEL START */}
      <div
        className={`${styles.filter_aux} ${
          showHideFilters.transmission
            ? styles.filter_aux_show
            : styles.filter_aux_hide
        }`}
      >
        <SimpleList
          list={[
            { id: 0, name: 'todas' },
            { id: 1, name: 'mecánico' },
            { id: 2, name: 'automatico' },
          ]}
          onSelect={handleFilterByTransmission}
        />
      </div>
      {/* TRANSMISSION PANEL END */}
    </div>
  );
}
