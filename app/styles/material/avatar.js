import { makeStyles } from '@material-ui/core/styles';

export const materialAvatarStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  medium: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  xl: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));
