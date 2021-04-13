import { useRouter } from 'next/router';

import Form from '../Forms/Form';
import DatesPanel from '../DatesPanel/DatesPanel';
import AutoCompletePlaces from '../../elements/AutoCompletePlaces/AutoCompletePlaces';
import SubmitButton from '../../elements/Button/SubmitButton';

import searchSchema from '../../../constants/validationSchema/search';

import styles from './SearchForm.module.scss';

export default function SearchForm({
  clickleable = true,
  isCompact = false,
  showBorder = false,
  showTopLabels = true,
  withMarginBottom = true,
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
        <AutoCompletePlaces
          name="location"
          placeholder={'Ciudad o punto de referencia'}
          isCompact={isCompact}
        />

        <DatesPanel
          compact={isCompact}
          showTopLabels={showTopLabels}
          clickleable={clickleable}
        />

        {!isCompact && <SubmitButton>Buscar</SubmitButton>}
      </Form>
    </div>
  );
}
