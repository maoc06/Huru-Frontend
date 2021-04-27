import formatJoinDate from '../../../utils/formatJoinDate';

import Avatar from '../../elements/Avatar/Avatar';
import { FillStartIcon } from '../../elements/Icons/Shared';

import styles from './UserProfileBasicInfo.module.scss';

export default function UserProfileBasicInfo({
  domain = 'Se unio',
  name,
  profilePicture,
  createdAt,
  showExtra = true,
  avatarSize = 'large',
  withTopMargin = false,
  withBottomMargin = false,
}) {
  return (
    <section
      className={`${styles.container} ${withTopMargin && styles.topMargin} ${
        withBottomMargin && styles.bottomMargin
      }`}
    >
      <Avatar src={profilePicture} size={avatarSize} />

      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p>{`${domain} ${formatJoinDate(createdAt)}`}</p>

        {showExtra && (
          <div className={styles.extra}>
            <p>102 viajes</p>

            <p className={styles.average}>
              Promedio de
              <span>
                <FillStartIcon width={15} height={15} />
              </span>
              4,8
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
