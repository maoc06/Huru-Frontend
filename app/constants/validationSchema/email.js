import * as Yup from 'yup';

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .required('El email es un campo obligatorio')
    .email('El formato de email no es valido')
    .label('Email'),
});

export default emailSchema;
