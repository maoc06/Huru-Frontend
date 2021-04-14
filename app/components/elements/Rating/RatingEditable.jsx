import { useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useFormikContext } from 'formik';

import { FillStartIcon, HalfStarIcon, EmptyStarIcon } from '../Icons/Shared';

import styles from './RatingEditable.module.scss';

const color = '#070d9a';
const defaultValue = 2.5;

export default function RatingEditable({ name, size = 18 }) {
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    setFieldValue(name, defaultValue);
  }, []);

  const ratingChanged = (rating) => {
    setFieldValue(name, rating);
  };

  return (
    <div className={styles.rating}>
      <ReactStars
        activeColor={color}
        count={5}
        edit={true}
        onChange={ratingChanged}
        emptyIcon={<EmptyStarIcon width={size} height={size} />}
        halfIcon={<HalfStarIcon width={size} height={size} />}
        filledIcon={<FillStartIcon width={size} height={size} />}
        isHalf={true}
        size={size}
        value={defaultValue}
      />
    </div>
  );
}
