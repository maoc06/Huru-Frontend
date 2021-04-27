import * as Yup from 'yup';

const aboutUserSchema = Yup.object().shape({
  biography: Yup.string()
    .min(50)
    .required('La biografía es un campo obligatorio')
    .label('Biografía'),
});

export default aboutUserSchema;
