import Link from 'next/link';
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

const CarConfirmationTemplate = ({
  uid,
  carId,
  carName = '',
  countDays = 2,
  pricePerDay = 0,
  paymentMethod,
  onSubmit,
}) => {
  const dates = useSelector((state) => state.searchParams.dates);
  const initialValues = { checkTerms: false };
  const serviceFeePercentage = 0.17;

  const handleSubmit = () => {
    const priceDays = pricePerDay * countDays;
    const serviceFee = priceDays * serviceFeePercentage;

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

  return (
    <>
      <p className={styles.description}>
        Estas a un paso de reservar el {carName}. Revisa y confirma la
        información presentada a continuación.
      </p>

      <Divider size={'mediumTop'} />

      <div className={styles.title_edit}>
        <h5>Periodo de reserva</h5>
        <Link href="">
          <a>Editar</a>
        </Link>
      </div>

      <DatesPanel clickleable={false} compact={true} />

      <Divider size={'mediumTop'} />

      <PaymentDetails
        pricePerDay={pricePerDay}
        numberOfDays={countDays ? countDays : 2}
        serviceFeePercentage={serviceFeePercentage}
      />

      <Divider size={'mediumTop'} />

      <div className={styles.title_edit}>
        <h5>Metodo de pago</h5>
        <Link href="/profile/payment-methods">
          <a>Editar</a>
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
    </>
  );
};

export default CarConfirmationTemplate;
