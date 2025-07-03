import { useDispatch, useSelector } from 'react-redux';

import { setPrice } from '../../../../redux/slices/vehicleRegisterSlice';

import Form from '../../Forms/Form';
import Textfield from '../../../elements/Textfield/Textfield';
import SubmitButton from '../../../elements/Button/SubmitButton';

import setPircePerDaySchema from '../../../../constants/validationSchema/setPricePerDay';

export default function SetPricePerDay({ setStep, next }) {
  const dispatch = useDispatch();
  
  // Get current price from Redux state
  const currentPrice = useSelector((state) => state.vehicleRegister.price);

  const initialValues = {
    price: currentPrice ? currentPrice.toString() : '',
  };

  const handleSubmit = (param) => {
    let { price } = param;
    price = price.replace(/[\D\s\._\-]+/g, '');
    price = price ? parseInt(price, 10) : 0;
    dispatch(setPrice(price));
    setStep(next);
  };

  return (
    <div>
      <Form
        initialValues={initialValues}
        validationSchema={setPircePerDaySchema}
        onSubmit={handleSubmit}
      >
        <Textfield
          name="price"
          placeholder="¿Cúal sera el precio por día de tu carro?"
          label="Precio base"
          type="tel"
          isTypePrice={true}
          step="any"
        />

        <SubmitButton>Continuar</SubmitButton>
      </Form>
    </div>
  );
}
