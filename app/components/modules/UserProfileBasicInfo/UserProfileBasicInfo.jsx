import formatJoinDate from '../../../utils/formatJoinDate';

import Avatar from '../../elements/Avatar/Avatar';
import { FillStartIcon } from '../../elements/Icons/Shared';

import styles from './UserProfileBasicInfo.module.scss';

export default function UserProfileBasicInfo({
  name,
  profilePicture,
  createdAt,
}) {
  return (
    <section className={styles.container}>
      <Avatar src={profilePicture} />
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p>Se unio en {formatJoinDate(createdAt)}</p>

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
      </div>
    </section>
  );
}
