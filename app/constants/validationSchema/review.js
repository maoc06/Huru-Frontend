import * as Yup from 'yup';

const reviewSchema = Yup.object().shape({
  rating: Yup.number().min(0).max(5),
  comment: Yup.string()
    .required('El comentario es un campo necesario')
    .min(20, 'El comentario debe tener al menos 20 caracteres')
    .max(
      1000,
      'Waow! este comentario está un poco largo, quizas aburras a alguien. Acortalo y hazlo más atractiva'
    )
    .label('Comentario'),
});

export default reviewSchema;
