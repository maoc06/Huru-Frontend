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
    border: '1px solid #828282',
    borderRadius: '4px',
    marginTop: '8px',
    marginBottom: 0,
    textTransform: 'capitalize',
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
