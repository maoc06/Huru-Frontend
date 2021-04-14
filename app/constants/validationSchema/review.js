import * as Yup from 'yup';

const reviewSchema = Yup.object().shape({
  rating: Yup.number().min(0).max(5),
  comment: Yup.string()
    .required('El comentario es un campo necesario')
    .min(20)
    .max(1000)
    .label('Comentario'),
});

export default reviewSchema;
