import { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiSwitch from '@material-ui/core/Switch';

const CustomSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#34A885',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#34A885',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
    boxShadow: 'none',
  },
  track: {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.grey[300],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <MuiSwitch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default function AppSwitch({ name, checked = false, onChangeState }) {
  const handleChange = (event) => {
    if (typeof onChangeState === 'function') {
      onChangeState(event.target.checked);
    }
  };

  return (
    <CustomSwitch
      checked={checked}
      onChange={handleChange}
      name={name}
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  );
}
