import { useState } from 'react';
import { useRouter } from 'next/router';

import { WarningIcon } from '../../elements/Icons/Shared';
import AppSwicth from '../../elements/Switch/Switch';
import Button from '../../elements/Button/Button';
import ActivityIndicator from '../../elements/ActivityIndicator/ActivityIndicator';
import Modal from '../Modal/Modal';

import useApi from '../../../hooks/useApi';
import paymentUserApi from '../../../api/PaymentUserAPI';

import styles from './PaymentEditControlls.module.scss';

export default function PaymentEditControlls({
  defaultId,
  paymentId,
  isDefault,
}) {
  const router = useRouter();

  const changeDefault = useApi(paymentUserApi.updateDefaultPayment);
  const disablePayment = useApi(paymentUserApi.updateDisablePayment);

  const [showConfimationModal, setShowConfirmModal] = useState(false);

  const handleSetAsDefault = () => {
    const data = { id: defaultId, newDefault: paymentId };
    changeDefault.request(data);
  };

  const handleDisablePayment = async () => {
    setShowConfirmModal(false);

    await disablePayment.request({ id: paymentId });

    if (!disablePayment.error) {
      router.push('/profile/payment-methods');
    }
  };

  const handleShowConfirmModal = () => {
    setShowConfirmModal(!showConfimationModal);
  };

  return (
    <>
      <ActivityIndicator
        visible={changeDefault.loading || disablePayment.loading}
      />

      <Modal
        title="¿Eliminar metodo de pago?"
        content="Está acción es permanente y no se puede deshacer"
        icon={<WarningIcon />}
        visible={showConfimationModal}
        onConfirm={handleDisablePayment}
        onReject={handleShowConfirmModal}
        onCloseModal={handleShowConfirmModal}
      />

      <section className={styles.container}>
        <div className={styles.default}>
          <p>Usar por defecto</p>
          <AppSwicth checked={isDefault} onChangeState={handleSetAsDefault} />
        </div>

        <Button isSecondary={true} onClick={handleShowConfirmModal}>
          Eliminar metodo de pago
        </Button>
      </section>
    </>
  );
}
