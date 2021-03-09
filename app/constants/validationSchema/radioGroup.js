import * as Yup from 'yup';

const radioGroupSchema = Yup.object().shape({
  radioGroup: Yup.object()
    .shape({
      id: Yup.string().required(),
      name: Yup.string().required(),
    })
    .required('Se debe elegir una opción')
    .label('Optiones'),
});

export default radioGroupSchema;
