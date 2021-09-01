import * as Yup from 'yup';

const vehicleDescriptionSchema = Yup.object().shape({
  description: Yup.string()
    .required('La descripción es un campo obligatorio')
    .min(
      50,
      'La descripcion de tu vehículo debe tener al menos 50 caracteres para hacerla atractiva'
    )
    .max(
      1000,
      'Waow! está descripción está un poco larga, quizas aburras a alguien. Acortala y hazla más atractiva'
    )
    .label('Descripción'),
});

export default vehicleDescriptionSchema;
