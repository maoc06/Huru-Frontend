import * as Yup from 'yup';

const updatePasswordSchema = Yup.object().shape({
  currPassword: Yup.string()
    .required('La contraseña es un campo obligatorio')
    .min(6, 'La contraseña debe tener minimo 6 caracteres')
    .label('Contraseña actual'),
  newPassword: Yup.string()
    .when('currPassword', (currPassword, field) =>
      currPassword ? field.required() : field
    )
    .required('La nueva contraseña es un campo obligatorio')
    .min(6, 'La nueva contraseña debe tener minimo 6 caracteres')
    .label('Contraseña nueva'),
  confirmNewPassword: Yup.string()
    .when('newPassword', (newPassword, schema) => {
      return schema.test({
        test: (confirmNewPassword) => newPassword === confirmNewPassword,
        message: 'Este campo deben de coincidir con: Contraseña nueva',
      });
    })
    .required('La confirmación de la nueva contraseña es un campo obligatorio')
    .min(
      6,
      'La confirmación de la nueva contraseña debe tener minimo 6 caracteres'
    )
    .label('Confirmación contraseña nueva'),
});

export default updatePasswordSchema;
