import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import AddCircle  from '@material-ui/icons/AddCircle'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { setName,setPrice,setQuantity } from './productActions';
import { getLoading ,getName,getPrice,getQuantity} from './productReducer';
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

class NewProduct extends React.PureComponent {
  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
    this.quantityInput = React.createRef();
    this.priceInput = React.createRef();
  }
  state = {
    pristan:{
      nameStatus:true,
      quantityStatus:true,
      priceStatus:true,
    },
    open: false,
    errorMessage:'',
    loading: false,
    success: false,
  };
  componentDidMount = () => {
  }

  handleChange = name => event => {
    const persian = /^[\u0600-\u06FF\s0-9]+$/;
    const number = /^[0-9]*$/;
    const value = event.target.value;

    switch (name) {
        case 'name':
        if (!persian.test(value)&& value!=='') {
          return
         }
        this.props.dispatch(setName(value))
        this.setState(
          {
            // [name]: value,
            pristan:
            {
              nameStatus:false,
            quantityStatus:true,
            priceStatus:true
          },
          })
        break;
        case 'quantity':
        this.props.dispatch(setQuantity(value))
        this.setState(
          {
            pristan:
            {quantityStatus:false,
              nameStatus:true,
              priceStatus:true
          },
          })
        break;
        case 'price':
        if (!number.test(value)&& value!=='') {
          return
         }
         this.props.dispatch(setPrice(value))
        this.setState(
          {
            pristan:
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

    if (this.props.name===''||this.props.quantity===''||this.props.price==='') {
      this.setState(
        {pristan:
          {nameStatus:false,
          quantityStatus:false,
          priceStatus:false},
        })
      return;
    }
    const product={
      name:this.props.name,
      quantity:this.props.quantity,
      price:this.props.price
    }

    this.props.selectedRowChange(product);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickEnter= name => event => {
    if (event.key === 'Enter') {
      switch (name) {
        case 'name':
        this.nameInput.current.focus();
          break;
          case 'quantity':
          this.quantityInput.current.focus();
            break;
            case 'price':
            this.priceInput.current.focus();
              break;
              case 'save':
              this.clickSubmit();
                break;
      
        default:
          break;
      }
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
                                inputRef={this.nameInput} 
                                autoFocus
                                required
                                error={this.props.name==='' && !this.state.pristan.nameStatus}
                                margin="dense"
                                id="name"
                                label="نام"                                
                                type="text"
                                fullWidth
                                value={this.props.name} 
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
                                inputRef={this.quantityInput} 
                                error={this.props.quantity==='' && !this.state.pristan.quantityStatus} 
                                margin="dense"
                                id="quantity"
                                label="تعداد"
                                type="number"
                                fullWidth
                                value={this.props.quantity} 
                                onChange={this.handleChange('quantity')} 
                                />
                                <TextField   
                                  InputLabelProps={{
                                    style: {
                                        left:"auto"
                                    }
                                  }}        
                                onKeyPress={this.handleClickEnter('save')}
                                inputRef={this.priceInput} 
                                required
                                error={this.props.price==='' && !this.state.pristan.priceStatus}
                                margin="dense"
                                id="price"
                                label="قیمت"
                                type="tel"
                                fullWidth
                                value={this.props.price}
                               onChange={this.handleChange('price')}
                                />
                            </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                            انصراف
                            </Button>
                             <div className={classes.wrapper}>
                              <Button
                                variant="contained"
                                className={buttonClassname}
                                disabled={this.props.isLoading}
                                onClick={this.clickSubmit}
                              >
                                ذخیره
                              </Button>
                              {this.props.isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </div>
                        </DialogActions>
                </Dialog>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isLoading: getLoading(state),
    name: getName(state),
    quantity: getQuantity(state),
    price: getPrice(state),
  };
}
NewProduct.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedRowChange: PropTypes.func.isRequired,
  isLoading:PropTypes.bool,
  name:PropTypes.string,
  quantity:PropTypes.string,
  price:PropTypes.string,
};

export default connect(mapStateToProps)(withStyles(styles)(NewProduct))