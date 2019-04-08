import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import AddCircle  from 'material-ui-icons/AddCircle'
import Dialog from 'material-ui/Dialog';
import DialogActions from 'material-ui/Dialog/DialogActions';
import DialogContent from 'material-ui/Dialog/DialogContent';
import DialogContentText from 'material-ui/Dialog/DialogContentText';
import DialogTitle from 'material-ui/Dialog/DialogTitle';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import classNames from 'classnames';
function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  inputPlaceholder:{
    left:"auto"
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  }, 
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class NewProduct extends React.Component {
  constructor(props) {
    super(props);
    // this.nameInput = React.createRef();
    // this.quantityInput = React.createRef();
    // this.priceInput = React.createRef();
    // this.handleClickEnter = this.handleClickEnter.bind(this);
  }
  state = {
    pristan:{
      nameStatus:true,
      quantityStatus:true,
      priceStatus:true,
    },
    open: false,
    name: '',
    quantity: '',
    price: '',
    errorMessage:'',
    // focus:'name'
    loading: false,
    success: false,
  };
  componentDidMount = () => {
  }
  handleChange = name => event => {
    const value = event.target.value
    this.setState({ [name]: value })
    switch (name) {
        case 'name':
        this.setState(
          {pristan:
            {nameStatus:false,
            quantityStatus:true,
            priceStatus:true
          },
          })
        break;
        case 'quantity':
        this.setState(
          {pristan:
            {quantityStatus:false,
              nameStatus:true,
              priceStatus:true
          },
          })
        break;
        case 'price':
        this.setState(
          {pristan:
            {priceStatus:false,
              nameStatus:true,
              quantityStatus:true,
          },
          })
        break;
      default:
        break;
    }

  }

   clickSubmit = () => {

    if (this.state.name===''||this.state.quantity===''||this.state.price==='') {
      this.setState(
        {pristan:
          {nameStatus:false,
          quantityStatus:false,
          priceStatus:false},
        })
      return;
    }
    const product={
      name:this.state.name,
      quantity:this.state.quantity,
      price:this.state.price
    }

    this.props.selectedRowChange(product);
    // if (!this.props.loading) {
    //   this.setState({ open: false });      
    // }
  }

  handleButtonClick = () => {
    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true,
        },
        () => {
          this.timer = setTimeout(() => {
            this.setState({
              loading: false,
              success: true,
            });
          }, 2000);
        },
      );
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickEnter= name => event => {
    console.log(`Pressed keyCode ${event.key} , `,name);



    // const p=/^[\u0600-\u06FF\s]+$/;
    // if( p.test(event.key)){
    //   console.log('event.key',event.key);
    //   return false;
    // }


    if (event.key === 'Enter') {
      // switch (name) {
      //   case 'name':
      //   this.textInput.current.focus();
      //     break;
      //     case 'quantity':
      //     this.quantityInput.current.focus();
      //       break;
      //       case 'price':
      //       this.priceInput.current.focus();
      //         break;
      
      //   default:
      //     break;
      // }
      // this.setState({ focus: name });
      // console.log('this.state.focus',this.state.focus);
      // Do code here
      event.preventDefault();
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: this.state.success,
    });
    return (
      <div>
        <IconButton onClick={this.handleClickOpen} aria-label="Add product" >
                   <AddCircle />
         </IconButton>
                <Dialog
                        open={this.state.open}
                        aria-labelledby="form-dialog-title"
                        >
                        <DialogTitle id="form-dialog-title">افزودن محصول</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                تمامی فیلد ها رو پر کنید! <span >{this.state.errorMessage} </span>
                                </DialogContentText>
                                <TextField
                                InputLabelProps={{
                                  style: {
                                      left:"auto"
                                  }
                                }}
                                onKeyPress={this.handleClickEnter('quantity')}
                                // inputRef={this.nameInput} 
                                autoFocus
                                required
                                error={this.state.name==='' && !this.state.pristan.nameStatus}
                                margin="dense"
                                id="name"
                                label="نام"                                
                                type="text"
                                fullWidth
                                value={this.state.name} 
                                onChange={this.handleChange('name')}
                                />
                                <TextField                          
                                required
                                InputLabelProps={{
                                  style: {
                                      left:"auto"
                                  }
                                }}
                                onKeyPress={this.handleClickEnter('price')}
                                // inputRef={this.quantityInput} 
                                // autoFocus={(this.state.focus==='quantity')?true:false}
                                error={this.state.quantity==='' && !this.state.pristan.quantityStatus} 
                                margin="dense"
                                id="quantity"
                                label="تعداد"
                                type="number"
                                fullWidth
                                value={this.state.quantity} 
                                onChange={this.handleChange('quantity')} 
                                />
                                <TextField   
                                  InputLabelProps={{
                                    style: {
                                        left:"auto"
                                    }
                                  }}        
                                onKeyPress={this.handleClickEnter('price')}
                                // inputRef={this.priceInput} 
                                // autoFocus={(this.state.focus==='price')?true:false}
                                required
                                error={this.state.price==='' && !this.state.pristan.priceStatus}
                                margin="dense"
                                id="price"
                                label="قیمت"
                                type="tel"
                                fullWidth
                                value={this.state.price}
                               onChange={this.handleChange('price')}
                                />
                            </DialogContent>
                        <DialogActions>
                            {/* <Button onClick={this.handleClose} color="primary">
                            انصراف
                            </Button>
                            <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>
                            ذخیره
                            </Button> */}
                             <div className={classes.wrapper}>
                              <Button
                                // variant="fl"
                                color="primary"
                                className={buttonClassname}
                                disabled={this.props.loading}
                                onClick={this.clickSubmit}
                              >
                                Accept terms
                              </Button>
                              {this.props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </div>
                        </DialogActions>
                </Dialog>
      </div>
    );
  }
}

NewProduct.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedRowChange: PropTypes.func.isRequired,
  isLoading:PropTypes.bool.isRequired,
};

export default withStyles(styles)(NewProduct)