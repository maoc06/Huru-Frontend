import Link from 'next/link';

import styles from './SeeAll.module.scss';

const SeeAll = ({ href = '/' }) => {
  return (
    <div className={styles.container}>
      <Link href={href}>
        <a>Ver todas</a>
      </Link>
    </div>
  );
};

export default SeeAll;
