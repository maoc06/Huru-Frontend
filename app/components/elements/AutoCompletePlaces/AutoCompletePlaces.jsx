import { useEffect, useState, useRef } from 'react';
import { useFormikContext } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import { setPlace } from '../../../redux/slices/searchParamsSlice';

import { styles } from './styles';

export default function AutoCompletePlaces({
  name,
  placeholder,
  isCompact,
  noBorder = false,
  detectChanges = false,
  onDetectChanges = () => {},
}) {
  const place = useSelector((state) => state.searchParams.place);
  const dispatch = useDispatch();
  const { values, setFieldValue } = useFormikContext();
  const [isMobile, setIsMobile] = useState(true);
  const isMountedRef = useRef(true);

  const handleWindow = () => {
    // Only update state if component is still mounted
    if (!isMountedRef.current) return;
    
    if (window.innerWidth > 720) setIsMobile(false);
    else setIsMobile(true);
  };

  useEffect(() => {
    if (!checkEmptyPlace()) {
      handleChangePlace(place);
    } else {
      const isClient = typeof window !== 'undefined';
      if (isClient) {
        const place = JSON.parse(window.localStorage.getItem('place'));
        if (place !== null) setFieldValue(name, place);
      }
    }
  }, [place]);

  useEffect(() => {
    handleWindow();
    
    // Create a named function for the event listener
    const handleResize = () => {
      handleWindow();
    };
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup function to remove event listener when component unmounts
    return () => {
      isMountedRef.current = false;
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const checkEmptyPlace = () => {
    if (place.constructor === Object) {
      if (Object.keys(place).length === 0) return true;
      else return false;
    } else {
      return false;
    }
  };

  const handleChangePlace = (place) => {
    setFieldValue(name, place);
    dispatch(setPlace(place));

    if (detectChanges) onDetectChanges(place);
  };

  return (
    <GooglePlacesAutocomplete
      name="location"
      apiKey={process.env.GCP_API_KEY}
      apiOptions={{ language: 'es', region: 'CO' }}
      autocompletionRequest={{ types: ['(cities)'] }}
      selectProps={{
        noOptionsMessage: ({}) => 'No hay resultados',
        loadingMessage: ({}) => 'Buscando...',
        instanceId: 'search-form-by-city',
        value: values[name],
        onChange: handleChangePlace,
        placeholder,
        menuPortalTarget: typeof document !== 'undefined' ? document.body : null,
        menuPosition: 'absolute',
        menuPlacement: 'auto',
        styles: styles({
          isCompact,
          isMobile,
          noBorder,
        }),
      }}
    />
  );
}
