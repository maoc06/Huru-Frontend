import ReactStars from 'react-rating-stars-component';

import { FillStartIcon, HalfStarIcon, EmptyStarIcon } from '../Icons/Shared';

const color = '#070d9a';

export default function RatingSimple({ size = 18, value = 2.5 }) {
  return (
    <ReactStars
      activeColor={color}
      count={5}
      edit={false}
      emptyIcon={<EmptyStarIcon width={size} height={size} />}
      halfIcon={<HalfStarIcon width={size} height={size} />}
      filledIcon={<FillStartIcon width={size} height={size} />}
      isHalf={true}
      size={size}
      value={value}
    />
  );
}
