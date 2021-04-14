import { useRouter } from 'next/router';

import useApi from '../../../hooks/useApi';
import vehicleReviewApi from '../../../api/VehicleReviewAPI';

import Form from '../Forms/Form';
import SubmitButton from '../../elements/Button/SubmitButton';
import TextArea from '../../elements/TextArea/TextArea';
import RatingEditable from '../../elements/Rating/RatingEditable';
import ActivityIndicator from '../../elements/ActivityIndicator/ActivityIndicator';

import reviewSchema from '../../../constants/validationSchema/review';

import styles from './PostReview.module.scss';

export default function PostReview({ ownerName, carId, uid, bookingId }) {
  const router = useRouter();
  const initialValues = { rating: '', comment: '' };

  const createReview = useApi(vehicleReviewApi.insert);

  const handleSubmit = async ({ comment, rating }) => {
    const review = { carId, addedBy: uid, bookingId, comment, rating };
    await createReview.request(review);

    if (createReview.error) {
      console.log('ERRRRooooooRRR');
    } else {
      router.reload();
    }
  };

  return (
    <>
      <ActivityIndicator visible={createReview.loading} />

      <main className={styles.container}>
        <h6 className={styles.title}>Cuentanos tu opinión</h6>
        <p className={styles.subtitle}>
          Valora tu viaje en el carro de {ownerName}:
        </p>

        <Form
          initialValues={initialValues}
          validationSchema={reviewSchema}
          onSubmit={handleSubmit}
        >
          <RatingEditable name="rating" size={32} />

          <TextArea
            name="comment"
            placeholder={`Cuéntale al mundo como fue conducir el vehículo de ${ownerName}`}
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
