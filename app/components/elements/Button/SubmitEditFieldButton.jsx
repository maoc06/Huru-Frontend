import Link from 'next/link';
import { useFormikContext } from 'formik';

import styles from './SubmitEditFieldButton.module.scss';

export default function SubmitEditFieldButton({
  onEdit,
  editable,
  isLink = false,
  href = '',
}) {
  const { handleSubmit, errors } = useFormikContext();

  const handleSave = (event) => {
    console.log(errors);
    handleSubmit(event);
    onEdit();
  };

  if (isLink) {
    return (
      <Link href={href}>
        <a>Editar</a>
      </Link>
    );
  }

  return (
    <span
      className={`${editable && styles.saveButton}`}
      onClick={editable ? handleSave : onEdit}
    >
      {editable ? 'Guardar' : 'Editar'}
    </span>
  );
}
