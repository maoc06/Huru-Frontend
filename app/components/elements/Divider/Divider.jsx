import Divider from '@material-ui/core/Divider';

import { materialDividerStyles } from '../../../styles/material/divider';
import styles from './Divider.module.scss';

const AppDivider = ({ size = 'medium', withText = false, text = '' }) => {
  const classes = materialDividerStyles();

  if (withText) {
    return (
      <div
        className={`${size === 'xs' && classes.extraSmall} ${
          size === 'small' && classes.small
        } ${size === 'medium' && classes.medium} ${
          size === 'mediumTop' && classes.mediumTop
        }`}
      >
        <p className={styles.text}>{text}</p>
      </div>
    );
  }

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
