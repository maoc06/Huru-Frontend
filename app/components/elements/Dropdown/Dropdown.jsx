import { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import LabelForm from '../Label/LabelForm';
import ErroMessage from '../ErrorMessage/ErrorMessage';
import styles from './Dropdown.module.scss';
import { materialStyles } from '../../../styles/material/materialBase';

export default function Dropdown({
  name,
  list,
  label,
  propKey = 'id',
  propName = 'name',
  error,
  errorMsg,
  setError,
  marginTop,
  marginBottom,
  marginToButton,
  setSelectItem,
  defaultValue,
}) {
  const classes = materialStyles();
  const [selected, setSelect] = useState(list[0][propName]);

  const { setFieldValue, touched, errors } = useFormikContext();

  const getObjectByPropName = (item) => {
    return list.find((obj) => {
      return obj[propName] === item;
    });
  };

  useEffect(() => {
    setFieldValue(name, getObjectByPropName(selected));
    if (defaultValue) setSelect(defaultValue);
  }, []);

  useEffect(() => {
    setSelect(list[0][propName]);
    setFieldValue(name, getObjectByPropName(list[0][propName]));
  }, [list]);

  const handleChange = (event) => {
    const selectedItem = event.target.value;
    setSelect(selectedItem);

    const selectObject = getObjectByPropName(selectedItem);
    setFieldValue(name, selectObject);

    if (typeof setSelectItem === 'function') {
      setSelectItem(selectObject);
    }

    if (error) setError(false);
  };

  return (
    <div
      className={`${marginTop && styles.margin_top} ${
        marginBottom && styles.margin_bottom
      } ${marginToButton && styles.margin_to_button}`}
    >
      <LabelForm>{label}</LabelForm>

      <FormControl className={classes.formControl}>
        <Select
          name={name}
          value={selected}
          onChange={handleChange}
          displayEmpty
          disableUnderline
          defaultValue={defaultValue ? defaultValue : ''}
          inputProps={{ 'aria-label': 'Without label' }}
          classes={{ root: classes.root }}
        >
          {list.map((item) => {
            return (
              <MenuItem
                key={item[propKey]}
                defaultValue=""
                value={item[propName]}
                classes={{ root: classes.rootItem }}
              >
                {item[propName]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <ErroMessage visible={touched[name]} message={errors[name]} />
      <ErroMessage visible={error} message={errorMsg} />
    </div>
  );
}
