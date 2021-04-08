import AppSwicth from '../../elements/Switch/Switch';
import Button from '../../elements/Button/Button';

import styles from './PaymentEditControlls.module.scss';

export default function PaymentEditControlls({ isDefault, onClick }) {
  return (
    <section className={styles.container}>
      <div className={styles.default}>
        <p>Usar por defecto</p>
        <AppSwicth checked={isDefault} />
      </div>

      <Button isSecondary={true} onClick={onClick}>
        Eliminar metodo de pago
      </Button>
    </section>
  );
}
