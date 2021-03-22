import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { useSelector } from 'react-redux';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import { styles } from './styles';

export default function AutoCompletePlaces({ name, placeholder, isCompact }) {
  const search = useSelector((state) => state.searchParams);
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (search.cityLabel.label !== undefined) {
      handleChangeCity(search.cityLabel);
    }
  }, []);

  const handleChangeCity = (city) => {
    setFieldValue(name, city);
  };

  return (
    <GooglePlacesAutocomplete
      name="location"
      apiKey={process.env.GCP_API_KEY}
      apiOptions={{ language: 'es', region: 'CO' }}
      autocompletionRequest={{ types: ['(cities)'] }}
      selectProps={{
        instanceId: 'search-form-by-city',
        value: values[name],
        onChange: handleChangeCity,
        placeholder,
        styles: styles({ isCompact }),
      }}
    />
  );
}
