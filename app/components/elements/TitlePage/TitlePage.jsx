import styles from './TitlePage.module.scss';

export default function TitlePage({ children, align = 'center' }) {
  const titleClass = align === 'left' ? styles.titleLeft : styles.title;
  return <h4 className={titleClass}>{children}</h4>;
}
