import { makeStyles } from '@material-ui/core/styles';

export const materialStyles = makeStyles({
  root: {
    padding: 0,
  },
  rootItem: {
    textTransform: 'capitalize',
  },
  formControl: {
    minWidth: '100%',
    height: 55,
    padding: '16px 24px',
    border: '2px solid #E0E0E0',
    borderRadius: '15px',
    marginTop: '8px',
    marginBottom: 0,
    textTransform: 'capitalize',
    backgroundColor: '#FFFFFF',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',

    '&:focus-within': {
      borderColor: '#070d9a',
      boxShadow: '0 0 0 3px rgba(7, 13, 154, 0.1)',
    },
  },
  field: {
    height: 55,
    padding: '16px 24px',
    border: '1px solid #828282',
    borderRadius: '4px',
    marginTop: '8px',
    marginBottom: 0,
  },
  fieldError: {
    border: '1px solid #df0611',
  },
});
