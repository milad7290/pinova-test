import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Card from 'material-ui/Card';
import CardContent from 'material-ui/Card/CardContent';
import Grid from 'material-ui/Grid'
import IntegrationAutosuggest from '../../customer/IntegrationAutosuggest'
import IntegrationAutosuggestV2 from '../../customer/IntegrationAutosuggestV2'
import InvoiceItems from './InvoiceItems'
import  moment from 'moment-jalaali';
import {persianNumber} from '../../helper/persianNumber'
const styles = theme => ({

})
class NewInvoiceStep1 extends Component {
  state={
    now :(new Date()).toDateString(),
  }

  getAutosuggestInput= (value,id) => {
    console.log('value',value,'id',id);
    this.props.step1Data.invoiceCustomer=value;
    this.props.step1Data.invoiceCustomerId=id;
   }
   getTableData= (value) => {
    this.props.step1Data.invoiceRows=value;
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
      <IntegrationAutosuggest   getInputData={this.getAutosuggestInput} customer={this.props.step1Data.invoiceCustomer}/>
      {/* <IntegrationAutosuggestV2   getInputData={this.getAutosuggestInput} customer={this.props.step1Data.invoiceCustomer}/> */}
      </div>
          <div>
          <InvoiceItems   updateTableDate={this.getTableData} rows={this.props.step1Data.invoiceRows}/>
          </div>
       
        </CardContent>
    </Card>
    )
  }
}
NewInvoiceStep1.propTypes = {
  classes: PropTypes.object.isRequired,
  step1Data:PropTypes.object.isRequired
}

export default withStyles(styles)(NewInvoiceStep1)
