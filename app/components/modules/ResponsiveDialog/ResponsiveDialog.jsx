// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, withStyles } from '@material-ui/core/styles';

import Button from '../../elements/Button/Button';
import SectionTitle from '../../elements/SectionTitle/SectionTitle';
import {
  PrivacyPolicy,
  TermsOfService,
  UserPreview,
} from '../../templates/BasicsDialogs';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <SectionTitle title={children} />

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

export default function ResponsiveDialog({
  onClose = () => {},
  title,
  type = 'terms',
  showActions = true,
  visible = false,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const renderContent = () => {
    switch (type) {
      case 'terms':
        return <TermsOfService />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'user-preview':
        return <UserPreview />;
      case 'car-preview':
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={visible}
        onClose={() => onClose(false)}
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => onClose(false)}
        >
          {title}
        </DialogTitle>

        <DialogContent dividers>{renderContent()}</DialogContent>

        {showActions && (
          <DialogActions>
            <Button
              marginTop={true}
              invert={true}
              onClick={() => onClose(false)}
            >
              Entendido
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
