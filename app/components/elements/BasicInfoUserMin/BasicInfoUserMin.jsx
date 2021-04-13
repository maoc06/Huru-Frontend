import Avatar from '../../elements/Avatar/Avatar';

import styles from './BasicInfoUserMin.module.scss';

export default function BasicInfoUserMin({ name, urlImage }) {
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Avatar size="medium" src={urlImage} />
      </div>
      <h6 className={styles.names}>{name}</h6>
    </div>
  );
}
