import { useRouter } from 'next/router';

import Form from '../Forms/Form';
import DatesPanel from '../DatesPanel/DatesPanel';
import AutoCompletePlaces from '../../elements/AutoCompletePlaces/AutoCompletePlaces';
import SubmitButton from '../../elements/Button/SubmitButton';

import searchSchema from '../../../constants/validationSchema/search';

import styles from './SearchForm.module.scss';

// Search Icon Component
const SearchIcon = ({ width = 24, height = 24, color = '#828282' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      fill={color}
      d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
    />
  </svg>
);

export default function SearchForm({
  clickleable = true,
  isCompact = false,
  showBorder = false,
  showTopLabels = true,
  startDateBorder = false,
  withMarginBottom = true,
  listenPlaces = false,
  listenerPlaces = () => {},
  listenDates = false,
  listenerDates = () => {},
}) {
  const router = useRouter();
  const initialValues = { location: '' };

  const handleSubmit = ({ location }) => {
    const cityName = location.value.structured_formatting.main_text;
    router.push(`/search/${cityName}`);
  };

  return (
    <div
      className={`${styles.container} ${!isCompact && styles.container_full} ${
        showBorder && styles.container_border
      } ${withMarginBottom && styles.margin_bottom}`}
    >
      <Form
        initialValues={initialValues}
        validationSchema={searchSchema}
        onSubmit={handleSubmit}
      >
        <div className={styles.placesSection}>
          <div className={styles.searchIcon}>
            <SearchIcon />
          </div>
          <AutoCompletePlaces
            name="location"
            placeholder={'Ciudad o punto de referencia'}
            isCompact={isCompact}
            noBorder={!isCompact && !showBorder}
            detectChanges={listenPlaces}
            onDetectChanges={listenerPlaces}
          />
        </div>

        {/* Show horizontal divider on mobile - only for home page (non-compact version) */}
        {!isCompact && <div className={styles.divider}></div>}

        <DatesPanel
          compact={isCompact}
          showTopLabels={showTopLabels}
          clickleable={clickleable}
          startDateBorder={startDateBorder}
          detectChanges={listenDates}
          onDetectChanges={listenerDates}
        />

        <div className={styles.action}>
          {!isCompact && <SubmitButton>Buscar</SubmitButton>}
        </div>
      </Form>
    </div>
  );
}
