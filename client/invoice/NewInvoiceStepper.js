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
import {getNextInvoiceNumber} from './api-invoice'
import { getLoading } from '../invoice/invoiceReducer';
import { addInvoiceRequest } from '../invoice/invoiceActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import classNames from 'classnames';
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
  stepper:{
    // di
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
    step1Data:{invoiceNumber:'',invoiceCustomer:'',invoiceCustomerId:'',invoiceRows:[]},
    step2Data:{address:{state:'',city:''},postType:'',deliveryDate:{timeAmount:0,timeType:''}},
    open:false,
    message:'',
    messageType:'',
    input:''
  };
  // onBackButtonEvent=(e) => {
  //   e.preventDefault();
  //  console.log('baaaack');
  // }
  componentDidMount = () => {
    // window.onpopstate  = (e) => {
    //   e.preventDefault();
    // }
    window.onpopstate = (event)=> {
      console.log('event',event);
      if (this.state.activeStep===1) {
        this.setState(state => ({
          activeStep: state.activeStep - 1,
        }));
      }
      // history.go(0);
    };
    getNextInvoiceNumber().then((data) => {
      this.setState(
        {
         step1Data: {invoiceNumber: data.order,invoiceCustomer:'',invoiceCustomerId:'',invoiceRows:[]},
         step2Data:{address:{state:'',city:''},postType:'',deliveryDate:{timeAmount:0,timeType:''}}
      })
    })


  }
  handleUpdateCustomer= (value,id) => {
    const step1={...this.state.step1Data}
    step1.invoiceCustomer=value;
    step1.invoiceCustomerId=id;
    this.setState(
      {step1Data:step1})
   }
   handleUpdateCustomerInput= (value) => {
    // const step1={...this.state.step1Data}
    // step1.invoiceCustomer=value;;
    this.setState(
      {input:value})
   }
   handleUpdateRows= (value)=> {
    const step1={...this.state.step1Data}
    step1.invoiceRows=value;
    this.setState(
      {step1Data:step1})
   }
   handleStateChange = value => {
    const step2={...this.state.step2Data}
    step2.address.state=value;
    this.setState(
      {step2Data:step2})
  };
  handleCityChange = value  => {
    const step2={...this.state.step2Data}
    step2.address.city=value;
    this.setState(
      {step2Data:step2})
  };
  handlePostTypeChange = value  => {
    const step2={...this.state.step2Data}
    step2.postType=value;
    this.setState(
      {step2Data:step2})
  };
  handleTimeTypeChange = value  => {
    const step2={...this.state.step2Data}
    step2.deliveryDate.timeType=value;
    this.setState(
      {step2Data:step2})
  };
  handleTimeAmountChange = value  => {
    const step2={...this.state.step2Data}
    step2.deliveryDate.timeAmount=value;
    this.setState(
      {step2Data:step2})
  };
 getStepContent=(stepIndex) =>{
    switch (stepIndex) {
      case 0:
        return (<NewInvoiceStep1 
          updateCustomer={this.handleUpdateCustomer}
          updateCustomerInput={this.handleUpdateCustomerInput}
          updateRows={this.handleUpdateRows}
          step1Data={this.state.step1Data}/>);
      case 1:
      return (<NewInvoiceStep2
          updateState={this.handleStateChange}
          updateCity={this.handleCityChange}
          updatePostType={this.handlePostTypeChange}
          updateTimeType={this.handleTimeTypeChange}
          updateTimeAmount={this.handleTimeAmountChange}
          step2Data={this.state.step2Data}/>);
      default:
        return 'Unknown stepIndex';
    }
  }
  checkForRows=()=>{
    let total=0;
    if (this.state.step1Data.invoiceRows.length>0) {
      this.state.step1Data.invoiceRows=this.state.step1Data.invoiceRows.filter(row=>{
        if (row.price) {
          total+=row.totalPrice;
          return row;
        }
      })
    }
    return total;
  }
  
  handleNext = () => {
    console.log(this.state);
  const total= this.checkForRows();
  switch (this.state.activeStep) {
    case 0:
     if (this.state.step1Data.invoiceRows.length===0 ||  this.state.input==='') {
      this.setState(
        { open: true ,
          messageType:'war',
          message:(this.state.input==='')
          ?'اطلاعات مربوط به نام و نام خانوادگی را تکمیل کنید'
          :'اطلاعات مربوط به فاکتور را تکمیل کنید'
        });
       return;
     }
      break;
    case 1:
    if (this.state.step2Data.address.state===''||
    this.state.step2Data.address.city===''||
    this.state.step2Data.postType===''||
    this.state.step2Data.deliveryDate.timeAmount===0||
    this.state.step2Data.deliveryDate.timeType===0 ) {
      this.setState(
        { open: true ,
          messageType:'war',
          message:(this.state.step2Data.address.state==='')
          ?'اطلاعات مربوط به استان را تکمیل کنید'
          :(this.state.step2Data.address.city==='')?
          'اطلاعات مربوط به شهر را تکمیل کنید'
          :(this.state.step2Data.postType==='')?
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
      const invoice={
        invoiceNumber:this.state.step1Data.invoiceNumber,
        invoiceCustomer:this.state.input,
        invoiceCustomerId:(this.state.input===this.state.step1Data.invoiceCustomer)
        ?this.state.step1Data.invoiceCustomerId:'',
        invoiceRows:this.state.step1Data.invoiceRows,
        address:this.state.step2Data.address,
        postType:this.state.step2Data.postType,
        deliveryDate:this.state.step2Data.deliveryDate,
        totalPrice:total,
      }
      this.props.dispatch(addInvoiceRequest(invoice)).then(res=>{
        this.setState({
          // open: true ,
          // messageType:'suc',
          // message:'فاکتور با موفقیت اضافه شد',
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
                    {/* <Button  color="primary" className={classes.button} onClick={this.handleNext}>
                        {activeStep === steps.length - 1 ? 'ذخیره' : 'مرحله بعد'}
                    </Button> */}

                             <div className={classes.wrapper}>
                              <Button
                                variant="contained"
                                // color="primary"
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
  };
}
NewInvoiceStepper.propTypes = {
  classes: PropTypes.object,
  isLoading:PropTypes.bool,
};

export default connect(mapStateToProps)(withStyles(styles)(NewInvoiceStepper));