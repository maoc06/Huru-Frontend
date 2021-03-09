import * as Yup from 'yup';

const acceptTermsSchema = Yup.object().shape({
  checkTerms: Yup.boolean()
    .required('Los terminos y políticas deben de ser aceptados.')
    .oneOf([true], 'Los terminos y políticas deben de ser aceptados.')
    .label('Terminos'),
});

export default acceptTermsSchema;
