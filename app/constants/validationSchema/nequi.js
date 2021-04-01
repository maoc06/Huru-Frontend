import * as Yup from 'yup';

const nequiSchema = Yup.object().shape({
  phone: Yup.string()
    .required('El número de la cuenta Nequi es requerido')
    .min(11, 'La cuenta Nequi debe tener 10 digitos')
    .label('Número de la cuenta Neqi'),
});

export default nequiSchema;
