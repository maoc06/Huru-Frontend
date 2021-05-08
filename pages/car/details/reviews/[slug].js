import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useApi from '../../../../app/hooks/useApi';
import carReviewApi from '../../../../app/api/VehicleReviewAPI';

import AppLayout from '../../../../app/components/layouts/AppLayout/AppLayout';
import ActivityIndicator from '../../../../app/components/elements/ActivityIndicator/ActivityIndicator';
import CardReview from '../../../../app/components/modules/CardReview/CardReview';
import TitlePage from '../../../../app/components/elements/TitlePage/TitlePage';

function AllCarReviews() {
  const router = useRouter();
  const { slug } = router.query;

  const getReviews = useApi(carReviewApi.getReviews);
  const [reviews, setReviews] = useState([]);

  const handleGetCarReviews = async (carId) => {
    const resReviews = await getReviews.request(carId);
    setReviews(resReviews.data.data);
  };

  useEffect(() => {
    if (slug) handleGetCarReviews(slug);
  }, [slug]);

  return (
    <div>
      <Head>
        <title>Huru | Reseñas del vehículo</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ActivityIndicator visible={getReviews.loading} />

      <AppLayout withImage={false}>
        <TitlePage>Reseñas</TitlePage>

        {reviews.constructor === Array &&
          reviews.length > 0 &&
          reviews.map(
            ({
              id,
              createdAt,
              comment,
              rating,
              reviewBy: { firstName, lastName, profilePhoto },
            }) => {
              return (
                <CardReview
                  key={id}
                  username={`${firstName} ${lastName}`}
                  photoUrl={profilePhoto}
                  publishedAt={createdAt}
                  rating={rating}
                  review={comment}
                  isFull={true}
                />
              );
            }
          )}
      </AppLayout>
    </div>
  );
}

export default AllCarReviews;
