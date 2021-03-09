import * as Yup from 'yup';

import { phoneRegExp } from '../regex';

const userPhoneSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(phoneRegExp, 'El número de teléfono no es valido')
    .required('El teléfono es un campo obligatorio')
    .label('Teléfono'),
});

export default userPhoneSchema;
