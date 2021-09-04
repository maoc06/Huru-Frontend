import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import useApi from '../../../hooks/useApi';
import favoriteApi from '../../../api/FavoriteAPI';
import bookingApi from '../../../api/BookingAPI';
import carReviewApi from '../../../api/VehicleReviewAPI';
import TransmissionIcon from '../../elements/Icons/TrasmissionIcon';
import GasIcon from '../../elements/Icons/GasIcon';
import ChairIcon from '../../elements/Icons/ChairIcon';

import {
  FavoriteIcon,
  FillStartIcon,
  EcoIcon,
} from '../../elements/Icons/Shared';
import DatesPanel from '../DatesPanel/DatesPanel';

import styles from './CardHorizontal.module.scss';

const DISCOUNT_ECO_FRIENDLY = 0.15;

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
  forceRowDirection = true,
  onRemoveFavorite,
  isEco = false,
  description,
  transmission,
  seats,
  fuel,
}) {
  const addFavorite = useApi(favoriteApi.createFavorite);
  const deleteFavorite = useApi(favoriteApi.removeFavorite);

  const countTrips = useApi(bookingApi.countCompletedTripsByCar);
  const reviews = useApi(carReviewApi.getReviews);

  const [isFavorite, setIsFavorite] = useState(favorite);
  const [countCompletedTrips, setCountTrips] = useState(0);
  const [averageRating, setAverageRating] = useState('1.0');
  const [pricePerDay, setPricePerDay] = useState(price);
  const [isMobileWindow, setIsMobileWindow] = useState(true);

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

      const calc = parseFloat(sum / res.data.data.length);
      setAverageRating(calc.toFixed(1));
    }
  };

  const handleMobileWindow = () => {
    if (window.innerWidth > 720) setIsMobileWindow(false);
    else setIsMobileWindow(true);
  };

  useEffect(() => {
    if (carId) {
      handleCountTrips();
      handleAvg();
    }
    if (isEco) {
      const discount = price * DISCOUNT_ECO_FRIENDLY;
      setPricePerDay(price - discount);
    }
    handleMobileWindow();
    // listen window resize
    window.addEventListener('resize', () => {
      // responsive
      handleMobileWindow();
    });
  }, []);

  return (
    <div
      className={`${styles.card} ${forceRowDirection && styles.limitHeight} ${
        withExtraLabel && styles.extraMargin
      }`}
    >
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
          className={`${styles.inner} ${forceRowDirection && styles.rowDir} ${
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
            <div className={styles.title}>
              <h6>{title}</h6>
              {isEco && <EcoIcon height={24} width={24} />}
            </div>

            {!showPanelDates && showPanelPrice && (
              <>
                <div className={styles.bottom}>
                  <div className={styles.stats}>
                    <FillStartIcon height={16} width={16} />

                    <p className={styles.counts}>
                      {averageRating}{' '}
                      <span>({countCompletedTrips} viajes)</span>
                    </p>
                  </div>

                  {!isMobileWindow && (
                    <p className={styles.description}>{description}</p>
                  )}

                  <div className={styles.extraInfo}>
                    {!isMobileWindow && (
                      <section>
                        <div className={styles.firstFeat}>
                          <TransmissionIcon width={18} height={18} />
                          <p>{transmission}</p>
                        </div>

                        <div className={styles.mid}>
                          <GasIcon width={18} height={18} />
                          <p>{fuel}</p>
                        </div>

                        <div>
                          <ChairIcon width={18} height={18} />
                          <p>{seats} pers.</p>
                        </div>
                      </section>
                    )}

                    <p className={`${styles.price}`}>
                      {`$${Number(pricePerDay).toLocaleString('en')} COP/`}
                      <span>día</span>
                    </p>
                  </div>
                </div>

                {isEco && (
                  <div className={styles.discount}>
                    <span>Dcto. eco-friendly</span>
                    <p className={styles.basePrice}>
                      {`$${Number(price).toLocaleString('en')}`}
                    </p>
                  </div>
                )}
              </>
            )}

            {/* <DatesPanel
              // currRender={showPanelDates}
              paramDates={dates}
              clickleable={false}
            /> */}

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
