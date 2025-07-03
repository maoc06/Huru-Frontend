import Link from 'next/link';
import { useEffect, useState } from 'react';

import useApi from '../../../hooks/useApi';
import carReviewApi from '../../../api/VehicleReviewAPI';
import bookingApi from '../../../api/BookingAPI';

import Avatar from '../../elements/Avatar/Avatar';
import SectionTitle from '../../elements/SectionTitle/SectionTitle';
import { FillStartIcon } from '../../elements/Icons/Shared';
import {
  calcYearsOld,
  formatMonthDayYear,
  formatMonthYear,
} from '../../../utils/formatDates';

import styles from './UserProfileBasicInfo.module.scss';

export default function UserProfileBasicInfo({
  birthday,
  userId,
  domain = 'Se unió',
  name,
  profilePicture,
  createdAt,
  editablePicture = false,
  showExtra = true,
  showBirthday = false,
  avatarSize = 'large',
  withTopMargin = false,
  withBottomMargin = false,
  withLink = false,
  href = '/',
  title = 'Anfitrión',
  cursorOnAvatar = false,
  openInNewTab = true,
}) {
  const getCountTrips = useApi(bookingApi.countCompletedTrips);
  const getAllReviews = useApi(carReviewApi.getAllReviewsByUser);

  const [countTrips, setCountTrips] = useState(0);
  const [averageRating, setAverageRating] = useState(1.0);

  const classes = `${styles.container} ${withTopMargin && styles.topMargin} ${
    withBottomMargin && styles.bottomMargin
  }`;

  const handleGetCount = async (userId) => {
    const res = await getCountTrips.request(userId);
    setCountTrips(res.data.count);
  };

  const handleAllReviews = async (userId) => {
    const res = await getAllReviews.request(userId);
    const reviews = res.data.data;

    if (reviews.length > 0) {
      const reducer = (accumulator, currentValue) => {
        return accumulator + currentValue.rating;
      };
      const sum = reviews.reduce(reducer, 0);

      const calc = parseFloat(sum / reviews.length);
      setAverageRating(calc.toFixed(1));
    }
  };

  const LinkProfile = ({ children }) => {
    console.log('href is empty? ', href);
    if (href !== '/' && href !== '') {
      return (
        <Link href={href}>
          <a className={classes} target={openInNewTab ? '_blank' : '_self'}>
            {children}
          </a>
        </Link>
      );
    }

    return <section className={classes}>{children}</section>;
  };

  useEffect(() => {
    if (userId) {
      handleGetCount(userId);
      handleAllReviews(userId);
    }
  }, []);

  return (
    <div className={styles.profileSection}>
      {title && (
        <div className={styles.titleWrapper}>
          <div className={styles.titleSection}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 21V19C20 16.79 18.21 15 16 15H8C5.79 15 4 16.79 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <SectionTitle title={title} />
          </div>
        </div>
      )}

      <LinkProfile>
        <div className={styles.avatarContainer}>
          <Avatar
            clickeable={editablePicture}
            src={profilePicture}
            size="xl"
            userId={userId}
            cursorPointer={cursorOnAvatar}
          />
          {showExtra && averageRating > 0 && (
            <div className={styles.ratingBadge}>
              <FillStartIcon width={14} height={14} />
              <span className={styles.ratingValue}>
                {parseFloat(averageRating).toFixed(1)}
              </span>
            </div>
          )}
        </div>

        <div className={styles.profileInfo}>
          <h3 className={styles.userName}>{name}</h3>
          
          {showBirthday && (
            <p className={styles.birthdayInfo}>{`${calcYearsOld({ birthday })} años (${formatMonthDayYear({
              date: new Date(birthday),
              type: 'JS',
            })})`}</p>
          )}

          <div className={styles.statsContainer}>
            {showExtra && (
              <span className={styles.tripsCount}>
                {countTrips.toLocaleString()} viajes
              </span>
            )}
            <span className={styles.joinDate}>
              {domain} {formatMonthYear(createdAt)}
            </span>
          </div>
        </div>
      </LinkProfile>
    </div>
  );
}
