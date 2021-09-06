import * as Yup from 'yup';

const setPircePerDaySchema = Yup.object().shape({
  price: Yup.string('El precio deben ser digitos')
    .required('El precio por día es un campo obligatorio')
    .test('min', 'El precio minimo son COP $50.000', (val) => {
      if (val) {
        val = val.replace(/[\D\s\._\-]+/g, '');
        val = val ? parseInt(val, 10) : 0;
        return 50000 < val;
      }
    })
    .test('max', 'El precio maximo son COP $1.000.000', (val) => {
      if (val) {
        val = val.replace(/[\D\s\._\-]+/g, '');
        val = val ? parseInt(val, 10) : 0;
        return 1000000 > val;
      }
    })
    .label('Precio'),
});

export default setPircePerDaySchema;
