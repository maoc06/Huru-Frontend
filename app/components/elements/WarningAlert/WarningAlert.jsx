import WarningAlerIcon from '../../elements/Icons/WarningAlertIcon';

import style from './WarningAlert.module.scss';

export default function WarningAlert({ warningMessage = '' }) {
  return (
    <article className={style.container}>
      <WarningAlerIcon />
      <p>{warningMessage}</p>
    </article>
  );
}
