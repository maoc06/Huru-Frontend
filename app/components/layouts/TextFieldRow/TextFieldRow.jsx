import styles from './TextFieldRow.module.scss';

export default function TextFieldRow({
  children,
  label,
  error,
  marginTop,
  marginToButton,
}) {
  return (
    <>
      <main
        className={`${marginTop && styles.margin_top} ${
          marginToButton && styles.margin_to_button
        }`}
      >
        <label className={styles.label}>{label}</label>

        <div className={`${styles.container}`}>{children}</div>

        {error && <p>Error</p>}
      </main>
    </>
  );
}
