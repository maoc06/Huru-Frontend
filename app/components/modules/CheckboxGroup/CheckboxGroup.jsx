import { useEffect } from 'react';
import { useState } from 'react';
import { useFormikContext } from 'formik';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function AppRadioGroup({ name, list }) {
  const keys = Object.keys(list[0]);
  const propKey = keys[0];
  const propName = keys[1];

  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const { setFieldValue, touched, errors } = useFormikContext();

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { gilad, jason, antoine } = state;
  // const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  return (
    <>
      <FormControl component="fieldset">
        <FormGroup>
          {list.map((item) => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={gilad}
                    onChange={handleChange}
                    name={item[(propMa, e)]}
                  />
                }
                label={item[propName]}
              />
            );
          })}
        </FormGroup>
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
