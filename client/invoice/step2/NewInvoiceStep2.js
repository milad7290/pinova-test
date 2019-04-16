import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import StateAndCity from "./StateAndCity";
import PostType from "./PostType";
import DeliveryTime from "./DeliveryTime";
const styles = theme => ({});
class NewInvoiceStep2 extends PureComponent {
  componentDidMount = () => {};
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <StateAndCity
            states={this.props.states}
            cities={this.props.cities}
            selectedCity={this.props.selectedCity}
            selectedState={this.props.selectedState}
            updateSelectedState={this.props.updateSelectedState}
            updateSelectedCity={this.props.updateSelectedCity}
          />
        </div>

        <div>
          <PostType
            postType={this.props.postType}
            updatePostType={this.props.updatePostType}
          />
        </div>

        <div>
          <DeliveryTime
            deliveryAmount={this.props.deliveryAmount}
            deliveryTime={this.props.deliveryTime}
            updateDeliveryTime={this.props.updateDeliveryTime}
            updateDeliveryAmount={this.props.updateDeliveryAmount}
          />
        </div>
      </div>
    );
  }
}

NewInvoiceStep2.propTypes = {
  classes: PropTypes.object.isRequired,

  deliveryAmount: PropTypes.string.isRequired,
  deliveryTime: PropTypes.string.isRequired,
  updateDeliveryTime: PropTypes.func.isRequired,
  updateDeliveryAmount: PropTypes.func.isRequired,

  postType: PropTypes.string.isRequired,
  updatePostType: PropTypes.func.isRequired,

  states: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
  selectedCity: PropTypes.string.isRequired,
  selectedState: PropTypes.string.isRequired,
  updateSelectedState: PropTypes.func.isRequired,
  updateSelectedCity: PropTypes.func.isRequired
};

export default withStyles(styles)(NewInvoiceStep2);
