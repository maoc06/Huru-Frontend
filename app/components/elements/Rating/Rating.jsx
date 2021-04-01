import ReactStars from 'react-rating-stars-component';

export default function Rating({ isControlled = false }) {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  if (isControlled) {
    return <p>controlled</p>;
  }

  return (
    <ReactStars
      count={5}
      isHalf={true}
      value={3.5}
      size={24}
      edit={false}
      activeColor="#070d9a"
    />
  );
}
