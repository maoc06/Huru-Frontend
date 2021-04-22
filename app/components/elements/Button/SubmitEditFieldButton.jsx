import { useFormikContext } from 'formik';

import styles from './SubmitEditFieldButton.module.scss';

export default function SubmitEditFieldButton({ onEdit, editable }) {
  const { handleSubmit } = useFormikContext();

  return (
    <span
      className={`${editable && styles.saveButton}`}
      onClick={editable ? handleSubmit : onEdit}
    >
      {editable ? 'Guardar' : 'Editar'}
    </span>
  );
}
