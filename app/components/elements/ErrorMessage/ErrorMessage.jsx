import styles from './ErrorMessage.module.scss';

export default function ErrorMessage({ visible, message }) {
  return (
    <div className={styles.errorContainer}>
      <p className={`${styles.statusMsg} ${visible ? styles.visible : styles.hidden}`}>
        {visible ? message : '\u00A0'}
      </p>
    </div>
  );
}
