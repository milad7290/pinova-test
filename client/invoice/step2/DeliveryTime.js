import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Card from 'material-ui/Card';
import CardContent from 'material-ui/Card/CardContent';
import Grid from 'material-ui/Grid'
import CardHeader from 'material-ui/Card/CardHeader';
import FormControl from 'material-ui/Form/FormControl';
import InputLabel from 'material-ui/Input/InputLabel';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
const styles = theme => ({
  root:{
    width: '60%',
  },
  formControl: {    
    minWidth: 100,
  },
})
class DeliveryTime extends Component {
  state={
    amount:'',
    selectedTime:'',
    timeTypes:['ساعت','روز','ماه'],
  }
  componentDidMount = () => {
    if (this.props.step2.deliveryDate!=='') {
    this.setState({ amount: this.props.step2.deliveryDate.timeAmount,selectedTime: this.props.step2.deliveryDate.timeType })      
    }
  }
  handleChange = name => event => {
    const value = event.target.value
    this.setState({ [name]: value })
    switch (name) {
      case 'selectedTime':
      this.props.timeTypeChange(value);            
        break;
        case 'amount':
        this.props.timeAmountChange(value);
        break;
      default:
        break;
    }

  }
  render() {
    const {classes} = this.props
    return (
       <Card className={classes.card}>
         <CardHeader
          title="تاریخ تحویب"          
        />
        <CardContent>
        <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={6} sm={6}>
          <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="amount"
                                label="amount"                                
                                type="text"                                
                                value={this.state.amount} 
                                onChange={this.handleChange('amount')}
                                />
          </Grid>
          <Grid item xs={6} sm={6}>
                      <FormControl className={classes.formControl}>
                              <InputLabel htmlFor="product-native-simple"></InputLabel>
                              <Select
                                native
                                value={this.state.selectedTime}
                                onChange={this.handleChange('selectedTime')}
                                inputProps={{
                                  name: 'selectedTime',
                                  id: 'product-native-simple',
                                }}
                              >
                                <option value="" />
                                {this.state.timeTypes.map(type => (
                                      <option key={type} value={type} >
                                        {type}
                                      </option>
                                 ))}
                              </Select>
                              
                            </FormControl><span>بعد از تاریخ ثبت سفارش</span>
          </Grid>
        </Grid>
      </div>
      <div >
      </div>
        </CardContent>
    </Card>
    )
  }
}

DeliveryTime.propTypes = {
  classes: PropTypes.object.isRequired,
  timeTypeChange: PropTypes.func.isRequired,
  timeAmountChange: PropTypes.func.isRequired,
  step2:PropTypes.object.isRequired,
}

export default withStyles(styles)(DeliveryTime)
