import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NewInvoiceStep1 from './step1/NewInvoiceStep1';
import NewInvoiceStep2 from './step2/NewInvoiceStep2';
import { Redirect } from 'react-router-dom'
import SimpleSnackbar from '../helper/SimpleSnackbar'
import { connect } from 'react-redux';
import { getLoading } from '../invoice/invoiceReducer';
import { addInvoiceRequest } from '../invoice/invoiceActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import classNames from 'classnames';
import {
   getRows ,
   getCustomer,
   getCustomerId,
   getInvoiceNumber } from './step1/step1Reducer';
import {
  fetchNextInvoiceNumber,
  } from './step1/step1Actions'   
  import {
    fetchIranStates,
    } from './step2/step2Actions'   
import {
   getDeliveryAmount 
   ,getPostType
   ,getSelectedState
   ,getSelectedCity
   ,getDeliveryTime 
  } from './step2/step2Reducer';
const styles = theme => ({
  root: {
    direction: 'initial',
  },
  stepper:{
  },
  actions:{
    float:'left',
    margin:20,
    display: 'flex'
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  button: {
    backgroundColor: '#607d8b',
    color:'black'
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

function getSteps() {
  return ['تکمیل اطلاعات اولیه', 'تاریخ تحویل'];
}



class NewInvoiceStepper extends React.Component {
  state = {
    redirect:false,
    activeStep: 0,
    open:false,
    message:'',
    messageType:'',
  };
  componentDidMount = () => {
    this.props.dispatch(fetchIranStates());

    window.onpopstate = (event)=> {
      console.log('event',event);
      if (this.state.activeStep===1) {
        this.setState(state => ({
          activeStep: state.activeStep - 1,
        }));
      }
    };
    this.props.dispatch(fetchNextInvoiceNumber());
  }
 getStepContent=(stepIndex) =>{
    switch (stepIndex) {
      case 0:
        return (<NewInvoiceStep1 
          />);
      case 1:
      return (<NewInvoiceStep2
          />);
      default:
        return 'Unknown stepIndex';
    }
  }
  checkForRows=()=>{
    let total=0;
    let checkedRows;
    if (this.props.invoiceRows.length>0) {
       checkedRows=this.props.invoiceRows.filter(row=>{
        if (row.price) {
          total+=row.totalPrice;
          return row;
        }
      })
    }
    return {total,checkedRows};
  }
  
  handleNext = () => {
  const total= this.checkForRows().total;
  const aftercheck=this.checkForRows().checkedRows;
  switch (this.state.activeStep) {
    case 0:
     if (aftercheck.length===0 ||  this.props.invoiceCustomer==='') {
      this.setState(
        { open: true ,
          messageType:'war',
          message:(this.props.invoiceCustomer==='')
          ?'اطلاعات مربوط به نام و نام خانوادگی را تکمیل کنید'
          :'اطلاعات مربوط به فاکتور را تکمیل کنید'
        });
       return;
     }
      break;
    case 1:
    if (this.props.selectedState===''||
    this.props.selectedCity===''||
    this.props.postType===''||
    this.props.deliveryAmount===0||
    this.props.deliveryTime===0 ) {
      this.setState(
        { open: true ,
          messageType:'war',
          message:(this.props.selectedState==='')
          ?'اطلاعات مربوط به استان را تکمیل کنید'
          :(this.props.selectedCity==='')?
          'اطلاعات مربوط به شهر را تکمیل کنید'
          :(this.props.postType==='')?
          'اطلاعات مربوط به روش پست را تکمیل کنید'
          :
          'اطلاعات مربوط به تاریخ تحویل را تکمیل کنید'
        });
      return;       
    }
      break;
    default:
      break;
  }
    if (this.state.activeStep === getSteps().length - 1) {
      let invoice={
        invoiceNumber:this.props.invoiceNumber,
        invoiceCustomer:this.props.invoiceCustomer,
        invoiceCustomerId:(this.props.invoiceCustomerIdInfo.lable===this.props.invoiceCustomer)?
        this.props.invoiceCustomerIdInfo.invoiceCustomerId:''
        ,
        invoiceRows:this.props.invoiceRows,
        address:{state: this.props.selectedState,city: this.props.selectedCity},
        postType:this.props.postType,
        deliveryDate:{timeAmount:this.props.deliveryAmount,timeType:this.props.deliveryTime},
        totalPrice:total,
      }
      this.props.dispatch(addInvoiceRequest(invoice)).then(res=>{
        this.setState({
          redirect:true,
        })
      });
    } else{
    history.pushState(null, null, location.href);
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }));
    }
  };
  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };
  handleClose = () => {
    this.setState({
      open:false,
    });
  };
  render() {
    const { classes } = this.props;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: this.state.success,
    });
    const steps = getSteps();
    const { activeStep } = this.state;
    if (this.state.redirect) {
      return (<Redirect to={'/'}/>)
    }
    return (
      <div >
        <Stepper className={classes.root} activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>مراحل تکمیل شد</Typography>
            </div>
          ) : (
            <div >
                <div>
                 {this.getStepContent(activeStep)}    
                </div>             
                    <div className={classes.actions}>
                    <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.backButton}
                    >
                        مرحله قبل
                    </Button>

                             <div className={classes.wrapper}>
                              <Button
                                variant="contained"
                                className={buttonClassname}
                                disabled={this.props.isLoading}
                                onClick={this.handleNext}
                              >
                                {activeStep === steps.length - 1 ? 'ذخیره' : 'مرحله بعد'}
                              </Button>
                              {this.props.isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </div>


                    </div> 
            </div>           
          )}
        </div>
        <SimpleSnackbar open={this.state.open} close={this.handleClose}
         message={this.state.message} messageType={this.state.messageType}/>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isLoading: getLoading(state),
    invoiceRows: getRows(state),
    postType: getPostType(state),
    deliveryAmount: getDeliveryAmount(state),
    deliveryTime: getDeliveryTime(state),
    selectedCity: getSelectedCity(state),
    selectedState: getSelectedState(state),
    invoiceCustomer: getCustomer(state),
    invoiceCustomerIdInfo: getCustomerId(state),
    invoiceNumber:getInvoiceNumber(state)
};
}
NewInvoiceStepper.propTypes = {
  classes: PropTypes.object,
  isLoading:PropTypes.bool,
  invoiceRows: PropTypes.array,
  invoiceNumber:PropTypes.string,
  invoiceCustomer: PropTypes.string,
  invoiceCustomerIdInfo: PropTypes.object,
  deliveryAmount: PropTypes.string,
  deliveryTime: PropTypes.string,
  postType: PropTypes.string,
  selectedCity: PropTypes.string,
  selectedState: PropTypes.string,
};

export default connect(mapStateToProps)(withStyles(styles)(NewInvoiceStepper));