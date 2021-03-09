import * as Yup from 'yup';

const vehicleDescriptionSchema = Yup.object().shape({
  description: Yup.string()
    .required('La descripción es un campo obligatorio')
    .min(50)
    .max(1000)
    .label('Descripción'),
});

export default vehicleDescriptionSchema;
