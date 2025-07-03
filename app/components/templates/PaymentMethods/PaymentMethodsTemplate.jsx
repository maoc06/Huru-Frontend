import { useState } from 'react';
import Link from 'next/link';
import { Add, KeyboardArrowLeft } from '@material-ui/icons';

import PaymentMethod from '../../modules/PaymentMethods/PaymentMethod';
import AddPaymentMethodLayout from '../../layouts/AddPaymentMethod/AddPaymentMethodLayout';

import styles from './PaymentMethodsTemplate.module.scss';

const PaymentMethodTemplate = ({ list, user }) => {
  const [currentView, setCurrentView] = useState('cards'); // 'cards' or 'form'

  // Helper function to generate placeholder card holder name
  const getPlaceholderCardHolder = (brand) => {
    return brand === 'NEQUI' ? null : 'USUARIO HURU';
  };

  // Helper function to generate placeholder expiry date
  const getPlaceholderExpiry = (brand) => {
    return brand === 'NEQUI' ? null : '08/27';
  };

  // Handle showing the add payment form
  const handleShowAddForm = (e) => {
    e.preventDefault();
    setCurrentView('form');
  };

  // Handle going back to cards view
  const handleBackToCards = () => {
    setCurrentView('cards');
  };

  return (
    <main className={styles.container}>
      {/* Desktop Layout with Image Panel */}
      <div className={styles.desktopLayout}>
        {/* Left Image Panel - Desktop Only */}
        <div className={styles.imagePanel}>
          <div className={styles.imagePanelContent}>
            <picture>
              <source 
                media="(min-width: 1920px)" 
                srcSet="/images/payment-methods-panel-pic.jpg"
              />
              <source 
                media="(min-width: 1200px)" 
                srcSet="/images/payment-methods-panel-pic.jpg"
              />
              <img
                src="/images/payment-methods-panel-pic.jpg"
                alt="Métodos de pago seguros"
                className={styles.panelImage}
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>
        </div>

        {/* Right Content Area */}
        <div className={styles.contentArea}>
          <div className={`${styles.viewContainer} ${currentView === 'form' ? styles.showForm : styles.showCards}`}>
            {/* Cards View */}
            <div className={`${styles.cardsView} ${currentView === 'cards' ? styles.active : ''}`}>
              {/* Header Section */}
              <div className={styles.header}>
                <h1 className={styles.title}>Métodos de pago</h1>
                <p className={styles.subtitle}>
                  Selecciona tu método de pago de preferencia.
                </p>
              </div>

              {/* Payment Methods Grid */}
              <div className={styles.paymentMethodsContainer}>
        {/* Payment Cards Grid */}
        <div className={styles.cardsGrid}>
          {list.map(({ id, type, brand, lastFour, phone, isDefault }) => {
            const cardBrand = type === 'CARD' ? brand : 'NEQUI';
            return (
              <Link href={`/profile/payment-methods/edit/${id}`} key={id}>
                <a className={styles.cardLink}>
                  <PaymentMethod
                    brand={cardBrand}
                    number={type === 'CARD' ? lastFour : phone}
                    isDefault={isDefault}
                    isModern={true}
                    cardHolder={getPlaceholderCardHolder(cardBrand)}
                    expiryDate={getPlaceholderExpiry(cardBrand)}
                  />
                </a>
              </Link>
            );
          })}

          {/* Add New Payment Method Card */}
          <a href="#" onClick={handleShowAddForm} className={styles.addCardLink}>
            <div className={styles.addCard}>
              <div className={styles.addCardContent}>
                <div className={styles.addIcon}>
                  <Add />
                </div>
                <span className={styles.addText}>
                  Agregar método de pago
                </span>
              </div>
            </div>
          </a>
        </div>

        {/* Empty State */}
        {list.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyContent}>
              <div className={styles.emptyIcon}>
                <svg 
                  width="64" 
                  height="64" 
                  viewBox="0 0 64 64" 
                  fill="none"
                >
                  <rect 
                    x="8" 
                    y="20" 
                    width="48" 
                    height="32" 
                    rx="6" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    fill="none"
                  />
                  <path 
                    d="M16 28h32M20 36h8M20 40h12" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className={styles.emptyTitle}>
                No tienes métodos de pago
              </h3>
              <p className={styles.emptyDescription}>
                Agrega tu primera tarjeta o método de pago para comenzar a realizar reservas de forma rápida y segura.
              </p>
              <a href="#" onClick={handleShowAddForm} className={styles.emptyAction}>
                <Add className={styles.emptyActionIcon} />
                Agregar primer método
              </a>
            </div>
          </div>
        )}
              </div>
            </div>

            {/* Form View */}
            <div className={`${styles.formView} ${currentView === 'form' ? styles.active : ''}`}>
              <div className={styles.formHeader}>
                <button onClick={handleBackToCards} className={styles.backButton}>
                  <KeyboardArrowLeft />
                </button>
                <h1 className={styles.formTitle}>Agregar método de pago</h1>
              </div>
              
              <div className={styles.formContent}>
                {user && user.uid ? (
                  <AddPaymentMethodLayout uid={user.uid} email={user.email} />
                ) : (
                  <div className={styles.loadingForm}>
                    <div className={styles.loadingSkeleton}>
                      <div className={styles.skeletonLine}></div>
                      <div className={styles.skeletonLine}></div>
                      <div className={styles.skeletonBlock}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentMethodTemplate;
