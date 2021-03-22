import * as Yup from 'yup';

const searchSchema = Yup.object().shape({
  location: Yup.object()
    .required('La ciudad es un campo requerido')
    .label('Ciudad'),
});

export default searchSchema;
