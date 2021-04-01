import { makeStyles } from '@material-ui/core/styles';

export const materialDividerStyles = makeStyles((theme) => ({
  small: {
    margin: theme.spacing(3),
  },
  medium: {
    margin: theme.spacing(4),
  },
  mediumTop: {
    margin: theme.spacing(4, 0),
  },
}));
