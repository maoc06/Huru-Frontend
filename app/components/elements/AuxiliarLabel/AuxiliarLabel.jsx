import { HelpOutlineOutlined } from '@material-ui/icons';

import styles from './AuxiliarLabel.module.scss';

export default function AuxiliarLabel({ text, onClick, withIcon, bold }) {
  return (
    <div className={styles.container} onClick={onClick}>
      <p className={`${bold && styles.bold_label}`}>{text}</p>
      {withIcon && <HelpOutlineOutlined />}
    </div>
  );
}
