import { useEffect, useState } from 'react';
import { useFormikContext, ErrorMessage } from 'formik';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';

import RadioButton from '../../elements/RadioButton/RadioButton';
import styles from './RadioGroup.module.scss';

export default function AppRadioGroup({
  name,
  list,
  defaultSelected,
  onChangeAux,
}) {
  const { setFieldValue, values } = useFormikContext();

  const value = values[name];
  const keys = list && list.length > 0 ? Object.keys(list[0]) : [];
  const propKey = keys[0] || 'id';
  const propName = keys[1] || 'name';

  useEffect(() => {
    if (list && list.length > 0 && !values[name]) {
      const defaultItem = defaultSelected
        ? list.find((item) => item[propName] === defaultSelected)
        : list[0];
      if (defaultItem) {
        setFieldValue(name, defaultItem);
      }
    }
  }, [list, name, setFieldValue, defaultSelected, values[name], propName]);

  const getObjectByPropName = (item) => {
    return list.find((obj) => obj[propName] === item);
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedObject = getObjectByPropName(selectedValue);

    setFieldValue(name, selectedObject);

    if (typeof onChangeAux === 'function') {
      onChangeAux(selectedObject);
    }
  };

  return (
    <div className={styles.container}>
      <FormControl component="fieldset">
        <RadioGroup
          name={name}
          value={value?.[propName] || ''}
          onChange={handleChange}
        >
          {(list || []).map((item) => (
            <RadioButton
              key={item[propKey]}
              label={item[propName]}
              value={item[propName]}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <ErrorMessage name={name} component="p" className={styles.error} />
    </div>
  );
}
