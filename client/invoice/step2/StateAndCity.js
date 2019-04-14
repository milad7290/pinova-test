import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid'
import CardHeader from '@material-ui/core/CardHeader';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { 
   
   updateSelectedState,
   updateSelectedCity} from './step2Actions';
import { 
  getStates,
  getCities,
  getSelectedCity,
  getSelectedState } from './step2Reducer';
const styles = theme => ({
  root:{
    width: '60%',
  },
  formControl: {    
    minWidth: 100,
  },

})
class StateAndCity extends PureComponent {

  handleStateChange = name => event => {
    const value=event.target.value;
    this.props.dispatch(updateSelectedState(value))
  };
  handleCityChange = name => event => {
    const value=event.target.value;
    this.props.dispatch(updateSelectedCity(value))
  };
  render() {
    const {classes} = this.props
    return (
       <Card className={classes.card}>
         <CardHeader
          title="شهر استان"          
        />
        <CardContent>
        <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={6} sm={6}>
                      <span>استان</span>
                      <FormControl className={classes.formControl}>
                              <InputLabel htmlFor="product-native-simple"></InputLabel>
                              <Select
                                native
                                value={this.props.selectedState}
                                onChange={this.handleStateChange('selectedState')}
                                inputProps={{
                                  name: 'selectedState',
                                  id: 'product-native-simple',
                                }}
                              >
                                <option value="" />
                                {this.props.states.map(state => (
                                      <option key={state} value={state} >
                                        {state}
                                      </option>
                                 ))}
                              </Select>
                            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
          <span>شهر</span>
          <FormControl className={classes.formControl}>
                              <InputLabel htmlFor="product-native-simple"></InputLabel>
                              <Select
                                native
                                value={this.props.selectedCity}
                                onChange={this.handleCityChange('selectedCity')}
                                inputProps={{
                                  name: 'selectedCity',
                                  id: 'product-native-simple',
                                }}
                              >
                                <option value="" />
                                {this.props.cities.map(city => (
                                      <option key={city} value={city} >
                                        {city}
                                      </option>
                                 ))}
                              </Select>
                            </FormControl>
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
function mapStateToProps(state) {
  return {
    states: getStates(state),
    cities: getCities(state),
    selectedCity: getSelectedCity(state),
    selectedState: getSelectedState(state),
  };
}
StateAndCity.propTypes = {
  classes: PropTypes.object.isRequired,
  states:PropTypes.array,
  cities:PropTypes.array,
  selectedCity: PropTypes.string,
  selectedState: PropTypes.string,
}

export default connect(mapStateToProps)(withStyles(styles)(StateAndCity))
