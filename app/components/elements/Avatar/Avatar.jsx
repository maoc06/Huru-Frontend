import Avatar from '@material-ui/core/Avatar';

import useApi from '../../../hooks/useApi';
import userApi from '../../../api/UserAPI';

import styles from './Avatar.module.scss';
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';
import { materialAvatarStyles } from '../../../styles/material/avatar';
import { useEffect, useState } from 'react';

export default function AppAvatar({
  clickeable = false,
  src = '/images/default-profile-picture.jpg',
  size = 'large',
  alt = 'Avatar',
  userId,
  cursorPointer = false,
}) {
  const classes = materialAvatarStyles();
  const updateUserPic = useApi(userApi.updateProfilePic);

  const [imageUrl, setImageUrl] = useState(src);

  const handleAvatar = () => {
    document.getElementById('photo-input').click();
  };

  const handleCapture = async (event) => {
    const capture = event.target;
    if (capture.files) {
      if (capture.files.length !== 0) {
        const file = capture.files[0];

        const formData = new FormData();

        formData.append('file', file);
        formData.append('uid', userId);

        if (src !== '/images/default-profile-picture.png') {
          formData.append('originalUrl', src);
        } else {
          formData.append('originalUrl', '/');
        }

        const res = await updateUserPic.request(formData);
        if (!updateUserPic.error) setImageUrl(res.data.url);
      }
    }
  };

  useEffect(() => {
    setImageUrl(src);
  }, [src]);

  return (
    <>
      <ActivityIndicator visible={updateUserPic.loading} />

      <div
        className={clickeable || cursorPointer ? styles.clickeable : undefined}
        onClick={clickeable ? handleAvatar : () => {}}
      >
        <Avatar
          alt={alt}
          src={imageUrl}
          className={[
            size === 'small' && classes.small,
            size === 'large' && classes.large,
            size === 'medium' && classes.medium,
            size === 'xl' && classes.xl
          ].filter(Boolean).join(' ')}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleCapture}
          className={styles.input}
          id="photo-input"
        />
      </div>
    </>
  );
}
