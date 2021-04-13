import Divider from '@material-ui/core/Divider';

import { materialDividerStyles } from '../../../styles/material/divider';

const AppDivider = ({ size = 'medium' }) => {
  const classes = materialDividerStyles();

  return (
    <Divider
      className={`${size === 'xs' && classes.extraSmall} ${
        size === 'small' && classes.small
      } ${size === 'medium' && classes.medium} ${
        size === 'mediumTop' && classes.mediumTop
      }`}
    />
  );
};

export default AppDivider;
