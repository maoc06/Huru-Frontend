import * as Yup from 'yup';

const vechicleSchema = Yup.object().shape({
  vin: Yup.string()
    .test('len', 'El VIN debe tener exactamente 17 caracteres', (val) => {
      if (val) return val.length === 17;
    })
    .required('El VIN es un campo obligatorio')
    .label('VIN'),
  maker: Yup.object()
    .shape({ makerId: Yup.string().required(), name: Yup.string().required() })
    .required('El fabricante del vehículo es requerido')
    .label('Fabricante'),
  model: Yup.object()
    .shape({
      modelId: Yup.string().required(),
      makerId: Yup.string().required(),
      name: Yup.string().required(),
      // categoryId: Yup.string().required(),
      transmissionId: Yup.string().required(),
    })
    .required('El modelo del vehículo es requerido')
    .label('Modelo'),
  year: Yup.object()
    .shape({ id: Yup.string().required(), year: Yup.string().required() })
    .required('El año del vehículo es requerido')
    .label('Año'),
  transmission: Yup.object()
    .shape({
      transmissionId: Yup.string().required(),
      name: Yup.string().required(),
    })
    .required('El tipo de transmisión del vehículo es requerido')
    .label('Transmisión'),
  odometer: Yup.object()
    .shape({
      odometerRangeId: Yup.string().required(),
      range: Yup.string().required(),
    })
    .required('El rango del kilometraje actual del vehículo es requerido')
    .label('Kilometraje'),
});

export default vechicleSchema;
