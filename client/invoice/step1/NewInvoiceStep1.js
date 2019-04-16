import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import IntegrationAutosuggest from "../../customer/IntegrationAutosuggest";
import InvoiceItems from "../invoiceItems/InvoiceItems";
import moment from "moment-jalaali";
import {getFarsi} from '../../helper/farsi'
import { connect } from "react-redux";
import { getInvoiceNumber } from "./redux/step1Reducer";
const styles = theme => ({});
class NewInvoiceStep1 extends React.PureComponent {
  state = {
    now: new Date().toDateString()
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.root}>
            <Grid container spacing={24}>
              <Grid item xs={6} sm={6}>
                <span>{getFarsi('INVOICE_NUMBER')} </span> {this.props.invoiceNumber}
              </Grid>
              <Grid item xs={6} sm={6}>
                <span>تاریخ امروز: </span>{" "}
                {moment(this.state.now).format("jYYYY/jM/jD")}
              </Grid>
            </Grid>
          </div>
          <br />
          <div>
            <IntegrationAutosuggest
              customers={this.props.customers}
              invoiceCustomer={this.props.invoiceCustomer}
              fetchCustomers={this.props.fetchCustomers}
              updateCustomer={this.props.updateCustomer}
              updateCustomerId={this.props.updateCustomerId}
            />
          </div>
          <div>
            <InvoiceItems
              products={this.props.products}
              invoiceRows={this.props.invoiceRows}
              fetchProducts={this.props.fetchProducts}
              updateRow={this.props.updateRow}
              showSnack={this.props.showSnack}
              addProductRequest={this.props.addProductRequest}
              hideSnack={this.props.hideSnack}
              isLoadingProduct={this.props.isLoadingProduct}
            />
          </div>
        </CardContent>
      </Card>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     order: getInvoiceNumber(state)
//   };
// }

NewInvoiceStep1.propTypes = {
  classes: PropTypes.object.isRequired,

  invoiceNumber: PropTypes.string.isRequired,
  customers: PropTypes.array.isRequired,
  invoiceCustomer: PropTypes.string.isRequired,
  fetchCustomers: PropTypes.func.isRequired,
  updateCustomer: PropTypes.func.isRequired,
  updateCustomerId: PropTypes.func.isRequired,

  products: PropTypes.array.isRequired,
  invoiceRows: PropTypes.array.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  updateRow: PropTypes.func.isRequired,
  showSnack: PropTypes.func.isRequired,
  addProductRequest: PropTypes.func.isRequired,
  hideSnack: PropTypes.func.isRequired
};

export default withStyles(styles)(NewInvoiceStep1);
