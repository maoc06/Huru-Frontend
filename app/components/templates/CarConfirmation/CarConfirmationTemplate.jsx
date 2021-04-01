import Link from 'next/link';

import AppTerms from '../../elements/Terms/Terms';
import Divider from '../../elements/Divider/Divider';
import Form from '../../modules/Forms/Form';
import SubmitButton from '../../elements/Button/SubmitButton';
import PaymentDetails from '../../modules/PaymentDetails/PaymentDetails';
import PaymentMethod from '../../modules/PaymentMethods/PaymentMethod';
import SearchForm from '../../modules/SearchForm/SearchForm';

import acceptTermsSchema from '../../../constants/validationSchema/acceptTerms';

import styles from './CarConfirmationTemplate.module.scss';

const CarConfirmationTemplate = ({
  uid,
  carId,
  carName = '',
  pricePerDay = 0,
  paymentId,
  brand,
  number,
  onSubmit,
}) => {
  const initialValues = { checkTerms: false };
  const serviceFeePercentage = 0.17;

  const handleSubmit = () => {
    const priceDays = pricePerDay * 2;
    const serviceFee = priceDays * serviceFeePercentage;

    const booking = {
      paymentId,
      bookingCar: carId,
      bookingBy: uid,
      checkin: '2021-04-01 14:00:00',
      checkout: '2021-04-03 16:00:00',
      pricePerDay,
      siteFees: serviceFee,
      amountPaid: priceDays + serviceFee,
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
      <SearchForm
        isCompact={true}
        showInputPlaces={false}
        withMarginBottom={false}
        clickleable={false}
      />

      <Divider size={'mediumTop'} />

      <PaymentDetails
        pricePerDay={pricePerDay}
        serviceFeePercentage={serviceFeePercentage}
      />

      <Divider size={'mediumTop'} />

      <div className={styles.title_edit}>
        <h5>Metodo de pago</h5>
        <Link href="/profile/payment-methods">
          <a>Editar</a>
        </Link>
      </div>
      <PaymentMethod brand={brand} number={number} isCompact={true} />

      <Form
        initialValues={initialValues}
        validationSchema={acceptTermsSchema}
        onSubmit={handleSubmit}
      >
        <AppTerms name="checkTerms" />

        <SubmitButton>Confirmar y pagar</SubmitButton>
      </Form>
    </>
  );
};

export default CarConfirmationTemplate;
