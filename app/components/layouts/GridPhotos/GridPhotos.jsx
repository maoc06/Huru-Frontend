import styles from './GridPhotos.module.scss';

export default function GridPhotos({ children }) {
  return (
    <>
      <main className={`${styles.container}`}>{children}</main>
    </>
  );
}
