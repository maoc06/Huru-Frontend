import * as Yup from 'yup';

const maxTripGroupSchema = Yup.object().shape({
  maxTrip: Yup.object()
    .shape({
      id: Yup.string().required(),
      name: Yup.string().required(),
    })
    .required('Se debe elegir una opción')
    .label('Viaje más largo'),
});

export default maxTripGroupSchema;
