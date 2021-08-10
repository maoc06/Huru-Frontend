import * as Yup from 'yup';

import { licensePlateRegExp } from '../regex';

const licensePlateSchema = Yup.object().shape({
  licensePlate: Yup.string()
    .test('len', 'La matrícula debe tener exactamente 6 caracteres', (val) => {
      if (val) return val.length === 7;
    })
    .matches(
      licensePlateRegExp,
      'La matrícula debe tener 3 letras seguidas de 3 números'
    )
    .required('La matrícula es un campo obligatorio')
    .label('Matrícula'),
  location: Yup.object()
    .shape({
      id: Yup.string().required(),
      municipality: Yup.string().required(),
    })
    .required('El municipio es un campo obligatorio')
    .label('municipio'),
});

export default licensePlateSchema;
