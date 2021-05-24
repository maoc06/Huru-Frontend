import { useState } from 'react';

import ResponsiveDialog from '../../modules/ResponsiveDialog/ResponsiveDialog';
import styles from './SeePreview.module.scss';

const SeePreview = ({
  text = 'Ver vista previa',
  type = 'user-preview',
  dialogTitle = 'Vista previa',
  ...otherProps
}) => {
  const [openPreview, setOpenPreview] = useState(false);

  return (
    <div className={styles.container}>
      <ResponsiveDialog
        title={dialogTitle}
        type={type}
        showActions={false}
        onClose={() => setOpenPreview(false)}
        visible={openPreview}
        {...otherProps}
      />

      <span className={styles.text} onClick={() => setOpenPreview(true)}>
        {text}
      </span>
    </div>
  );
};

export default SeePreview;
