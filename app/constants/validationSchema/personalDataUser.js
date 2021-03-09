import * as Yup from 'yup';

const personalDataUserSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es un campo obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede tener más de 100 caracteres')
    .label('Nombre'),
  lastname: Yup.string()
    .required('El apellido es un campo obligatorio')
    .min(2, 'El apellido debet tener al menos 2 caracteres')
    .max(100, 'El apellido no puede tener más de 100 caracteres')
    .label('Apellido'),
  birth: Yup.string()
    .required('La fecha de nacimiento es obligatoria')
    .label('Fecha de nacimineto'),
  cc: Yup.number()
    .test('len', 'La C.C. debe tener al menos 8 digitos', (val) => {
      if (val) return val.toString().length >= 8;
    })
    .test('len', 'La C.C. no puede tener más de 10 digitos', (val) => {
      if (val) return val.toString().length <= 10;
    })
    .typeError('Solo puedes ingresar digitos')
    .required('El número de la C.C. es obligatorio')
    .label('C.C.'),
});

export default personalDataUserSchema;
