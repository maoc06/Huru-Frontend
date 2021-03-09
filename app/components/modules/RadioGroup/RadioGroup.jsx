import { useEffect } from 'react';
import { useState } from 'react';
import { useFormikContext } from 'formik';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';

import RadioButton from '../../elements/RadioButton/RadioButton';

export default function AppRadioGroup({ name, list, defaultSelected }) {
  const keys = Object.keys(list[0]);
  const propKey = keys[0];
  const propName = keys[1];

  const [value, setValue] = useState(defaultSelected);
  const { setFieldValue, touched, errors } = useFormikContext();

  const getObjectByPropName = (item) => {
    return list.find((obj) => {
      return obj[propName] === item;
    });
  };

  useEffect(() => {
    setFieldValue(name, list[0]);
  }, []);

  const handleChange = (event) => {
    const selectedItem = event.target.value;
    setValue(selectedItem);
    setFieldValue(name, getObjectByPropName(selectedItem));
  };

  return (
    <>
      <FormControl component="fieldset">
        <RadioGroup name={name} value={value} onChange={handleChange}>
          {list.map((item) => {
            return (
              <RadioButton
                key={item[propKey]}
                label={item[propName]}
                value={item[propName]}
              />
            );
          })}
        </RadioGroup>
      </FormControl>

      {touched[name] && errors[name] && (
        <p>
          Lo sentimos, ocurrio un error inesperado. Vuelve a intertarlo más
          tarde.
        </p>
      )}
    </>
  );
}
