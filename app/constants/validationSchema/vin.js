import * as Yup from 'yup';

const vinSchema = Yup.object().shape({
  vin: Yup.string()
    .test('len', 'El VIN debe tener exactamente 17 caracteres', (val) => {
      if (val) return val.length === 17;
    })
    .required('El VIN es un campo obligatorio')
    .label('VIN'),
});

export default vinSchema;
