import * as Yup from 'yup';

const fuelchema = Yup.object().shape({
  fuelType: Yup.object()
    .shape({ fuelId: Yup.number().required(), name: Yup.string().required() })
    .required('El tipo de combustible es requerido')
    .label('Combustible'),
});

export default fuelchema;
