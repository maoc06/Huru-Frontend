import * as Yup from 'yup';

const citySchema = Yup.object().shape({
  city: Yup.object()
    .shape({ cityId: Yup.number().required(), name: Yup.string().required() })
    .required('La ciudad es requerida')
    .label('Ciudad'),
});

export default citySchema;
