import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import StateAndCity from './StateAndCity'
import PostType from './PostType'
import DeliveryTime from './DeliveryTime'
const styles = theme => ({

})
class NewInvoiceStep2 extends Component {
  componentDidMount = () => {
 
  }

  handleStateChange = value => {
    this.props.step2Data.address.state=value;
  };
  handleCityChange = value  => {
    this.props.step2Data.address.city=value;

  };
  handlePostTypeChange = value  => {
    this.props.step2Data.postType=value;

  };
  handleTimeTypeChange = value  => {
    this.props.step2Data.deliveryDate.timeType=value;
  };
  handleTimeAmountChange = value  => {
    this.props.step2Data.deliveryDate.timeAmount=value;
  };
  render() {
    const {classes} = this.props
    return (
<div>
          <div>
          <StateAndCity stateChange={this.handleStateChange} cityChange={this.handleCityChange} step2={this.props.step2Data}/>    
          </div>
     
          <div>
          <PostType postTypeChange={this.handlePostTypeChange} step2={this.props.step2Data}/>    
          </div>

          <div>
          <DeliveryTime  timeTypeChange={this.handleTimeTypeChange} timeAmountChange={this.handleTimeAmountChange} step2={this.props.step2Data}/>
          </div>
</div>
    )
  }
}

NewInvoiceStep2.propTypes = {
  classes: PropTypes.object.isRequired,
  step2Data:PropTypes.object.isRequired

}

export default withStyles(styles)(NewInvoiceStep2)
