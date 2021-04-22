import styles from './TitlePage.module.scss';

export default function TitlePage({ children }) {
  return <h4 className={styles.title}>{children}</h4>;
}
