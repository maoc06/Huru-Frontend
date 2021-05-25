import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import useApi from '../../../hooks/useApi';
import favoriteApi from '../../../api/FavoriteAPI';
import bookingApi from '../../../api/BookingAPI';
import carReviewApi from '../../../api/VehicleReviewAPI';

import { FavoriteIcon, FillStartIcon } from '../../elements/Icons/Shared';
import DatesPanel from '../DatesPanel/DatesPanel';

import styles from './CardHorizontal.module.scss';

export default function CardHorizontal({
  dates,
  carId,
  userId,
  title,
  price,
  imageSrc = '/images/default-car.png',
  showPanelDates = false,
  showPanelPrice = true,
  showFavoriteIcon = true,
  withOpacity = false,
  withExtraLabel = false,
  extraLabelText = '',
  extraLabelColor = 'blue',
  href = '/',
  favorite = false,
  onRemoveFavorite,
}) {
  const addFavorite = useApi(favoriteApi.createFavorite);
  const deleteFavorite = useApi(favoriteApi.removeFavorite);

  const countTrips = useApi(bookingApi.countCompletedTripsByCar);
  const reviews = useApi(carReviewApi.getReviews);

  const [isFavorite, setIsFavorite] = useState(favorite);
  const [countCompletedTrips, setCountTrips] = useState(0);
  const [averageRating, setAverageRating] = useState('1.0');

  const handleAddToFavorite = () => {
    setIsFavorite(true);
    addFavorite.request({
      addedBy: userId,
      carId,
    });
  };

  const handleRemoveFavorite = () => {
    setIsFavorite(false);
    deleteFavorite.request({
      addedBy: userId,
      carId,
    });

    if (typeof onRemoveFavorite === 'function') {
      onRemoveFavorite(carId);
    }
  };

  const handleCountTrips = async () => {
    const res = await countTrips.request(carId);
    setCountTrips(res.data.count);
  };

  const handleAvg = async () => {
    const res = await reviews.request(carId);

    if (res.data && res.data.data && res.data.data.length > 0) {
      const reducer = (accumulator, currentValue) => {
        return accumulator + currentValue.rating;
      };
      const sum = res.data.data.reduce(reducer, 0);

      setAverageRating((sum / res.data.data.length).toFixed(1));
    }
  };

  useEffect(() => {
    if (carId) {
      handleCountTrips();
      handleAvg();
    }
  }, []);

  return (
    <div className={`${styles.card} ${withExtraLabel && styles.extraMargin}`}>
      {showFavoriteIcon && userId && (
        <div
          className={styles.fav}
          onClick={isFavorite ? handleRemoveFavorite : handleAddToFavorite}
        >
          <FavoriteIcon
            flat={false}
            width={50}
            height={50}
            borderColor={'#fff'}
            fillColor={isFavorite ? '#ff3333' : '#333'}
            fillOpacity={isFavorite ? 1.0 : 0.25}
          />
        </div>
      )}

      <Link href={href}>
        <a
          target="_blank"
          className={`${styles.inner} ${
            withExtraLabel && styles.extraSpacing
          } ${extraLabelColor === 'red' && styles.labelBorderRed} ${
            extraLabelColor === 'green' && styles.labelBorderGreen
          } ${extraLabelColor === 'yellow' && styles.labelBorderYellow}`}
        >
          {withOpacity && <div className={styles.overlay}></div>}

          <div className={styles.image}>
            <Image
              src={imageSrc}
              alt={imageSrc}
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className={styles.info}>
            <h6>{title}</h6>

            {!showPanelDates && showPanelPrice && (
              <div className={styles.bottom}>
                <div className={styles.stats}>
                  <FillStartIcon height={16} width={16} />

                  <p className={styles.counts}>
                    {averageRating} <span>({countCompletedTrips} viajes)</span>
                  </p>
                </div>

                <p className={styles.price}>
                  {`$${Number(price).toLocaleString('en')} COP/`}
                  <span>día</span>
                </p>
              </div>
            )}

            {showPanelDates && (
              <DatesPanel paramDates={dates} clickleable={false} />
            )}
          </div>
        </a>
      </Link>

      {withExtraLabel && (
        <div
          className={`${styles.extraLabel} ${
            extraLabelColor === 'red' && styles.labelBackgroundRed
          } ${extraLabelColor === 'green' && styles.labelBackgroundGreen} ${
            extraLabelColor === 'yellow' && styles.labelBackgroundYellow
          }`}
        >
          <p>{extraLabelText}</p>
        </div>
      )}
    </div>
  );
}
