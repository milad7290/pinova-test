import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import StateAndCity from "./StateAndCity";
import PostType from "./PostType";
import DeliveryTime from "./DeliveryTime";
const styles = theme => ({});
class NewInvoiceStep2 extends Component {
  componentDidMount = () => {};
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <StateAndCity />
        </div>

        <div>
          <PostType />
        </div>

        <div>
          <DeliveryTime />
        </div>
      </div>
    );
  }
}

NewInvoiceStep2.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewInvoiceStep2);
