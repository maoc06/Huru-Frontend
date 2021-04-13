import AppSwicth from '../../elements/Switch/Switch';
import Button from '../../elements/Button/Button';

import useApi from '../../../hooks/useApi';
import paymentUserApi from '../../../api/PaymentUserAPI';

import styles from './PaymentEditControlls.module.scss';

export default function PaymentEditControlls({
  defaultId,
  paymentId,
  isDefault,
}) {
  const changeDefault = useApi(paymentUserApi.updateDefaultPayment);

  const handleSetAsDefault = () => {
    const data = { id: defaultId, newDefault: paymentId };
    changeDefault.request(data);
  };

  const handleToDisable = () => {
    console.log('To Diasable Payment Method');
  };

  return (
    <section className={styles.container}>
      <div className={styles.default}>
        <p>Usar por defecto</p>
        <AppSwicth checked={isDefault} onChangeState={handleSetAsDefault} />
      </div>

      <Button isSecondary={true} onClick={handleToDisable}>
        Eliminar metodo de pago
      </Button>
    </section>
  );
}
