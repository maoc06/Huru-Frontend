import StatePicture from '../../elements/StatePicture/StatePicture';

import styles from './StatePictures.module.scss';

function StatePictures({ pictures, withMarginBottom = false }) {
  return (
    <main
      className={`${styles.wrapper} ${withMarginBottom && styles.bottomSpace}`}
    >
      {pictures.map(({ id, source }) => {
        return <StatePicture key={id} src={source} />;
      })}
    </main>
  );
}

export default StatePictures;
