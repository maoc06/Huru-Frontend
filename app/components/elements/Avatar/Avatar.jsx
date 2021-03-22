import Avatar from '@material-ui/core/Avatar';

import { materialAvatarStyles } from '../../../styles/material/avatar';

export default function AppAvatar({
  src = '/images/default-profile-picture.png',
  size = 'large',
  alt = 'Avatar',
}) {
  const classes = materialAvatarStyles();

  return (
    <Avatar
      alt={alt}
      src={src}
      className={`${size === 'small' && classes.small} ${
        size === 'large' && classes.large
      } ${size === 'medium' && classes.medium}`}
    />
  );
}
