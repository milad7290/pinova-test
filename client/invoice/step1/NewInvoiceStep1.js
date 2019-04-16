import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import IntegrationAutosuggest from "../../customer/IntegrationAutosuggest";
import InvoiceItems from "../invoiceItems/InvoiceItems";
import moment from "moment-jalaali";
import { connect } from "react-redux";
import { getInvoiceNumber } from "./step1Reducer";
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
                <span>شماره فاکتور: </span> {this.props.order}
              </Grid>
              <Grid item xs={6} sm={6}>
                <span>تاریخ امروز: </span>{" "}
                {moment(this.state.now).format("jYYYY/jM/jD")}
              </Grid>
            </Grid>
          </div>
          <br />
          <div>
            <IntegrationAutosuggest />
          </div>
          <div>
            <InvoiceItems />
          </div>
        </CardContent>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    order: getInvoiceNumber(state)
  };
}

NewInvoiceStep1.propTypes = {
  classes: PropTypes.object.isRequired,
  order: PropTypes.string
};

export default connect(mapStateToProps)(withStyles(styles)(NewInvoiceStep1));
