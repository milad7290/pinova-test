import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid'
import IntegrationAutosuggest from '../../customer/IntegrationAutosuggest'
import InvoiceItems from './InvoiceItems'
import  moment from 'moment-jalaali';
const styles = theme => ({

})
class NewInvoiceStep1 extends Component {
  state={
    now :(new Date()).toDateString(),
  }
  render() {
    const {classes} = this.props
    return (
     <Card className={classes.card}>
        <CardContent>
        <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={6} sm={6}>
        <span>شماره فاکتور: </span> { this.props.step1Data.invoiceNumber} 
          </Grid>
          <Grid item xs={6} sm={6}>
          <span>تاریخ امروز: </span>  { moment(this.state.now).format('jYYYY/jM/jD')}
          </Grid>
        </Grid>
      </div>
      <br/>
      <div >
      <IntegrationAutosuggest   getInputData={this.props.updateCustomer} customer={this.props.step1Data.invoiceCustomer}/>
      </div>
          <div>
          <InvoiceItems   updateTableDate={this.props.updateRows} rows={this.props.step1Data.invoiceRows}/>
          </div>
       
        </CardContent>
    </Card>
    )
  }
}
NewInvoiceStep1.propTypes = {
  classes: PropTypes.object.isRequired,
  step1Data:PropTypes.object.isRequired,
  updateCustomer:PropTypes.func.isRequired,
  updateRows:PropTypes.func.isRequired,
}

export default withStyles(styles)(NewInvoiceStep1)
