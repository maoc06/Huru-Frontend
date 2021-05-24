import Link from 'next/link';

import styles from './SeeAll.module.scss';

const SeeAll = ({
  href = '/',
  text = 'Ver todas',
  simulate = false,
  onSimulate = () => {},
}) => {
  return (
    <div className={styles.container}>
      {!simulate ? (
        <Link href={href}>
          <a>{text}</a>
        </Link>
      ) : (
        <a onClick={onSimulate}>{text}</a>
      )}
    </div>
  );
};

export default SeeAll;
