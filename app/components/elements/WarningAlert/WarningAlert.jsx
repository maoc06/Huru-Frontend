import { WarningIcon } from '../../elements/Icons/Shared';

import style from './WarningAlert.module.scss';

export default function WarningAlert({ warningMessage = '' }) {
  return (
    <article className={style.container}>
      <WarningIcon />
      <p>{warningMessage}</p>
    </article>
  );
}
