import { formatPrettyFull, diffDays, convertToCompound, formatMonthYear } from '../../../utils/formatDates';
import localeStringPrice from '../../../utils/localeStringPrice';
import Divider from '../../elements/Divider/Divider';
import DatesPanel from '../DatesPanel/DatesPanel';
import Avatar from '../../elements/Avatar/Avatar';
import RatingSimple from '../../elements/Rating/RatingSimple';
import { FillStartIcon } from '../../elements/Icons/Shared';
import { 
  CalendarTodayOutlined, 
  LocationOnOutlined, 
  CreditCardOutlined, 
  PersonOutlined 
} from '@material-ui/icons';
import { useState, useEffect } from 'react';
import useApi from '../../../hooks/useApi';
import carReviewApi from '../../../api/VehicleReviewAPI';
import bookingApi from '../../../api/BookingAPI';
import styles from './BookingDetails.module.scss';

export default function BookingDetails({ booking = {} }) {
  const [countTrips, setCountTrips] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  
  const getCountTrips = useApi(bookingApi.countCompletedTrips);
  const getAllReviews = useApi(carReviewApi.getAllReviewsByUser);

  if (!booking || Object.keys(booking).length === 0) {
    return null;
  }

  const {
    id,
    checkin,
    checkout,
    pricePerDay,
    siteFees = 0,
    bookedCar = {},
    bookedBy = {},
    bookingStatus,
    createdAt,
    bookingDate,
    bookingAddress
  } = booking;

  // Debug logs for booking data
  console.log('🏠 BookingDetails Debug - Location Data:', {
    bookingAddress,
    carCity: bookedCar.city,
    carLocation: bookedCar.location,
    carAddress: bookedCar.address,
    fullCarObject: bookedCar
  });

  console.log('👤 BookingDetails Debug - User Data:', {
    bookedBy,
    userUuid: bookedBy.uuid,
    userName: `${bookedBy.firstName} ${bookedBy.lastName}`,
    userEmail: bookedBy.email,
    userCreatedAt: bookedBy.createdAt,
    profilePhoto: bookedBy.profilePhoto
  });

  console.log('📅 BookingDetails Debug - Booking Dates:', {
    checkin,
    checkout,
    createdAt,
    bookingDate,
    bookingId: id,
    status: bookingStatus,
    fullBookingObject: booking
  });

  const serviceFeePercentage = 0.17;
  
  // Calculate pricing details
  const days = diffDays({
    dateOne: checkin,
    dateTwo: checkout,
    type: 'ISO'
  });
  
  const subtotal = pricePerDay * days;
  const calculatedServiceFee = siteFees || (subtotal * serviceFeePercentage);
  const total = subtotal + calculatedServiceFee;

  // Debug logs for calculated data
  console.log('💰 BookingDetails Debug - Calculated Pricing:', {
    days,
    pricePerDay,
    subtotal,
    calculatedServiceFee,
    total,
    serviceFeePercentage
  });

  // Get booking status text
  const getBookingStatusText = (status) => {
    const statusMap = {
      1: { text: 'Pendiente de aprobación', color: '#F59E0B' },
      5: { text: 'Aprobada', color: '#10B981' },
      6: { text: 'Rechazada', color: '#EF4444' },
      7: { text: 'Cancelada', color: '#6B7280' },
      4: { text: 'Completada', color: '#8B5CF6' }
    };
    return statusMap[status] || { text: 'Desconocido', color: '#6B7280' };
  };

  const statusInfo = getBookingStatusText(bookingStatus);

  // Fetch user rating and trip count
  const handleGetUserData = async (userId) => {
    console.log('🔄 BookingDetails Debug - Fetching user data for userId:', userId);
    
    try {
      // Get completed trips count
      const tripsRes = await getCountTrips.request(userId);
      console.log('✅ BookingDetails Debug - Trips API Response:', tripsRes);
      if (tripsRes && tripsRes.data) {
        setCountTrips(tripsRes.data.count);
      }

      // Get user reviews for rating calculation
      const reviewsRes = await getAllReviews.request(userId);
      console.log('⭐ BookingDetails Debug - Reviews API Response:', reviewsRes);
      if (reviewsRes && reviewsRes.data && reviewsRes.data.data) {
        const reviews = reviewsRes.data.data;
        setReviewCount(reviews.length);
        
        if (reviews.length > 0) {
          const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
          const avgRating = totalRating / reviews.length;
          setAverageRating(parseFloat(avgRating.toFixed(1)));
          console.log('📊 BookingDetails Debug - Calculated Rating:', {
            reviewCount: reviews.length,
            averageRating: avgRating,
            reviews
          });
        }
      }
    } catch (error) {
      console.error('❌ Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (bookedBy && bookedBy.uuid) {
      handleGetUserData(bookedBy.uuid);
    }
  }, [bookedBy]);

  // Convert booking dates to the format expected by DatePanel
  const datesPanelData = convertToCompound({
    dateOne: checkin,
    dateTwo: checkout,
    type: 'ISO'
  });

  console.log('📅 BookingDetails Debug - Date Conversion:', {
    originalCheckin: checkin,
    originalCheckout: checkout,
    convertedDates: datesPanelData
  });

  // Safe date formatting with fallback
  const formatSafeDate = (date) => {
    if (!date) return 'Fecha no disponible';
    try {
      return formatPrettyFull({ date });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Fecha no disponible';
    }
  };

  // Safe member since date formatting
  const formatMemberSince = (date) => {
    if (!date) return 'Fecha no disponible';
    try {
      return formatMonthYear(date);
    } catch (error) {
      console.error('Member since date formatting error:', error);
      return 'Fecha no disponible';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Car Title */}
        <h5 className={styles.carTitle}>
          {bookedCar.maker?.name} {bookedCar.model?.name} {bookedCar.year}
        </h5>

        {/* Status Badge */}
        <div className={styles.statusContainer}>
          <div 
            className={styles.status}
            style={{ backgroundColor: statusInfo.color }}
          >
            {statusInfo.text}
          </div>
        </div>

        {/* Dates Section using DatePanel */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <CalendarTodayOutlined />
            <h3>Fechas del Viaje</h3>
          </div>
          <DatesPanel 
            paramDates={datesPanelData}
            clickleable={false}
            compact={false}
            showTopLabels={true}
          />
        </div>

        <Divider size="medium" />

        {/* Location Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <LocationOnOutlined />
            <h3>Ubicación</h3>
          </div>
          <div className={styles.locationInfo}>
            <span className={styles.value}>
              {bookingAddress || 'Ubicación no especificada'}
            </span>
          </div>
        </div>

        <Divider size="medium" />

        {/* Guest Information */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <PersonOutlined />
            <h3>Información del Solicitante</h3>
          </div>
          <div className={styles.guestInfo}>
            <div className={styles.guestProfileContainer}>
              <Avatar 
                src={bookedBy.profilePhoto} 
                size="large"
                cursorPointer={false}
              />
              <div className={styles.guestDetails}>
                <span className={styles.guestName}>
                  {bookedBy.firstName} {bookedBy.lastName}
                </span>
                <span className={styles.guestEmail}>{bookedBy.email}</span>
                <span className={styles.memberSince}>
                  Miembro desde {formatMemberSince(bookedBy.createdAt)}
                </span>
                
                {/* Rating and Reviews */}
                <div className={styles.guestStats}>
                  <div className={styles.ratingContainer}>
                    {averageRating > 0 ? (
                      <>
                        <RatingSimple value={averageRating} size={16} />
                        <span className={styles.ratingValue}>
                          {averageRating} ({reviewCount} {reviewCount === 1 ? 'reseña' : 'reseñas'})
                        </span>
                      </>
                    ) : (
                      <span className={styles.noRating}>Sin reseñas aún</span>
                    )}
                  </div>
                  <div className={styles.tripCount}>
                    <span>{countTrips} {countTrips === 1 ? 'viaje' : 'viajes'} completados</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider size="medium" />

        {/* Pricing Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <CreditCardOutlined />
            <h3>Detalles del Pago</h3>
          </div>
          <div className={styles.pricingInfo}>
            <div className={styles.priceRow}>
              <span className={styles.priceLabel}>
                ${localeStringPrice(pricePerDay)} x {days} {days === 1 ? 'día' : 'días'}
              </span>
              <span className={styles.priceValue}>
                ${localeStringPrice(subtotal)}
              </span>
            </div>
            <div className={styles.priceRow}>
              <span className={styles.priceLabel}>Tarifa de servicio</span>
              <span className={styles.priceValue}>
                ${localeStringPrice(calculatedServiceFee)}
              </span>
            </div>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalValue}>
                ${localeStringPrice(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Reservation Details */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>Información Adicional</h3>
          </div>
          <div className={styles.additionalInfo}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Solicitud realizada</span>
              <span className={styles.value}>
                {formatSafeDate(bookingDate)}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Vehículo</span>
              <span className={styles.value}>
                {bookedCar.maker?.name} {bookedCar.model?.name} {bookedCar.year}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 