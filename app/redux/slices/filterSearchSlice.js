import { createSlice } from '@reduxjs/toolkit';
import { buildFilter, filterData } from '../../utils/filterState';

const initialState = {
  originalRes: [],
  listFilters: {
    price: { min: 50000, max: 1000000 },
    features: [],
    categories: [],
    name: [],
    year: { min: 2010, max: 2021 },
    number_of_seats: { min: 1, max: 20 },
    // transmission_id
  },
  filterRes: [],
};

export const filterSearchSlice = createSlice({
  name: 'filterSearch',
  initialState,
  reducers: {
    setResults: (state, action) => {
      let data = JSON.parse(action.payload);

      data = data.map((item) => {
        let { categories, features } = item;

        features = features.map(({ featureId }) => featureId);
        categories = categories.map(({ categoryId }) => categoryId);

        return { ...item, categories, features };
      });
      data = JSON.stringify(data);

      state.originalRes = data;
      state.filterRes = data;
    },
    filterByMaker: (state, action) => {
      const filter = { ...state.listFilters };
      const isAlreadyExists = filter.name && filter.name.includes(action.payload);
      let applyFilter = [];

      if (isAlreadyExists) {
        applyFilter = state.listFilters.name.filter(
          (maker) => maker !== action.payload
        );
      } else {
        applyFilter = [...(filter.name || []), action.payload];
      }

      filter.name = applyFilter;
      state.listFilters = filter;

      const query = buildFilter(JSON.stringify(filter));
      const result = filterData(state.originalRes, query);

      state.filterRes = JSON.stringify(result);
    },
    filterByNumOfSeats: (state, action) => {
      const { payload } = action;

      const filter = { ...state.listFilters };

      let numSeats = { ...filter.number_of_seats };
      numSeats = payload;

      filter.number_of_seats = numSeats;
      state.listFilters = filter;

      const query = buildFilter(JSON.stringify(filter));
      const result = filterData(state.originalRes, query);

      state.filterRes = JSON.stringify(result);
    },
    filterByPrice: (state, action) => {
      const { payload } = action;

      const filter = { ...state.listFilters };

      let priceRange = { ...filter.price };
      priceRange = payload;

      filter.price = priceRange;
      state.listFilters = filter;

      const query = buildFilter(JSON.stringify(filter));
      const result = filterData(state.originalRes, query);

      state.filterRes = JSON.stringify(result);
    },
    filterByTransmission: (state, action) => {
      let applyFilter = [];
      const { payload } = action;
      const filter = { ...state.listFilters };

      if (payload !== 0) {
        applyFilter = filter.transmission_id;
        applyFilter = payload;
      }

      filter.transmission_id = applyFilter;
      state.listFilters = filter;

      const query = buildFilter(JSON.stringify(filter));
      const result = filterData(state.originalRes, query);

      state.filterRes = JSON.stringify(result);
    },
    filterByYear: (state, action) => {
      const { payload } = action;

      const filter = { ...state.listFilters };

      let yearRange = { ...filter.year };
      yearRange = payload;

      filter.year = yearRange;
      state.listFilters = filter;

      const query = buildFilter(JSON.stringify(filter));
      const result = filterData(state.originalRes, query);

      state.filterRes = JSON.stringify(result);
    },
    filterByCategory: (state, action) => {
      const filter = { ...state.listFilters };
      const isAlreadyExists = filter.categories && filter.categories.includes(action.payload);
      let applyFilter = [];

      if (isAlreadyExists) {
        applyFilter = state.listFilters.categories.filter(
          (category) => category !== action.payload
        );
      } else {
        applyFilter = [...(filter.categories || []), action.payload];
      }

      filter.categories = applyFilter;
      state.listFilters = filter;

      const query = buildFilter(JSON.stringify(filter));
      const result = filterData(state.originalRes, query);

      state.filterRes = JSON.stringify(result);
    },
    filterByFeatures: (state, action) => {
      const filter = { ...state.listFilters };
      const isAlreadyExists = filter.features && filter.features.includes(action.payload);
      let applyFilter = [];

      if (isAlreadyExists) {
        applyFilter = state.listFilters.features.filter(
          (feature) => feature !== action.payload
        );
      } else {
        applyFilter = [...(filter.features || []), action.payload];
      }

      filter.features = applyFilter;
      state.listFilters = filter;

      const query = buildFilter(JSON.stringify(filter));
      const result = filterData(state.originalRes, query);

      state.filterRes = JSON.stringify(result);
    },
  },
});

export const {
  setResults,
  filterByMaker,
  filterByNumOfSeats,
  filterByPrice,
  filterByTransmission,
  filterByYear,
  filterByCategory,
  filterByFeatures,
} = filterSearchSlice.actions;

export default filterSearchSlice.reducer;
