import BuildIcon from '@material-ui/icons/Build';
import styles from './ComingSoon.module.scss';

export default function ComingSoon({
  text = 'Esta funcionalidad estará disponible muy pronto en las nuevas versiones.',
}) {
  return (
    <div className={styles.container}>
      <BuildIcon className={styles.icon} />
      <p className={styles.message}>{text}</p>
    </div>
  );
}