export const constraintsContinueBooking = ({
  carEnabled,
  user,
  setUser,
  isEmailVerified,
  isPhoneVerified,
  status,
}) => {
  if (carEnabled !== 1) {
    setUser({
      ...user,
      message: 'Este vehículo no se encuentra habilitado.',
    });
  } else if (!isEmailVerified) {
    setUser({
      ...user,
      message:
        'Para continuar con la reserva, primero debes verificar tu email.',
    });
  } else if (!isPhoneVerified) {
    setUser({
      ...user,
      message:
        'Para continuar con la reserva, primero debes verificar tu número telefonico.',
    });
  } else if (!isEmailVerified && !isPhoneVerified) {
    setUser({
      ...user,
      message:
        'Para continuar con la reserva, primero debes verificar tu email y número telefonico.',
    });
  } else if (status === 2) {
    setUser({
      ...user,
      message:
        'Para continuar con la reserva, el equipo de soporte primero debe verificar tu cuenta.',
    });
  } else {
    setUser({
      ...user,
      enabled: true,
    });
  }
};
