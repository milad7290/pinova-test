import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Stepper from 'material-ui/Stepper';
import Step from 'material-ui/Stepper/Step';
import StepLabel from 'material-ui/Stepper/StepLabel';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import NewInvoiceStep1 from './step1/NewInvoiceStep1';
import NewInvoiceStep2 from './step2/NewInvoiceStep2';
import { Redirect } from 'react-router-dom'
import SimpleSnackbar from '../helper/SimpleSnackbar'
import { connect } from 'react-redux';
import {getNextInvoiceNumber} from './api-invoice'
import { addInvoiceRequest } from '../invoice/invoiceActions';
const styles = theme => ({
  root: {
    direction: 'initial',
  },
  stepper:{
  },
  actions:{
    float:'left',
    margin:20
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
    warningMessage:''
    // ,step2:'اطلاعات مربوط به مرحله ی دوم را تکمیل کنید'
  };
  componentDidMount = () => {
    getNextInvoiceNumber().then((data) => {
      this.setState(
        {step1Data: {invoiceNumber: data.order,invoiceCustomer:'',invoiceRows:[]},
        step2Data:{address:{state:'',city:''},postType:'',deliveryDate:{timeAmount:0,timeType:''}}
      })
    })
  }
 getStepContent=(stepIndex) =>{
    switch (stepIndex) {
      case 0:
        return (<NewInvoiceStep1 step1Data={this.state.step1Data}/>);
      case 1:
      return (<NewInvoiceStep2 step2Data={this.state.step2Data}/>);
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
  const total= this.checkForRows();
  switch (this.state.activeStep) {
    case 0:
     if (this.state.step1Data.invoiceCustomer===''||this.state.step1Data.invoiceRows.length===0 ) {
      this.setState(
        { open: true ,
          warningMessage:(this.state.step1Data.invoiceCustomer==='')
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
          warningMessage:(this.state.step2Data.address.state==='')
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
        invoiceCustomer:this.state.step1Data.invoiceCustomer,
        invoiceCustomerId:this.state.step1Data.invoiceCustomerId,
        invoiceRows:this.state.step1Data.invoiceRows,
        address:this.state.step2Data.address,
        postType:this.state.step2Data.postType,
        deliveryDate:this.state.step2Data.deliveryDate,
        totalPrice:total,
      }
      this.props.dispatch(addInvoiceRequest(invoice))
      this.setState({redirect:true})
    } else{
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
          {this.state.activeStep === steps.length ? (
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
                    <Button  color="primary" className={classes.button} onClick={this.handleNext}>
                        {activeStep === steps.length - 1 ? 'ذخیره' : 'مرحله بعد'}
                    </Button>
                    </div> 
            </div>           
          )}
        </div>
        <SimpleSnackbar open={this.state.open} close={this.handleClose}
         message={this.state.warningMessage}/>
      </div>
    );
  }
}

NewInvoiceStepper.propTypes = {
  classes: PropTypes.object,
};

export default connect()(withStyles(styles)(NewInvoiceStepper));