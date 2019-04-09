import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
const styles = theme => ({
  root: {
    margin:theme.spacing.unit
  },
  box:{
    margin:theme.spacing.unit
 },
container: {
display: 'flex',
flexWrap: 'wrap',
},
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class FilterType extends React.Component {
  state = {
    value: 'factorItems',
  };
  handleChange = event => {
    this.setState({ value: event.target.value });
    this.props.filterTypeChange(event.target.value ,'filterType');
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
         <Typography  color="inherit" noWrap>
         نوع فاکتور
         </Typography>
                <div>
                <FormControl component="fieldset"  className={classes.container}>
                          <FormLabel component="legend"></FormLabel>
                          <RadioGroup
                            aria-label=""
                            name="gender1"
                            className={classes.group}
                            value={this.state.value}
                            onChange={this.handleChange}
                          >
                          <FormControlLabel value="factorItems" control={<Radio />} label="آیتم های فاکتور" />
                          <FormControlLabel value="factor" control={<Radio />} label="فاکتور" />
                          </RadioGroup>
                        </FormControl>
                </div>
      </div>
    );
  }
}
FilterType.propTypes = {
  classes: PropTypes.object.isRequired,
  filterTypeChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(FilterType)