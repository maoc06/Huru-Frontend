import styles from './LabelForm.module.scss';

export default function LabelForm({ children }) {
  return <label className={styles.label}>{children}</label>;
}
