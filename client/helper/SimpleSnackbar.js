import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import amber from 'material-ui/colors/amber';
import green from 'material-ui/colors/green';
import SnackbarContent from 'material-ui/Snackbar/SnackbarContent';
const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
  warning: {
    backgroundColor: amber[700],
  },
  success: {
    backgroundColor: green[600],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  }
});

class SimpleSnackbar extends React.Component {
  state = {
    // open: false,
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.props.close();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.props.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          >
          <SnackbarContent
          className={(this.props.messageType==='war')?classes.warning:classes.success}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              {(this.props.messageType==='war')?(<WarningIcon/>):(<CheckCircleIcon/>)}
              {this.props.message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
        </Snackbar>
      </div>
    );
  }
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  messageType:PropTypes.string.isRequired,
};

export default withStyles(styles)(SimpleSnackbar);