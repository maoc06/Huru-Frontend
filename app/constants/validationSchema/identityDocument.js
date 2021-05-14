import * as Yup from 'yup';

const identityDocumentSchema = Yup.object().shape({
  indentityDocument: Yup.number()
    .test(
      'len',
      'El documento de identidad debe tener al menos 8 digitos',
      (val) => {
        if (val) return val.toString().length >= 8;
      }
    )
    .test(
      'len',
      'El documento de identidad no puede tener más de 10 digitos',
      (val) => {
        if (val) return val.toString().length <= 10;
      }
    )
    .typeError('Solo puedes ingresar digitos')
    .required('El número del documento de identidad es obligatorio')
    .label('Documento de identidad'),
});

export default identityDocumentSchema;
