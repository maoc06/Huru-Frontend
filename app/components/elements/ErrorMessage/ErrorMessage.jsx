import styles from './ErrorMessage.module.scss';

export default function ErrorMessage({ visible, message }) {
  if (!visible) return null;
  return <p className={styles.statusMsg}>{message}</p>;
}
