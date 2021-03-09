import { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import LabelForm from '../Label/LabelForm';
import ErroMessage from '../ErrorMessage/ErrorMessage';
import styles from './Dropdown.module.scss';

const useStyles = makeStyles({
  formControl: {
    minWidth: '100%',
    height: 55,
    padding: '16px 24px',
    border: '1px solid #828282',
    borderRadius: '4px',
    marginTop: '8px',
    marginBottom: 0,
    textTransform: 'capitalize',
  },
  root: {
    padding: 0,
  },
  rootItem: {
    textTransform: 'capitalize',
  },
});

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
}) {
  const classes = useStyles();
  const [selected, setSelect] = useState(list[0][propName]);

  const { setFieldValue, setErrors, touched, errors } = useFormikContext();

  const getObjectByPropName = (item) => {
    return list.find((obj) => {
      return obj[propName] === item;
    });
  };

  useEffect(() => {
    setFieldValue(name, getObjectByPropName(selected));
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
          defaultValue=""
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
