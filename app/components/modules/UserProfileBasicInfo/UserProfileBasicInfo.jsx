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
  domain = 'Se unio',
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
  title,
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
    <>
      {title && <SectionTitle title={title} />}

      <LinkProfile>
        <Avatar
          clickeable={editablePicture}
          src={profilePicture}
          size={avatarSize}
          userId={userId}
          cursorPointer={cursorOnAvatar}
        />

        <div className={styles.info}>
          <p className={styles.name}>{name}</p>

          {showBirthday && (
            <p>{`${calcYearsOld({ birthday })} años (${formatMonthDayYear({
              date: new Date(birthday),
              type: 'JS',
            })})`}</p>
          )}

          <p>{`${domain} ${formatMonthYear(createdAt)}`}</p>

          {showExtra && (
            <div className={styles.extra}>
              <p>{countTrips} viajes</p>

              <p className={styles.average}>
                Promedio de
                <span>
                  <FillStartIcon width={15} height={15} />
                </span>
                {parseFloat(averageRating).toFixed(1)}
              </p>
            </div>
          )}
        </div>
      </LinkProfile>
    </>
  );
}
