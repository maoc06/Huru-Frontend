import { useRouter } from 'next/router';

import useApi from '../../../hooks/useApi';
import vehicleReviewApi from '../../../api/VehicleReviewAPI';
import userApi from '../../../api/UserAPI';

import Form from '../Forms/Form';
import SubmitButton from '../../elements/Button/SubmitButton';
import TextArea from '../../elements/TextArea/TextArea';
import RatingEditable from '../../elements/Rating/RatingEditable';
import ActivityIndicator from '../../elements/ActivityIndicator/ActivityIndicator';

import reviewSchema from '../../../constants/validationSchema/review';

import styles from './PostReview.module.scss';

export default function PostReview({
  bookedBy,
  bookingId,
  carId,
  isForCar = true,
  ownerName,
  reviewBy,
}) {
  const router = useRouter();
  const initialValues = { rating: '', comment: '' };

  const createCarReview = useApi(vehicleReviewApi.insert);
  const createUserReview = useApi(userApi.createUserReview);

  const handleSubmit = async (review) => {
    isForCar ? submitCarReview(review) : submitUserReview(review);
  };

  const submitCarReview = async (review) => {
    await createCarReview.request({
      ...review,
      addedBy: reviewBy,
      bookingId,
      carId,
    });

    if (createCarReview.error) {
      console.error('Error trying to post a car review');
    } else {
      router.reload();
    }
  };

  const submitUserReview = async (review) => {
    await createUserReview.request({
      ...review,
      addedBy: reviewBy,
      bookingId,
      userId: bookedBy,
    });

    if (createUserReview.error) {
      console.error('Error trying to post a user review');
    } else {
      router.reload();
    }
  };

  return (
    <>
      <ActivityIndicator
        visible={createCarReview.loading || createUserReview.loading}
      />

      <main className={styles.container}>
        <h6 className={styles.title}>Cuentanos tu opinión</h6>
        <p className={styles.subtitle}>
          {isForCar
            ? `Valora tu viaje en el carro de ${ownerName}:`
            : `Valora tu experiencia con ${ownerName} como invitado`}
        </p>

        <Form
          initialValues={initialValues}
          validationSchema={reviewSchema}
          onSubmit={handleSubmit}
        >
          <RatingEditable name="rating" size={32} />

          <TextArea
            name="comment"
            placeholder={
              isForCar
                ? `Cuéntale al mundo como fue conducir el vehículo de ${ownerName}`
                : `Cuéntale a otros dueños de carros como fue tener a ${ownerName} de invitado en autómovil`
            }
            maxLength={1000}
            marginToButton={true}
            rowsMin={5}
          />

          <SubmitButton invert={true}>Compatir reseña</SubmitButton>
        </Form>
      </main>
    </>
  );
}
