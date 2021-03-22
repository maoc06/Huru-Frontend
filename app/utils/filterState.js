const buildFilter = (filter) => {
  filter = JSON.parse(filter);
  let query = {};
  for (let keys in filter) {
    if (
      filter[keys].constructor === Object ||
      (filter[keys].constructor === Array && filter[keys].length > 0) ||
      filter[keys].constructor === Number
    ) {
      query[keys] = filter[keys];
    }
  }
  return query;
};

const filterData = (data, query) => {
  const originalData = JSON.parse(data);
  const keysWithMinMax = ['price', 'year', 'number_of_seats'];

  const filteredData = originalData.filter((item) => {
    for (let key in query) {
      if (item[key] !== undefined) {
        if (keysWithMinMax.includes(key)) {
          if (query[key]['min'] !== null && item[key] < query[key]['min']) {
            return false;
          }
          if (query[key]['max'] !== null && item[key] > query[key]['max']) {
            return false;
          }
        } else if (query[key].constructor === Array) {
          const features = query[key];
          for (let idx in features) {
            const feature = features[idx];
            if (
              typeof item[key] === 'object' ||
              typeof item[key] === 'string'
            ) {
              if (!item[key].includes(feature)) {
                return false;
              }
            } else if (typeof item[key] === 'number') {
              if (item[key] !== feature) {
                return false;
              }
            }
          }
        } else if (query[key].constructor === Number) {
          if (item[key] !== query[key]) {
            return false;
          }
        } else if (!query[key].includes(item[key])) {
          return false;
        }
      }
    }
    return true;
  });
  return filteredData;
};

export { buildFilter, filterData };
