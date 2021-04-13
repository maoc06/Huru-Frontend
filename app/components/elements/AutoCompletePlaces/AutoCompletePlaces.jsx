import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import { setPlace } from '../../../redux/slices/searchParamsSlice';

import { styles } from './styles';

export default function AutoCompletePlaces({ name, placeholder, isCompact }) {
  const place = useSelector((state) => state.searchParams.place);
  const dispatch = useDispatch();
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (!checkEmptyPlace) {
      handleChangePlace(place);
    }
  }, []);

  const checkEmptyPlace = () => {
    if (place.constructor === Object && Object.keys(place).length === 0) {
      return true;
    }
    return false;
  };

  const handleChangePlace = (place) => {
    setFieldValue(name, place);
    dispatch(setPlace(place));
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
        onChange: handleChangePlace,
        placeholder,
        styles: styles({ isCompact }),
      }}
    />
  );
}
