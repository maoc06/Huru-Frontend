import { useState } from 'react';

import Tab from '../../elements/Tab/Tab';
import CardTemplate from '../../templates/PaymentMethods/CardTemplate';
import NequiTemplate from '../../templates/PaymentMethods/NequiTemplate';

import style from './AddPaymentMethodLayout.module.scss';

const AddPaymentMethodLayout = ({ uid, email }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const renderTab = () => {
    switch (tabIndex) {
      case 0:
        return <CardTemplate uid={uid} email={email} />;
      case 1:
        return <NequiTemplate uid={uid} email={email} />;
      default:
        console.error('unkown-error: Tabs case unkown');
        return null;
    }
  };

  return (
    <main className={style.wrapper}>
      <div className={style.formSection}>
        <h6 className={style.sectionTitle}>Método de pago</h6>

        <section className={style.tabs}>
          <Tab
            text="Tarjeta"
            isActive={tabIndex === 0}
            index={0}
            onSelectTab={setTabIndex}
          />
          <Tab
            text="Nequi"
            isActive={tabIndex === 1}
            index={1}
            onSelectTab={setTabIndex}
          />
        </section>

        <div className={style.formContent}>
          {renderTab()}
        </div>
      </div>
    </main>
  );
};

export default AddPaymentMethodLayout;
