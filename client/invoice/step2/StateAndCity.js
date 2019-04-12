import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid'
import CardHeader from '@material-ui/core/CardHeader';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {iranStates} from '../api-invoice';
import Select from '@material-ui/core/Select';
const styles = theme => ({
  root:{
    width: '60%',
  },
  formControl: {    
    minWidth: 100,
  },

})
class StateAndCity extends PureComponent {
  state={
    iranStates:[],
    states:[],
    selectedState:'',
    selectedCity:'',
    cities:[],
  }
  componentDidMount = () => {
    iranStates().then((data) => {
      this.setState({iranStates:data.iranStates,states:Object.keys(data.iranStates)})
        if (this.props.step2.address.state!=='' && this.props.step2.address.city!=='') {
          this.setState({ selectedState: this.props.step2.address.state });
          this.setState({cities: Object.values(this.state.iranStates[this.props.step2.address.state])});
          this.setState({ selectedCity: this.props.step2.address.city });
        }
  })
  }
  handleStateChange = name => event => {
    const value=event.target.value;
    this.setState({ [name]: value });
    this.setState({cities: Object.values(this.state.iranStates[value])});
    this.props.stateChange(value);
  };
  handleCityChange = name => event => {
    const value=event.target.value;
    this.setState({ [name]: value });
    this.props.cityChange(value);
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
                                value={this.state.selectedState}
                                onChange={this.handleStateChange('selectedState')}
                                inputProps={{
                                  name: 'selectedState',
                                  id: 'product-native-simple',
                                }}
                              >
                                <option value="" />
                                {this.state.states.map(state => (
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
                                value={this.state.selectedCity}
                                onChange={this.handleCityChange('selectedCity')}
                                inputProps={{
                                  name: 'selectedCity',
                                  id: 'product-native-simple',
                                }}
                              >
                                <option value="" />
                                {this.state.cities.map(city => (
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

StateAndCity.propTypes = {
  classes: PropTypes.object.isRequired,
  iranStates:PropTypes.array,
  stateChange: PropTypes.func.isRequired,
  cityChange: PropTypes.func.isRequired,
  step2:PropTypes.object.isRequired,
}

export default withStyles(styles)(StateAndCity)
