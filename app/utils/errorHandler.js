const errorHandlerLogin = (obj) => {
  if (obj.status !== undefined && obj.status === 'error') {
    if (obj.message === 'auth/user-not-found') {
      return { index: 0, msg: 'El usuario no esta registrado' };
    } else if (obj.message === 'auth/invalid-password') {
      return { index: 1, msg: 'La contraseña es incorrecta' };
    }
  }
  return 0;
};

export { errorHandlerLogin };
