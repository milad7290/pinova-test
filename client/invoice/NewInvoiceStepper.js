import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import NewInvoiceStep1 from "./step1/NewInvoiceStep1";
import NewInvoiceStep2 from "./step2/NewInvoiceStep2";
import { Redirect } from "react-router-dom";
import SimpleSnackbar from "../helper/SimpleSnackbar";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";
import classNames from "classnames";

import {addInvoiceRequest} from "./redux/invoiceActions";
import { getInvoiceLoading } from "./redux/invoiceSelector";

import {
  updateCustomer,
  updateCustomerId,
  updateRow,
  fetchNextInvoiceNumber
} from "./step1/redux/step1Actions";
import {
  getRows,
  getCustomer,
  getCustomerId,
  getInvoiceNumber,
} from "./step1/redux/step1Selector";

import {
  updateDeliveryAmount,
  updateDeliveryTime,
  updatePostType,
  updateSelectedCity,
  updateSelectedState,
  fetchIranStates
} from "./step2/redux/step2Actions";
import {
  getDeliveryAmount,
  getDeliveryTime,
  getPostType,
  getCities,
  getStates,
  getSelectedCity,
  getSelectedState
} from "./step2/redux/step2Selector";

import { fetchCustomers } from "../customer/redux/customerActions";
import { getCustomers } from "../customer/redux/customerSelector";

import {
  fetchProducts,
  addProductRequest
} from "../product/redux/productActions";
import {
  getProductLoading,
  getProducts
} from "../product/redux/productSelector";

import { showSnack, hideSnack } from "../helper/redux/helperActions";
import { getSnackInfo } from "../helper/redux/helperSelector";

const styles = theme => ({
  root: {
    direction: "initial"
  },

  stepper: {},
  actions: {
    float: "left",
    margin: 20,
    display: "flex"
  },

  backButton: {
    marginRight: theme.spacing.unit
  },

  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },

  button: {
    backgroundColor: "#3f51b5",
    color: "black"
  },

  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },

  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },

  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

function getSteps() {
  return ["تکمیل اطلاعات اولیه", "تاریخ تحویل"];
}

class NewInvoiceStepper extends React.Component {
  state = {
    activeStep: 0
  };
  componentDidMount = () => {
    this.props.fetchIranStates();
    const step = this.state.activeStep;
    window.onpopstate = event => {
      if (this.state.activeStep === 1) {
        // this.props.setStepperStep(step - 1);
        this.setState({
          activeStep: step - 1
        });
      }
    };
    this.props.fetchNextInvoiceNumber();
  };

  getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return (
          <NewInvoiceStep1
            customers={this.props.customers}
            invoiceCustomer={this.props.invoiceCustomer}
            invoiceNumber={this.props.invoiceNumber}
            fetchCustomers={this.props.fetchCustomers}
            updateCustomer={this.props.updateCustomer}
            updateCustomerId={this.props.updateCustomerId}
            products={this.props.products}
            invoiceRows={this.props.invoiceRows}
            fetchProducts={this.props.fetchProducts}
            updateRow={this.props.updateRow}
            showSnack={this.props.showSnack}
            addProductRequest={this.props.addProductRequest}
            hideSnack={this.props.hideSnack}
            isLoadingProduct={this.props.isLoadingProduct}
          />
        );
      case 1:
        return (
          <NewInvoiceStep2
            states={this.props.states}
            cities={this.props.cities}
            selectedCity={this.props.selectedCity}
            selectedState={this.props.selectedState}
            updateSelectedState={this.props.updateSelectedState}
            updateSelectedCity={this.props.updateSelectedCity}
            postType={this.props.postType}
            updatePostType={this.props.updatePostType}
            deliveryAmount={this.props.deliveryAmount}
            deliveryTime={this.props.deliveryTime}
            updateDeliveryTime={this.props.updateDeliveryTime}
            updateDeliveryAmount={this.props.updateDeliveryAmount}
          />
        );
      default:
        return "Unknown stepIndex"; //TODO handle react error throw new Error('')
    }
  };

  checkForRows = () => {
    let total = 0;
    let checkedRows;
    if (this.props.invoiceRows.length > 0) {
      checkedRows = this.props.invoiceRows.filter(row => {
        if (row.price) {
          total += row.totalPrice;
          return row;
        }
      });
    }
    return { total, checkedRows };
  };

  handleNext = () => {
    // remove persian charachter from codes
    // TODO remove distapch
    const { total, checkedRows } = this.checkForRows();
    switch (this.state.activeStep) {
      case 0:
        if (checkedRows.length === 0 || this.props.invoiceCustomer === "") {
          const message =
            this.props.invoiceCustomer === ""
              ? "اطلاعات مربوط به نام و نام خانوادگی را تکمیل کنید"
              : "اطلاعات مربوط به فاکتور را تکمیل کنید";
          this.props.showSnack(message, "war");
          return;
        }
        break;
      case 1:
        if (
          this.props.selectedState === "" ||
          this.props.selectedCity === "" ||
          this.props.postType === "" ||
          this.props.deliveryAmount === 0 ||
          this.props.deliveryTime === 0
        ) {
          const message =
            this.props.selectedState === ""
              ? "اطلاعات مربوط به استان را تکمیل کنید"
              : this.props.selectedCity === ""
              ? "اطلاعات مربوط به شهر را تکمیل کنید"
              : this.props.postType === ""
              ? "اطلاعات مربوط به روش پست را تکمیل کنید"
              : "اطلاعات مربوط به تاریخ تحویل را تکمیل کنید";
          this.props.showSnack(message, "war");
          return;
        }
        break;
      default:
        break;
    }
    if (this.state.activeStep === getSteps().length - 1) {
      let invoice = {
        invoiceNumber: this.props.invoiceNumber,
        invoiceCustomer: this.props.invoiceCustomer,
        invoiceCustomerId:
          this.props.invoiceCustomerIdInfo.lable === this.props.invoiceCustomer
            ? this.props.invoiceCustomerIdInfo.invoiceCustomerId
            : "",
        invoiceRows: checkedRows,
        address: {
          state: this.props.selectedState,
          city: this.props.selectedCity
        },
        postType: this.props.postType,
        deliveryDate: {
          timeAmount: this.props.deliveryAmount,
          timeType: this.props.deliveryTime
        },
        totalPrice: total
      };
      this.props.addInvoiceRequest(invoice);
    } else {
      const step = this.state.activeStep;
      history.pushState(null, null, location.href);
      this.setState({
        activeStep: step + 1
      });
    }
  };

  handleBack = () => {
    const step = this.state.activeStep;
    this.setState({
      activeStep: step - 1
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  handleClose = () => {
    this.props.hideSnack();
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
    //TODO remove this line
    const buttonClassname = classNames({
      [classes.buttonSuccess]: false
    });
    const steps = getSteps(); // TODO this is wrong why?
    if (this.state.redirect) {
      return <Redirect to={"/"} />;
    }
    return (
      <div>
        <Stepper
          className={classes.root}
          activeStep={activeStep}
          alternativeLabel
        >
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                مراحل تکمیل شد
              </Typography>
            </div>
          ) : (
            <div>
              <div>{this.getStepContent(activeStep)}</div>
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
                    disabled={this.props.isLoadingInvoice}
                    onClick={this.handleNext}
                  >
                    {activeStep === steps.length - 1 ? "ذخیره" : "مرحله بعد"}
                  </Button>
                  {this.props.isLoadingInvoice && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <SimpleSnackbar
          open={this.props.snackInfo.open}
          close={this.handleClose}
          message={this.props.snackInfo.message}
          messageType={this.props.snackInfo.type}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoadingInvoice: getInvoiceLoading(state),
    isLoadingProduct: getProductLoading(state),
    invoiceRows: getRows(state),
    invoiceCustomer: getCustomer(state),
    invoiceCustomerIdInfo: getCustomerId(state),
    invoiceNumber: getInvoiceNumber(state),
    snackInfo: getSnackInfo(state),

    customers: getCustomers(state),

    products: getProducts(state) ? getProducts(state) : [],

    deliveryAmount: getDeliveryAmount(state),
    deliveryTime: getDeliveryTime(state),

    postType: getPostType(state),

    states: getStates(state),
    cities: getCities(state),
    selectedCity: getSelectedCity(state),
    selectedState: getSelectedState(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchIranStates: () => {
      dispatch(fetchIranStates());
    },
    fetchNextInvoiceNumber: () => {
      dispatch(fetchNextInvoiceNumber());
    },
    addInvoiceRequest: (invoice) => {
      dispatch(addInvoiceRequest(invoice));
    },
    updateCustomerId: (id, lable) => {
      dispatch(updateCustomerId(id, lable));
    },
    updateCustomer: value => {
      dispatch(updateCustomer(value));
    },
    fetchCustomers: value => {
      dispatch(fetchCustomers(value));
    },

    fetchProducts: () => {
      dispatch(fetchProducts());
    },
    updateRow: invoiceRows => {
      dispatch(updateRow(invoiceRows));
    },
    showSnack: (message, messageType) => {
      dispatch(showSnack(message, messageType));
    },
    addProductRequest: product => {
      dispatch(addProductRequest(product));
    },
    hideSnack: () => {
      dispatch(hideSnack());
    },

    updateDeliveryTime: deliveryTime => {
      dispatch(updateDeliveryTime(deliveryTime));
    },
    updateDeliveryAmount: deliveryAmount => {
      dispatch(updateDeliveryAmount(deliveryAmount));
    },

    updatePostType: postType => {
      dispatch(updatePostType(postType));
    },

    updateSelectedState: selectedState => {
      dispatch(updateSelectedState(selectedState));
    },
    updateSelectedCity: selectedCity => {
      dispatch(updateSelectedCity(selectedCity));
    }
  };
};

NewInvoiceStepper.propTypes = {
  classes: PropTypes.object,
  isLoadingInvoice: PropTypes.bool,
  isLoadingProduct: PropTypes.bool,
  invoiceRows: PropTypes.array,
  invoiceNumber: PropTypes.string,
  invoiceCustomer: PropTypes.string,
  invoiceCustomerIdInfo: PropTypes.object,
  snackInfo: PropTypes.object,

  order: PropTypes.string,
  customers: PropTypes.array,
  fetchCustomers: PropTypes.func,
  updateCustomer: PropTypes.func,
  updateCustomerId: PropTypes.func,

  products: PropTypes.array,
  selectedProduct: PropTypes.string,
  fetchProducts: PropTypes.func,
  updateRow: PropTypes.func,
  showSnack: PropTypes.func,
  addProductRequest: PropTypes.func,
  hideSnack: PropTypes.func,

  deliveryAmount: PropTypes.string,
  deliveryTime: PropTypes.string,
  updateDeliveryTime: PropTypes.func,
  updateDeliveryAmount: PropTypes.func,

  postType: PropTypes.string,
  updatePostType: PropTypes.func,

  states: PropTypes.array,
  cities: PropTypes.array,
  selectedCity: PropTypes.string,
  selectedState: PropTypes.string,
  updateSelectedState: PropTypes.func,
  updateSelectedCity: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NewInvoiceStepper));
