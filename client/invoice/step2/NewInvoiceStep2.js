import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import StateAndCity from './StateAndCity'
import PostType from './PostType'
import DeliveryTime from './DeliveryTime'
const styles = theme => ({

})
class NewInvoiceStep2 extends Component {
  componentDidMount = () => {
 
  }
  render() {
    const {classes} = this.props
    return (
<div>
          <div>
          <StateAndCity stateChange={this.props.updateState} cityChange={this.props.updateCity} step2={this.props.step2Data}/>    
          </div>
     
          <div>
          <PostType postTypeChange={this.props.updatePostType} step2={this.props.step2Data}/>    
          </div>

          <div>
          <DeliveryTime  timeTypeChange={this.props.updateTimeType} timeAmountChange={this.props.updateTimeAmount} step2={this.props.step2Data}/>
          </div>
</div>
    )
  }
}

NewInvoiceStep2.propTypes = {
  classes: PropTypes.object.isRequired,
  step2Data:PropTypes.object.isRequired,
  updateState:PropTypes.func.isRequired,
  updateCity:PropTypes.func.isRequired,
  updatePostType:PropTypes.func.isRequired,
  updateTimeType:PropTypes.func.isRequired,
  updateTimeAmount:PropTypes.func.isRequired,
}

export default withStyles(styles)(NewInvoiceStep2)
