import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import AppTerms from '../../elements/Terms/Terms';
import Divider from '../../elements/Divider/Divider';
import Form from '../../modules/Forms/Form';
import SubmitButton from '../../elements/Button/SubmitButton';
import ErrorMessage from '../../elements/ErrorMessage/ErrorMessage';
import PaymentDetails from '../../modules/PaymentDetails/PaymentDetails';
import PaymentMethod from '../../modules/PaymentMethods/PaymentMethod';
import DatesPanel from '../../modules/DatesPanel/DatesPanel';
import CarImageGrid from '../../modules/CarImageGrid/CarImageGrid';
import Avatar from '../../elements/Avatar/Avatar';
import RatingSimple from '../../elements/Rating/RatingSimple';
import { 
  LocationOnOutlined, 
  PersonOutlined,
  DriveEtaOutlined,
  LocalGasStationOutlined
} from '@material-ui/icons';

import acceptTermsSchema from '../../../constants/validationSchema/acceptTerms';
import { formatMonthYear } from '../../../utils/formatDates';

import styles from './CarConfirmationTemplate.module.scss';

const DISCOUNT_ECO_FRIENDLY = 0.15;
const SERVICE_FEE_PERCENTAGE = 0.17;

const CarConfirmationTemplate = ({
  uid,
  carId,
  carName = '',
  countDays = 2,
  pricePerDay = 0,
  paymentMethod,
  isEcoCar = false,
  carImages = [],
  carSpecs = {},
  carOwner = {},
  carLocation = '',
  onSubmit,
}) => {
  const dates = useSelector((state) => state.searchParams.dates);
  const initialValues = { checkTerms: false };

  const [discountPerDay, setDiscountPerDay] = useState(pricePerDay);

  const handleSubmit = () => {
    const price = isEcoCar ? discountPerDay : pricePerDay;

    const priceDays = price * countDays;
    const serviceFee = priceDays * SERVICE_FEE_PERCENTAGE;

    const booking = {
      paymentId: paymentMethod.id,
      bookingCar: carId,
      bookingBy: uid,
      checkin: dates.raw.start,
      checkout: dates.raw.end,
      pricePerDay,
      siteFees: serviceFee,
    };

    onSubmit(booking);
  };

  const handlePriceEcoCar = () => {
    const discount = pricePerDay * DISCOUNT_ECO_FRIENDLY;
    setDiscountPerDay(pricePerDay - discount);
  };

  // Safe date formatting for member since
  const formatMemberSince = (date) => {
    if (!date) return 'Nuevo miembro';
    try {
      return formatMonthYear(date);
    } catch (error) {
      return 'Nuevo miembro';
    }
  };

  useEffect(() => {
    handlePriceEcoCar();
  }, []);

  return (
    <div className={styles.container}>
      {/* Desktop Layout */}
      <div className={styles.desktopLayout}>
        {/* Left Column - Car Information */}
        <div className={styles.leftColumn}>
          {/* Car Header */}
          <div className={styles.carHeader}>
            <h2 className={styles.carTitle}>{carName}</h2>
            <p className={styles.carDescription}>
              Estas a un paso de reservar este vehículo. Revisa y confirma la
              información presentada a continuación.
            </p>
            {isEcoCar && (
              <div className={styles.ecoTag}>
                <span>🌿 Vehículo Eco-Friendly</span>
              </div>
            )}
          </div>

          {/* Car Images Grid */}
          <div className={styles.carImageSection}>
            <CarImageGrid 
              images={carImages}
              onViewAllPhotos={(images) => console.log('📸 View all photos clicked:', images.length, 'images')}
            />
          </div>

          {/* Car Owner Section */}
          {carOwner && Object.keys(carOwner).length > 0 && (
            <div className={styles.carOwnerSection}>
              <div className={styles.sectionHeader}>
                <PersonOutlined className={styles.sectionIcon} />
                <h4>Anfitrión</h4>
              </div>
              <div className={styles.ownerInfo}>
                <div className={styles.ownerProfile}>
                  <Avatar 
                    src={carOwner.profilePhoto} 
                    size="large"
                    cursorPointer={false}
                  />
                  <div className={styles.ownerDetails}>
                    <span className={styles.ownerName}>
                      {carOwner.firstName} {carOwner.lastName}
                    </span>
                    <span className={styles.memberSince}>
                      Miembro desde {formatMemberSince(carOwner.createdAt)}
                    </span>
                    
                    {/* Rating and Reviews */}
                    {carOwner.averageRating > 0 && (
                      <div className={styles.ownerRating}>
                        <RatingSimple value={carOwner.averageRating} size={16} />
                        <span className={styles.ratingText}>
                          {carOwner.averageRating} ({carOwner.reviewCount || 0} {carOwner.reviewCount === 1 ? 'reseña' : 'reseñas'})
                        </span>
                      </div>
                    )}
                    
                    {carOwner.tripCount !== undefined && (
                      <div className={styles.tripCount}>
                        <span>{carOwner.tripCount} {carOwner.tripCount === 1 ? 'viaje' : 'viajes'} completados</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Location Section */}
          {carLocation && (
            <div className={styles.locationSection}>
              <div className={styles.sectionHeader}>
                <LocationOnOutlined className={styles.sectionIcon} />
                <h4>Ubicación</h4>
              </div>
              <div className={styles.locationInfo}>
                <span className={styles.locationText}>{carLocation}</span>
              </div>
            </div>
          )}

          {/* Car Features/Specs */}
          {carSpecs && Object.keys(carSpecs).length > 0 && (
            <div className={styles.carSpecs}>
              <div className={styles.sectionHeader}>
                <DriveEtaOutlined className={styles.sectionIcon} />
                <h4>Características del vehículo</h4>
              </div>
              <div className={styles.specsGrid}>
                {carSpecs.transmission && (
                  <div className={styles.specItem}>
                    <DriveEtaOutlined className={styles.specIcon} />
                    <div className={styles.specContent}>
                      <span className={styles.specLabel}>Transmisión</span>
                      <span className={styles.specValue}>
                        {carSpecs.transmission}
                      </span>
                    </div>
                  </div>
                )}
                {carSpecs.fuel && (
                  <div className={styles.specItem}>
                    <LocalGasStationOutlined className={styles.specIcon} />
                    <div className={styles.specContent}>
                      <span className={styles.specLabel}>Combustible</span>
                      <span className={styles.specValue}>{carSpecs.fuel}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Booking Details */}
        <div className={styles.rightColumn}>
          <div className={`${styles.bookingCard} booking-card-sticky`}>
            {/* Reservation Period */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h4>Periodo de reserva</h4>
              </div>
              <DatesPanel clickleable={false} compact={true} />
            </div>

            <Divider size={'mediumTop'} />

            {/* Payment Details */}
            <div className={styles.section}>
              <PaymentDetails
                pricePerDay={pricePerDay}
                numberOfDays={countDays ? countDays : 2}
                serviceFeePercentage={SERVICE_FEE_PERCENTAGE}
                withDiscount={isEcoCar}
                discountPerDay={discountPerDay}
              />
            </div>

            <Divider size={'mediumTop'} />

            {/* Payment Method */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h4>Método de pago</h4>
                <Link href="/profile/payment-methods">
                  <a target="_blank" className={styles.editLink}>Editar</a>
                </Link>
              </div>
              
              {paymentMethod ? (
                <PaymentMethod
                  brand={
                    paymentMethod.type === 'CARD'
                      ? paymentMethod.brand
                      : paymentMethod.type
                  }
                  number={
                    paymentMethod.type === 'CARD'
                      ? paymentMethod.lastFour
                      : paymentMethod.phone
                  }
                  isCompact={true}
                />
              ) : (
                <ErrorMessage
                  message="Aún no tienes un método de pago vinculado."
                  visible={true}
                />
              )}
            </div>

            <Divider size={'mediumTop'} />

            {/* Terms and Submit */}
            <div className={styles.section}>
              <Form
                initialValues={initialValues}
                validationSchema={acceptTermsSchema}
                onSubmit={handleSubmit}
              >
                <AppTerms name="checkTerms" />

                <SubmitButton
                  isDisabled={paymentMethod === undefined}
                  disabledMessage="Debes tener un método de pago seleccionado para confirmar la reserva"
                >
                  Confirmar y pagar
                </SubmitButton>
              </Form>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={styles.mobileLayout}>
        <div className={styles.mobileContent}>
          {/* Car Header */}
          <div className={styles.mobileCarHeader}>
            <h2 className={styles.mobileCarTitle}>{carName}</h2>
            <p className={styles.mobileDescription}>
              Estas a un paso de reservar este vehículo. Revisa y confirma la
              información presentada a continuación.
            </p>
            {isEcoCar && (
              <div className={styles.mobileEcoTag}>
                <span>🌿 Vehículo Eco-Friendly</span>
              </div>
            )}
          </div>

          <Divider size={'mediumTop'} />

          {/* Car Images Grid */}
          <div className={styles.mobileImageSection}>
            <CarImageGrid 
              images={carImages}
              onViewAllPhotos={(images) => console.log('📸 Mobile - View all photos clicked:', images.length, 'images')}
            />
          </div>

          <Divider size={'mediumTop'} />

          {/* Car Owner Section */}
          {carOwner && Object.keys(carOwner).length > 0 && (
            <>
              <div className={styles.mobileSection}>
                <div className={styles.mobileSectionHeader}>
                  <PersonOutlined className={styles.mobileSectionIcon} />
                  <h4>Anfitrión</h4>
                </div>
                <div className={styles.mobileOwnerInfo}>
                  <div className={styles.mobileOwnerProfile}>
                    <Avatar 
                      src={carOwner.profilePhoto} 
                      size="large"
                      cursorPointer={false}
                    />
                    <div className={styles.mobileOwnerDetails}>
                      <span className={styles.mobileOwnerName}>
                        {carOwner.firstName} {carOwner.lastName}
                      </span>
                      <span className={styles.mobileMemberSince}>
                        Miembro desde {formatMemberSince(carOwner.createdAt)}
                      </span>
                      
                      {/* Rating and Reviews */}
                      {carOwner.averageRating > 0 && (
                        <div className={styles.mobileOwnerRating}>
                          <RatingSimple value={carOwner.averageRating} size={16} />
                          <span className={styles.mobileRatingText}>
                            {carOwner.averageRating} ({carOwner.reviewCount || 0} {carOwner.reviewCount === 1 ? 'reseña' : 'reseñas'})
                          </span>
                        </div>
                      )}
                      
                      {carOwner.tripCount !== undefined && (
                        <div className={styles.mobileTripCount}>
                          <span>{carOwner.tripCount} {carOwner.tripCount === 1 ? 'viaje' : 'viajes'} completados</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Divider size={'mediumTop'} />
            </>
          )}

          {/* Location Section */}
          {carLocation && (
            <>
              <div className={styles.mobileSection}>
                <div className={styles.mobileSectionHeader}>
                  <LocationOnOutlined className={styles.mobileSectionIcon} />
                  <h4>Ubicación</h4>
                </div>
                <div className={styles.mobileLocationInfo}>
                  <span className={styles.mobileLocationText}>{carLocation}</span>
                </div>
              </div>

              <Divider size={'mediumTop'} />
            </>
          )}

          {/* Car Features/Specs */}
          {carSpecs && Object.keys(carSpecs).length > 0 && (
            <>
              <div className={styles.mobileSection}>
                <div className={styles.mobileSectionHeader}>
                  <DriveEtaOutlined className={styles.mobileSectionIcon} />
                  <h4>Características del vehículo</h4>
                </div>
                <div className={styles.mobileSpecsGrid}>
                  {carSpecs.transmission && (
                    <div className={styles.mobileSpecItem}>
                      <DriveEtaOutlined className={styles.mobileSpecIcon} />
                      <div className={styles.mobileSpecContent}>
                        <span className={styles.mobileSpecLabel}>Transmisión</span>
                        <span className={styles.mobileSpecValue}>
                          {carSpecs.transmission}
                        </span>
                      </div>
                    </div>
                  )}
                  {carSpecs.fuel && (
                    <div className={styles.mobileSpecItem}>
                      <LocalGasStationOutlined className={styles.mobileSpecIcon} />
                      <div className={styles.mobileSpecContent}>
                        <span className={styles.mobileSpecLabel}>Combustible</span>
                        <span className={styles.mobileSpecValue}>{carSpecs.fuel}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Divider size={'mediumTop'} />
            </>
          )}

          {/* Booking Details Section */}

          <div className={styles.title_edit}>
            <h5>Periodo de reserva</h5>
          </div>

          <DatesPanel clickleable={false} compact={true} />

          <Divider size={'mediumTop'} />

          <PaymentDetails
            pricePerDay={pricePerDay}
            numberOfDays={countDays ? countDays : 2}
            serviceFeePercentage={SERVICE_FEE_PERCENTAGE}
            withDiscount={isEcoCar}
            discountPerDay={discountPerDay}
          />

          <Divider size={'mediumTop'} />

          <div className={styles.title_edit}>
            <h5>Método de pago</h5>
            <Link href="/profile/payment-methods">
              <a target="_blank">Editar</a>
            </Link>
          </div>
          
          {paymentMethod ? (
            <PaymentMethod
              brand={
                paymentMethod.type === 'CARD'
                  ? paymentMethod.brand
                  : paymentMethod.type
              }
              number={
                paymentMethod.type === 'CARD'
                  ? paymentMethod.lastFour
                  : paymentMethod.phone
              }
              isCompact={true}
            />
          ) : (
            <ErrorMessage
              message="Aún no tienes un método de pago vinculado."
              visible={true}
            />
          )}

          <Form
            initialValues={initialValues}
            validationSchema={acceptTermsSchema}
            onSubmit={handleSubmit}
          >
            <AppTerms name="checkTerms" />

            <SubmitButton
              isDisabled={paymentMethod === undefined}
              disabledMessage="Debes tener un método de pago seleccionado para confirmar la reserva"
            >
              Confirmar y pagar
            </SubmitButton>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CarConfirmationTemplate;
