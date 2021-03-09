import * as Yup from 'yup';

const setPircePerDaySchema = Yup.object().shape({
  price: Yup.number('El precio deben ser digitos')
    .min(50000, 'El precio minimo son $50,000 COP')
    .required('El precio por día es un campo obligatorio')
    .label('Precio'),
});

export default setPircePerDaySchema;
