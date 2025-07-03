import { useEffect } from 'react';
import { useFormikContext, ErrorMessage } from 'formik';
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
  const { setFieldValue, values } = useFormikContext();

  // Effect to handle initialization and default values
  useEffect(() => {
    const currentFieldValue = values[name];
    const fieldHasValue = currentFieldValue && typeof currentFieldValue === 'object' && currentFieldValue[propKey];
    
    if (list && list.length > 0) {
      // If field has no value, set the first item as default
      if (!fieldHasValue) {
        const defaultItem = defaultValue
          ? list.find((item) => item[propName] === defaultValue)
          : list[0];

        if (defaultItem) {
          setFieldValue(name, defaultItem);
          if (typeof setSelectItem === 'function') {
            setSelectItem(defaultItem);
          }
        }
      } else {
        // If field has a value, check if it's still valid in the new list
        const isCurrentValueValid = list.some((item) => 
          item[propKey] === currentFieldValue[propKey]
        );
        
        if (!isCurrentValueValid) {
          // Current value is not in the new list, reset to first item
          const defaultItem = list[0];
          setFieldValue(name, defaultItem);
          if (typeof setSelectItem === 'function') {
            setSelectItem(defaultItem);
          }
        }
      }
    } else {
      // List is empty, clear the field
      if (fieldHasValue) {
        setFieldValue(name, null);
        if (typeof setSelectItem === 'function') {
          setSelectItem(null);
        }
      }
    }
  }, [
    list,
    name,
    setFieldValue,
    defaultValue,
    propName,
    propKey,
    setSelectItem,
  ]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectObject = list.find((item) => item[propName] === selectedValue);

    if (selectObject) {
      setFieldValue(name, selectObject);

      if (typeof setSelectItem === 'function') {
        setSelectItem(selectObject);
      }
    }

    if (error) setError(false);
  };

  // Get the display value safely
  const getDisplayValue = () => {
    const fieldValue = values[name];
    if (fieldValue && typeof fieldValue === 'object' && fieldValue[propName]) {
      return fieldValue[propName];
    }
    return '';
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
          value={getDisplayValue()}
          onChange={handleChange}
          displayEmpty
          disableUnderline
          inputProps={{ 'aria-label': 'Without label' }}
          classes={{ root: classes.root }}
        >
          {(list || []).map((item) => {
            return (
              <MenuItem
                key={item[propKey]}
                value={item[propName]}
                classes={{ root: classes.rootItem }}
              >
                {item[propName]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <ErrorMessage name={name} component="p" className={styles.error} />
      <ErroMessage visible={error} message={errorMsg} />
    </div>
  );
}
