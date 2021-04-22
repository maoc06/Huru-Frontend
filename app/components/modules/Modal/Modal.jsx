import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Button from '../../elements/Button/Button';
import Divider from '../../elements/Divider/Divider';

import { modalStyles } from '../../../styles/material/modal';
import styles from './Modal.module.scss';

const DialogTitle = withStyles(modalStyles)((props) => {
  const { children, classes, onClose, icon, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <div className={styles.topSection}>
        {icon}
        <h6 className={styles.title}>{children}</h6>
      </div>

      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function AppModal({
  title,
  content,
  icon,
  visible = false,
  onConfirm,
  onReject,
  onCloseModal,
  confirmText = 'Confirmar',
  rejectText = 'Cancelar',
  confirmButtonIsSecondary = true,
  showCloseIcon = true,
}) {
  return (
    <>
      {/* This line is to solve a bug that I have no fucking idea of ​​how to solve in another way. */}
      <div className={styles.fixIt}>{icon}</div>

      <Dialog onClose={onCloseModal} open={visible}>
        {showCloseIcon ? (
          <DialogTitle onClose={onCloseModal} icon={icon}>
            {title}
          </DialogTitle>
        ) : (
          <DialogTitle icon={icon}>{title}</DialogTitle>
        )}

        <Divider size="xs" />

        <DialogContent>
          <p className={styles.content}>{content}</p>
        </DialogContent>

        <DialogActions>
          <Button onClick={onReject} isRejectAction={true}>
            {rejectText}
          </Button>

          <Button
            onClick={onConfirm}
            invert={true}
            isSecondary={confirmButtonIsSecondary}
          >
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
