import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { setFilterType } from '../../invoice/invoiceActions';
import { getFilterType } from '../../invoice/invoiceReducer';
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
  handleChange = event => {
    const value=event.target.value;
    this.props.dispatch(setFilterType(value));
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
                            value={this.props.filterType}
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
function mapStateToProps(state) {
  return {
    filterType: getFilterType(state),
  };
}
FilterType.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps) (withStyles(styles)(FilterType))