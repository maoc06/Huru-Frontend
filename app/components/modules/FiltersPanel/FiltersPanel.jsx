import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

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
import { ExpandIcon } from '../../elements/Icons/Shared';
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
  const [showModal, setShowModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    price: false,
    features: false,
    type: false,
    maker: false,
    year: false,
    seats: false,
    transmission: false,
  });
  const [filterSelections, setFilterSelections] = useState({
    price: { min: 50000, max: 1000000 },
    features: [],
    type: [],
    maker: [],
    year: { min: 2010, max: 2021 },
    seats: { min: 2, max: 20 },
    transmission: null,
  });
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0 });
  const [mobileFilterType, setMobileFilterType] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef(null);

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

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 720);
      checkScrollButtons();
      // Close dropdown on mobile/desktop switch
      if (window.innerWidth < 720) {
        setOpenDropdown(null);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Add scroll listener for navigation buttons
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons);
    }
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.filters-panel')) {
        setOpenDropdown(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('mousedown', handleClickOutside);
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScrollButtons);
      }
    };
  }, []);

  // Check scroll buttons when data loads
  useEffect(() => {
    if (!isMobile && (categories.length > 0 || makers.length > 0 || features.length > 0)) {
      setTimeout(checkScrollButtons, 100); // Small delay to ensure DOM is updated
    }
  }, [categories, makers, features, isMobile]);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const handleFilterByMaker = (value) => {
    dispatch(filterByMaker(value));
    setFilterSelections(prev => {
      const newMaker = prev.maker.includes(value) 
        ? prev.maker.filter(m => m !== value)
        : [...prev.maker, value];
      
      // Update active filters based on if maker array is not empty
      setActiveFilters(prevFilters => ({ 
        ...prevFilters, 
        maker: newMaker.length > 0 
      }));
      
      return {
        ...prev,
        maker: newMaker
      };
    });
    
    if (!isMobile) {
      setOpenDropdown(null);
    } else if (mobileFilterType) {
      setShowModal(false);
      setMobileFilterType(null);
    }
  };

  const handleFilterByCarType = (value) => {
    dispatch(filterByCategory(value));
    setFilterSelections(prev => {
      const newType = prev.type.includes(value) 
        ? prev.type.filter(t => t !== value)
        : [...prev.type, value];
      
      // Update active filters based on if type array is not empty
      setActiveFilters(prevFilters => ({ 
        ...prevFilters, 
        type: newType.length > 0 
      }));
      
      return {
        ...prev,
        type: newType
      };
    });
    
    if (!isMobile) {
      setOpenDropdown(null);
    } else if (mobileFilterType) {
      setShowModal(false);
      setMobileFilterType(null);
    }
  };

  const handleFilterByTransmission = (value) => {
    dispatch(filterByTransmission(value));
    setFilterSelections(prev => ({ ...prev, transmission: value }));
    setActiveFilters(prev => ({ ...prev, transmission: value && value !== 'todas' }));
    if (!isMobile) {
      setOpenDropdown(null);
    } else if (mobileFilterType) {
      setShowModal(false);
      setMobileFilterType(null);
    }
  };

  const handleFilterByNumOfSeats = (value) => {
    const range = { min: parseInt(value), max: 20 };
    dispatch(filterByNumOfSeats(range));
    setFilterSelections(prev => ({ ...prev, seats: range }));
    setActiveFilters(prev => ({ ...prev, seats: parseInt(value) > 2 }));
    if (!isMobile) {
      setOpenDropdown(null);
    } else if (mobileFilterType) {
      setShowModal(false);
      setMobileFilterType(null);
    }
  };

  const handleFilterByPrice = ({ min, max }) => {
    dispatch(filterByPrice({ min, max }));
    setFilterSelections(prev => ({ ...prev, price: { min, max } }));
    setActiveFilters(prev => ({ ...prev, price: min > 50000 || max < 1000000 }));
    if (!isMobile) {
      setOpenDropdown(null);
    } else if (mobileFilterType) {
      setShowModal(false);
      setMobileFilterType(null);
    }
  };

  const handleFilterByYear = ({ min, max }) => {
    dispatch(filterByYear({ min, max }));
    setFilterSelections(prev => ({ ...prev, year: { min, max } }));
    setActiveFilters(prev => ({ ...prev, year: min > 2010 || max < 2021 }));
    if (!isMobile) {
      setOpenDropdown(null);
    } else if (mobileFilterType) {
      setShowModal(false);
      setMobileFilterType(null);
    }
  };

  const handleFilterByFeatures = (value) => {
    dispatch(filterByFeatures(value));
    setFilterSelections(prev => {
      const newFeatures = prev.features.includes(value) 
        ? prev.features.filter(f => f !== value)
        : [...prev.features, value];
      
      // Update active filters based on if features array is not empty
      setActiveFilters(prevFilters => ({ 
        ...prevFilters, 
        features: newFeatures.length > 0 
      }));
      
      return {
        ...prev,
        features: newFeatures
      };
    });
    
    if (!isMobile) {
      setOpenDropdown(null);
    } else if (mobileFilterType) {
      setShowModal(false);
      setMobileFilterType(null);
    }
  };

  const clearAllFilters = () => {
    setActiveFilters({
      price: false,
      features: false,
      type: false,
      maker: false,
      year: false,
      seats: false,
      transmission: false,
    });
    setFilterSelections({
      price: { min: 50000, max: 1000000 },
      features: [],
      type: [],
      maker: [],
      year: { min: 2010, max: 2021 },
      seats: { min: 2, max: 20 },
      transmission: null,
    });
    // Dispatch clear actions for all filters
    dispatch(filterByPrice({ min: 50000, max: 1000000 }));
    dispatch(filterByYear({ min: 2010, max: 2021 }));
    dispatch(filterByNumOfSeats({ min: 2, max: 20 }));
    dispatch(filterByMaker(''));
    dispatch(filterByCategory(''));
    dispatch(filterByTransmission(''));
    dispatch(filterByFeatures(''));
  };

  const getActiveFiltersCount = () => {
    return Object.values(activeFilters).filter(Boolean).length;
  };

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price}`;
  };

  const getPriceText = () => {
    if (!activeFilters.price) return 'Precio';
    const { min, max } = filterSelections.price;
    if (min === 50000 && max === 1000000) return 'Precio';
    return `Precio • ${formatPrice(min)} - ${formatPrice(max)}+`;
  };

  const getTypeText = () => {
    if (!activeFilters.type || filterSelections.type.length === 0) return 'Tipo';
    const count = filterSelections.type.length;
    return `Tipo (${count})`;
  };

  const getMakerText = () => {
    if (!activeFilters.maker || filterSelections.maker.length === 0) return 'Marca';
    const count = filterSelections.maker.length;
    return `Marca (${count})`;
  };

  const getYearText = () => {
    if (!activeFilters.year) return 'Año';
    const { min, max } = filterSelections.year;
    if (min === 2010 && max === 2021) return 'Año';
    return min === max ? `Año ${min}` : `Año ${min}-${max}`;
  };

  const getSeatsText = () => {
    if (!activeFilters.seats) return 'Asientos';
    const { min } = filterSelections.seats;
    if (min === 2) return 'Asientos';
    return `Asientos ${min}+`;
  };

  const getTransmissionText = () => {
    if (!activeFilters.transmission || !filterSelections.transmission) return 'Transmisión';
    const transmission = filterSelections.transmission;
    return transmission === 'mecánico' ? 'Manual' : 
           transmission === 'automatico' ? 'Automático' : 'Transmisión';
  };

  const getFeaturesText = () => {
    if (!activeFilters.features || filterSelections.features.length === 0) return 'Características';
    const count = filterSelections.features.length;
    return `Características (${count})`;
  };

  // Helper functions to convert stored values to component indices
  const getTypeIndices = () => {
    if (!categories.length) return [];
    return categories
      .filter(cat => filterSelections.type.includes(cat.categoryId))
      .map(cat => cat.categoryId);
  };

  const getMakerIndices = () => {
    if (!makers.length) return [];
    return makers
      .filter(maker => filterSelections.maker.includes(maker.name))
      .map(maker => maker.makerId);
  };

  const getFeatureIndices = () => {
    if (!features.length) return [];
    return features
      .filter(feature => filterSelections.features.includes(feature.featureId))
      .map(feature => feature.featureId);
  };

  const handleFilterTagClick = (filterType, event) => {
    if (isMobile) {
      setMobileFilterType(filterType);
      setShowModal(true);
    } else {
      if (openDropdown === filterType) {
        setOpenDropdown(null);
      } else {
        try {
          // Calculate position relative to clicked tag
          const tagElement = event.currentTarget;
          const containerElement = tagElement.closest('.filters-panel');
          
          if (!tagElement || !containerElement) {
            console.warn('Filter elements not found, using fallback positioning');
            setDropdownPosition({ left: 0 });
            setOpenDropdown(filterType);
            return;
          }
          
          const tagRect = tagElement.getBoundingClientRect();
          const containerRect = containerElement.getBoundingClientRect();
          
          const relativeLeft = tagRect.left - containerRect.left;
          const tagWidth = tagRect.width;
          const dropdownWidth = 350; // max-width of dropdown
          
          // Center the dropdown under the tag, but keep it within bounds
          let left = relativeLeft + (tagWidth / 2) - (dropdownWidth / 2);
          
          // Ensure dropdown doesn't go off the left edge
          if (left < 0) {
            left = 0;
          }
          
          // Ensure dropdown doesn't go off the right edge
          const containerWidth = containerRect.width;
          if (left + dropdownWidth > containerWidth) {
            left = containerWidth - dropdownWidth;
          }
          
          setDropdownPosition({ left });
          setOpenDropdown(filterType);
        } catch (error) {
          console.warn('Error positioning dropdown:', error);
          // Fallback positioning
          setDropdownPosition({ left: 0 });
          setOpenDropdown(filterType);
        }
      }
    }
  };

  // Add scroll navigation functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`${styles.wrapper} filters-panel`}>
      {/* Navigation Button Left - Desktop Only */}
      {!isMobile && (
        <button 
          className={styles.navButtonLeft}
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <ChevronLeftIcon />
        </button>
      )}

      <div className={styles.scrollContainer}>
        <div 
          className={styles.filtersContainer}
          ref={scrollContainerRef}
        >
          {/* Quick filter tags */}
          <div 
            className={`${styles.filterTag} ${activeFilters.price ? styles.active : ''} ${openDropdown === 'price' ? styles.expanded : ''}`}
            onClick={(e) => handleFilterTagClick('price', e)}
          >
            {getPriceText()}
            {!isMobile && (
              <ExpandIcon
                width={16}
                height={16}
                deg={openDropdown === 'price' ? 180 : 0}
              />
            )}
          </div>

          <div 
            className={`${styles.filterTag} ${activeFilters.type ? styles.active : ''} ${openDropdown === 'type' ? styles.expanded : ''}`}
            onClick={(e) => handleFilterTagClick('type', e)}
          >
            {getTypeText()}
            {!isMobile && (
              <ExpandIcon
                width={16}
                height={16}
                deg={openDropdown === 'type' ? 180 : 0}
              />
            )}
          </div>

          <div 
            className={`${styles.filterTag} ${activeFilters.maker ? styles.active : ''} ${openDropdown === 'maker' ? styles.expanded : ''}`}
            onClick={(e) => handleFilterTagClick('maker', e)}
          >
            {getMakerText()}
            {!isMobile && (
              <ExpandIcon
                width={16}
                height={16}
                deg={openDropdown === 'maker' ? 180 : 0}
              />
            )}
          </div>

          <div 
            className={`${styles.filterTag} ${activeFilters.year ? styles.active : ''} ${openDropdown === 'year' ? styles.expanded : ''}`}
            onClick={(e) => handleFilterTagClick('year', e)}
          >
            {getYearText()}
            {!isMobile && (
              <ExpandIcon
                width={16}
                height={16}
                deg={openDropdown === 'year' ? 180 : 0}
              />
            )}
          </div>

          <div 
            className={`${styles.filterTag} ${activeFilters.seats ? styles.active : ''} ${openDropdown === 'seats' ? styles.expanded : ''}`}
            onClick={(e) => handleFilterTagClick('seats', e)}
          >
            {getSeatsText()}
            {!isMobile && (
              <ExpandIcon
                width={16}
                height={16}
                deg={openDropdown === 'seats' ? 180 : 0}
              />
            )}
          </div>

          <div 
            className={`${styles.filterTag} ${activeFilters.transmission ? styles.active : ''} ${openDropdown === 'transmission' ? styles.expanded : ''}`}
            onClick={(e) => handleFilterTagClick('transmission', e)}
          >
            {getTransmissionText()}
            {!isMobile && (
              <ExpandIcon
                width={16}
                height={16}
                deg={openDropdown === 'transmission' ? 180 : 0}
              />
            )}
        </div>

      <div
            className={`${styles.filterTag} ${activeFilters.features ? styles.active : ''} ${openDropdown === 'features' ? styles.expanded : ''}`}
            onClick={(e) => handleFilterTagClick('features', e)}
          >
            {getFeaturesText()}
            {!isMobile && (
              <ExpandIcon
                width={16}
                height={16}
                deg={openDropdown === 'features' ? 180 : 0}
              />
            )}
            </div>

          {/* All filters button */}
          <div 
            className={`${styles.allFiltersButton} ${getActiveFiltersCount() > 0 ? styles.active : ''}`}
            onClick={() => {
              setMobileFilterType(null);
              setShowModal(true);
            }}
          >
            Todos los filtros
            {getActiveFiltersCount() > 0 && (
              <span style={{ 
                backgroundColor: '#081D3D', 
                color: 'white', 
                borderRadius: '50%', 
                width: '20px', 
                height: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '12px', 
                fontWeight: 'bold' 
              }}>
                {getActiveFiltersCount()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Button Right - Desktop Only */}
      {!isMobile && (
        <button 
          className={styles.navButtonRight}
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <ChevronRightIcon />
        </button>
      )}

      {/* Desktop dropdown filters */}
      {!isMobile && openDropdown && (
        <div 
          className={styles.filterDropdown}
          style={{ left: `${dropdownPosition.left}px` }}
        >
          {openDropdown === 'price' && (
            <div className={styles.dropdownContent}>
              <h4>Rango de Precio</h4>
              <SliderRange
                numStep={25000}
                min={50000}
                max={1000000}
                defaultMin={filterSelections.price.min}
                defaultMax={filterSelections.price.max}
                onChange={handleFilterByPrice}
                formatToPrice={true}
              />
            </div>
        )}

          {openDropdown === 'type' && !allCarCategories.loading && categories.length > 0 && (
            <div className={styles.dropdownContent}>
              <h4>Tipo de Vehículo</h4>
              <CardSelectableLayout
                list={categories}
                propKey={'categoryId'}
                propValue={'name'}
                propSelect={'categoryId'}
                initialSelected={getTypeIndices()}
                onSelect={handleFilterByCarType}
                withIconEnum={true}
                iconEnum={carTypesIcons}
              />
            </div>
          )}

          {openDropdown === 'maker' && !allMakers.loading && makers.length > 0 && (
            <div className={styles.dropdownContent}>
              <h4>Marca</h4>
              <CardSelectableLayout
                list={makers}
                propKey={'makerId'}
                propValue={'name'}
                propSelect={'name'}
                initialSelected={getMakerIndices()}
                onSelect={handleFilterByMaker}
                withIconEnum={true}
                iconEnum={carBrandLogos}
              />
      </div>
          )}

          {openDropdown === 'year' && (
            <div className={styles.dropdownContent}>
              <h4>Año del Vehículo</h4>
              <SliderRange
                numStep={1}
                min={2010}
                max={2021}
                defaultMin={filterSelections.year.min}
                defaultMax={filterSelections.year.max}
                onChange={handleFilterByYear}
                />
              </div>
          )}

          {openDropdown === 'seats' && (
            <div className={styles.dropdownContent}>
              <h4>Número de Asientos</h4>
              <SliderStepper
                label="Cantidad de asientos"
                numSteps={1}
                min={2}
                max={8}
                defaultStep={filterSelections.seats.min}
                message="o más"
                onChange={handleFilterByNumOfSeats}
              />
            </div>
          )}

          {openDropdown === 'transmission' && (
            <div className={styles.dropdownContent}>
              <h4>Transmisión</h4>
              <SimpleList
                list={[
                  { id: 0, name: 'todas' },
                  { id: 1, name: 'mecánico' },
                  { id: 2, name: 'automatico' },
                ]}
                selectedValue={filterSelections.transmission}
                onSelect={handleFilterByTransmission}
              />
            </div>
          )}

          {openDropdown === 'features' && !allFeatures.loading && features.length > 0 && (
            <div className={styles.dropdownContent}>
              <h4>Características</h4>
                <CardSelectableLayout
                  list={features}
                  propKey={'featureId'}
                  propValue={'name'}
                  propSelect={'featureId'}
                initialSelected={getFeatureIndices()}
                  onSelect={handleFilterByFeatures}
                  withIconEnum={true}
                  iconEnum={carFeaturesIcons}
                />
              </div>
          )}
        </div>
      )}

      {/* Modal for mobile filtering */}
      {showModal && (
        <div className={styles.filterModal} onClick={() => {
          setShowModal(false);
          setMobileFilterType(null);
        }}>
          <div 
            className={styles.filterModalContent} 
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3>
                {mobileFilterType === 'price' && 'Rango de Precio'}
                {mobileFilterType === 'type' && 'Tipo de Vehículo'}
                {mobileFilterType === 'maker' && 'Marca'}
                {mobileFilterType === 'year' && 'Año del Vehículo'}
                {mobileFilterType === 'seats' && 'Número de Asientos'}
                {mobileFilterType === 'transmission' && 'Transmisión'}
                {mobileFilterType === 'features' && 'Características'}
                {!mobileFilterType && 'Filtros'}
              </h3>
              <button onClick={() => {
                setShowModal(false);
                setMobileFilterType(null);
              }}>
                <CloseIcon />
              </button>
            </div>

            {/* Price Filter */}
            {mobileFilterType === 'price' && (
              <div className={styles.filterSection}>
                <SliderRange
                  numStep={25000}
                  min={50000}
                  max={1000000}
                  defaultMin={filterSelections.price.min}
                  defaultMax={filterSelections.price.max}
                  onChange={handleFilterByPrice}
                  formatToPrice={true}
                />
            </div>
          )}

            {/* Vehicle Type Filter */}
            {mobileFilterType === 'type' && !allCarCategories.loading && categories.length > 0 && (
              <div className={styles.filterSection}>
            <CardSelectableLayout
                  list={categories}
                  propKey={'categoryId'}
              propValue={'name'}
                  propSelect={'categoryId'}
                  initialSelected={getTypeIndices()}
                  onSelect={handleFilterByCarType}
              withIconEnum={true}
                  iconEnum={carTypesIcons}
            />
              </div>
            )}

            {/* Maker Filter */}
            {mobileFilterType === 'maker' && !allMakers.loading && makers.length > 0 && (
              <div className={styles.filterSection}>
                <CardSelectableLayout
                  list={makers}
                  propKey={'makerId'}
                  propValue={'name'}
                  propSelect={'name'}
                  initialSelected={getMakerIndices()}
                  onSelect={handleFilterByMaker}
                  withIconEnum={true}
                  iconEnum={carBrandLogos}
                />
              </div>
          )}

            {/* Year Filter */}
            {mobileFilterType === 'year' && (
              <div className={styles.filterSection}>
                <SliderRange
                  numStep={1}
                  min={2010}
                  max={2021}
                  defaultMin={filterSelections.year.min}
                  defaultMax={filterSelections.year.max}
                  onChange={handleFilterByYear}
                />
        </div>
      )}

            {/* Seats Filter */}
            {mobileFilterType === 'seats' && (
              <div className={styles.filterSection}>
                <SliderStepper
                  label="Cantidad de asientos"
                  numSteps={1}
                  min={2}
                  max={8}
                  defaultStep={filterSelections.seats.min}
                  message="o más"
                  onChange={handleFilterByNumOfSeats}
                />
              </div>
            )}

            {/* Transmission Filter */}
            {mobileFilterType === 'transmission' && (
              <div className={styles.filterSection}>
                <SimpleList
                  list={[
                    { id: 0, name: 'todas' },
                    { id: 1, name: 'mecánico' },
                    { id: 2, name: 'automatico' },
                  ]}
                  selectedValue={filterSelections.transmission}
                  onSelect={handleFilterByTransmission}
                />
            </div>
          )}

            {/* Features Filter */}
            {mobileFilterType === 'features' && !allFeatures.loading && features.length > 0 && (
              <div className={styles.filterSection}>
            <CardSelectableLayout
                  list={features}
                  propKey={'featureId'}
              propValue={'name'}
                  propSelect={'featureId'}
                  initialSelected={getFeatureIndices()}
                  onSelect={handleFilterByFeatures}
              withIconEnum={true}
                  iconEnum={carFeaturesIcons}
            />
              </div>
            )}

            {/* All Filters - when "Todos los filtros" is clicked */}
            {!mobileFilterType && (
              <>
                {/* Price Filter */}
                <div className={styles.filterSection}>
                  <div className={styles.filterSectionTitle}>
                    Rango de Precio
                  </div>
                  <SliderRange
                    numStep={25000}
                    min={50000}
                    max={1000000}
                    defaultMin={filterSelections.price.min}
                    defaultMax={filterSelections.price.max}
                    onChange={handleFilterByPrice}
                    formatToPrice={true}
                  />
                </div>

                {/* Vehicle Type Filter */}
                {!allCarCategories.loading && categories.length > 0 && (
                  <div className={styles.filterSection}>
                    <div className={styles.filterSectionTitle}>
                      Tipo de Vehículo
                    </div>
                <CardSelectableLayout
                  list={categories}
                  propKey={'categoryId'}
                  propValue={'name'}
                  propSelect={'categoryId'}
                      initialSelected={getTypeIndices()}
                  onSelect={handleFilterByCarType}
                  withIconEnum={true}
                  iconEnum={carTypesIcons}
                />
              </div>
          )}

                {/* Maker Filter */}
                {!allMakers.loading && makers.length > 0 && (
                  <div className={styles.filterSection}>
                    <div className={styles.filterSectionTitle}>
                      Marca
        </div>
                    <CardSelectableLayout
                      list={makers}
                      propKey={'makerId'}
                      propValue={'name'}
                      propSelect={'name'}
                      initialSelected={getMakerIndices()}
                      onSelect={handleFilterByMaker}
                      withIconEnum={true}
                      iconEnum={carBrandLogos}
              />
          </div>
        )}

                {/* Year Filter */}
                <div className={styles.filterSection}>
                  <div className={styles.filterSectionTitle}>
                    Año del Vehículo
                  </div>
          <SliderRange
            numStep={1}
            min={2010}
            max={2021}
                    defaultMin={filterSelections.year.min}
                    defaultMax={filterSelections.year.max}
                onChange={handleFilterByYear}
              />
            </div>

                {/* Seats Filter */}
                <div className={styles.filterSection}>
                  <div className={styles.filterSectionTitle}>
                    Número de Asientos
          </div>
          <SliderStepper
            label="Cantidad de asientos"
            numSteps={1}
            min={2}
            max={8}
                    defaultStep={filterSelections.seats.min}
                message="o más"
                onChange={handleFilterByNumOfSeats}
              />
            </div>

                {/* Transmission Filter */}
                <div className={styles.filterSection}>
                  <div className={styles.filterSectionTitle}>
                    Transmisión
          </div>
          <SimpleList
            list={[
              { id: 0, name: 'todas' },
              { id: 1, name: 'mecánico' },
              { id: 2, name: 'automatico' },
            ]}
                    selectedValue={filterSelections.transmission}
            onSelect={handleFilterByTransmission}
          />
                </div>

                {/* Features Filter */}
                {!allFeatures.loading && features.length > 0 && (
                  <div className={styles.filterSection}>
                    <div className={styles.filterSectionTitle}>
                      Características
                    </div>
                    <CardSelectableLayout
                      list={features}
                      propKey={'featureId'}
                      propValue={'name'}
                      propSelect={'featureId'}
                      initialSelected={getFeatureIndices()}
                      onSelect={handleFilterByFeatures}
                      withIconEnum={true}
                      iconEnum={carFeaturesIcons}
                    />
                  </div>
                )}
              </>
            )}

            {/* Modal Actions */}
            <div className={styles.filterActions}>
              <button 
                className={styles.secondary}
                onClick={() => {
                  setShowModal(false);
                  setMobileFilterType(null);
                }}
              >
                Cancelar
              </button>
              <button 
                className={styles.primary}
                onClick={() => {
                  setShowModal(false);
                  setMobileFilterType(null);
                }}
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
        )}
    </div>
  );
}
