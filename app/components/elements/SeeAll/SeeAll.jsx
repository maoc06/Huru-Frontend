import Link from 'next/link';

import styles from './SeeAll.module.scss';

const SeeAll = ({ href = '/', text = 'Ver todas' }) => {
  return (
    <div className={styles.container}>
      <Link href={href}>
        <a>{text}</a>
      </Link>
    </div>
  );
};

export default SeeAll;
