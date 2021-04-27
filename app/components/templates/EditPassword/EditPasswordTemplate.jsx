import Form from '../../modules/Forms/Form';
import Textfield from '../../elements/Textfield/Textfield';
import SubmitButton from '../../elements/Button/SubmitButton';

import updatePasswordSchema from '../../../constants/validationSchema/updatePassword';

function EditPasswordTemplate({ onUpdate, currPasswordError = false, userId }) {
  const initialValues = {
    currPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const handleSubmit = ({ currPassword, newPassword }) => {
    onUpdate({ uuid: userId, currPassword, newPassword });
  };

  return (
    <Form
      initialValues={initialValues}
      validationSchema={updatePasswordSchema}
      onSubmit={handleSubmit}
    >
      <Textfield
        name="currPassword"
        type="password"
        label="Contraseña actual"
        placeholder="Digita tu contraseña actual"
        apiError={currPasswordError}
        errorMsg="La contraseña no es correcta"
      />

      <Textfield
        name="newPassword"
        type="password"
        label="Contraseña nueva"
        placeholder="Digita la nueva contraseña"
      />

      <Textfield
        name="confirmNewPassword"
        type="password"
        label="Confirmar contraseña nueva"
        placeholder="Digita nuevamente la nueva contraseña"
      />

      <SubmitButton marginTop={true}>Actualizar contraseña</SubmitButton>
    </Form>
  );
}

export default EditPasswordTemplate;
