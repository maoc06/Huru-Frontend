import { useDispatch } from 'react-redux';

import { setPrice } from '../../../../redux/slices/vehicleRegisterSlice';

import Form from '../../Forms/Form';
import Textfield from '../../../elements/Textfield/Textfield';
import SubmitButton from '../../../elements/Button/SubmitButton';

import setPircePerDaySchema from '../../../../constants/validationSchema/setPricePerDay';

export default function SetPricePerDay({ setStep, next }) {
  const dispatch = useDispatch();

  const initialValues = {
    price: '',
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
      {/* <h3>Precio</h3>

      <article>
        <p>Configura el precio base por día de alquiler de tu carro.</p>
      </article> */}

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
