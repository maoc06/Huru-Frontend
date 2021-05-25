import * as Yup from 'yup';

const advanceNoticeGroupSchema = Yup.object().shape({
  advance: Yup.object()
    .shape({
      id: Yup.string().required(),
      name: Yup.string().required(),
    })
    .required('Se debe elegir una opción')
    .label('Atenlación'),
});

export default advanceNoticeGroupSchema;
