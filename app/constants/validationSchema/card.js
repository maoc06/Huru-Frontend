import * as Yup from 'yup';

const cardSchema = Yup.object().shape({
  cardHolder: Yup.string()
    .required('El titular es un campo obligatorio')
    .min(2, 'Debe tener al menos 2 caracteres')
    .max(255, 'No puede superar los 255 caracteres')
    .label('Titular'),
  number: Yup.number()
    .required('El número de la tarjeta es requerido')
    .test(
      'len',
      'El número de la tarjeta debe tener entre 13 y 16 digitos',
      (val) => {
        if (val)
          return val.toString().length >= 16 && val.toString().length <= 19;
      }
    )
    .label('Número de la tarjeta'),
  expiry: Yup.string()
    .required('La fecha de expiración es requerida')
    .label('Fecha de expiración'),
  cvc: Yup.number()
    .test(
      'len',
      'El CVV de la tarjeta debe tener entre 3 y 4 digitos',
      (val) => {
        if (val)
          return val.toString().length >= 3 && val.toString().length <= 4;
      }
    )
    .required('El CVV de la tarjeta es requerido')
    .label('CVV'),
});

export default cardSchema;
