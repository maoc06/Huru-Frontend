import * as Yup from 'yup';

const credentialsSchema = Yup.object().shape({
  email: Yup.string()
    .required('El email es un campo obligatorio')
    .email('El formato de email no es valido')
    .label('Email'),
  password: Yup.string()
    .required('La contraseña es un campo obligatorio')
    .min(6, 'La contraseña debe tener minimo 6 caracteres')
    .label('Contraseña'),
});

export default credentialsSchema;
