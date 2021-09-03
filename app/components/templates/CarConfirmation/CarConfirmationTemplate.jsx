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

import acceptTermsSchema from '../../../constants/validationSchema/acceptTerms';

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

  useEffect(() => {
    handlePriceEcoCar();
  }, []);

  return (
    <div className={styles.container}>
      <p>
        Estas a un paso de reservar el{' '}
        <span className={styles.car}>{carName}</span>. Revisa y confirma la
        información presentada a continuación.
      </p>

      <Divider size={'mediumTop'} />

      <div className={styles.title_edit}>
        <h5>Periodo de reserva</h5>
        {/* <Link href="">
          <a>Editar</a>
        </Link> */}
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
        <h5>Metodo de pago</h5>
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
          message="Aún no tienes un metodo de pago vinculado."
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
          disabledMessage="Debes tener un metodo de pago seleccionado para confirmar la reserva"
        >
          Confirmar y pagar
        </SubmitButton>
      </Form>
    </div>
  );
};

export default CarConfirmationTemplate;
