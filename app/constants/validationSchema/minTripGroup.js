import * as Yup from 'yup';

const minTripGroupSchema = Yup.object().shape({
  minTrip: Yup.object()
    .shape({
      id: Yup.string().required(),
      name: Yup.string().required(),
    })
    .required('Se debe elegir una opción')
    .label('Viaje más corto'),
});

export default minTripGroupSchema;
