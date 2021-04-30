import { useState } from 'react';
import SnackBar from '../SnackBar/SnackBar';

import styles from './Button.module.scss';

export default function Button({
  type,
  children,
  onClick,
  isSecondary,
  marginTop,
  marginBottom,
  withTinyMarginBottom = false,
  invert = false,
  icon,
  withIcon = false,
  isRejectAction = false,
  tinyBorder = false,
  isDisabled = false,
  ...otherProps
}) {
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleClickDisabled = () => {
    setOpenSnackBar(true);
  };

  return (
    <>
      <button
        type={type}
        onClick={isDisabled ? handleClickDisabled : onClick}
        {...otherProps}
        className={`${styles.baseButton} ${
          isSecondary ? styles.sencondaryButton : styles.primaryButton
        } ${invert && !isSecondary && styles.invertButton} ${
          marginTop && styles.margin_top
        } ${marginBottom && styles.margin_bottom} ${
          isRejectAction && styles.rejectButton
        } ${tinyBorder && styles.tinyBorder} ${
          withTinyMarginBottom && styles.withTinyMarginBottom
        } ${isDisabled && styles.customDisabled}`}
      >
        {withIcon && icon}
        {children}
      </button>

      <SnackBar
        onClose={() => setOpenSnackBar(false)}
        message="Debes tener un metodo de pago seleccionado para confirmar la reserva"
        visible={openSnackBar}
      />
    </>
  );
}
