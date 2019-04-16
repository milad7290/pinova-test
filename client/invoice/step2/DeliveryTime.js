import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { updateDeliveryAmount, updateDeliveryTime } from "./step2Actions";
import { getDeliveryAmount, getDeliveryTime } from "./step2Reducer";
const styles = theme => ({
  root: {
    width: "60%"
  },
  formControl: {
    minWidth: 100
  }
});

class DeliveryTime extends PureComponent {
  state = {
    timeTypes: ["ساعت", "روز", "ماه"]
  };

  handleChange = name => event => {
    const value = event.target.value;
    switch (name) {
      case "selectedTime":
        this.props.dispatch(updateDeliveryTime(value));
        break;
      case "amount":
        this.props.dispatch(updateDeliveryAmount(value));
        break;
      default:
        break;
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader title="تاریخ تحویل" />
        <CardContent>
          <div className={classes.root}>
            <Grid container spacing={24}>
              <Grid item xs={6} sm={6}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="amount"
                  label=""
                  type="text"
                  value={this.props.deliveryAmount}
                  onChange={this.handleChange("amount")}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="product-native-simple" />
                  <Select
                    native
                    value={this.props.deliveryTime}
                    onChange={this.handleChange("selectedTime")}
                    inputProps={{
                      name: "selectedTime",
                      id: "product-native-simple"
                    }}
                  >
                    <option value="" />
                    {this.state.timeTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <span>بعد از تاریخ ثبت سفارش</span>
              </Grid>
            </Grid>
          </div>
          <div />
        </CardContent>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    deliveryAmount: getDeliveryAmount(state),
    deliveryTime: getDeliveryTime(state)
  };
}

DeliveryTime.propTypes = {
  classes: PropTypes.object.isRequired,
  deliveryAmount: PropTypes.string,
  deliveryTime: PropTypes.string
};

export default connect(mapStateToProps)(withStyles(styles)(DeliveryTime));
