import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { setFilterType } from "../redux/invoiceActions";
import { getFilterType } from "../redux/invoiceReducer";
const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  },
  box: {
    margin: theme.spacing.unit
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

class FilterType extends React.Component {
  state = {
    filterType: 'factorItems',
  };
  handleChange = event => {
    const value = event.target.value;
    this.setState({ filterType:value });
    this.props.setFilterType(value,'filterType');
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography color="inherit" noWrap>
          نوع فاکتور
        </Typography>
        <div>
          <FormControl component="fieldset" className={classes.container}>
            <FormLabel component="legend" />
            <RadioGroup
              aria-label=""
              name="gender1"
              className={classes.group}
              value={this.state.filterType}
              onChange={this.handleChange}
            >
              <FormControlLabel
                value="factorItems"
                control={<Radio />}
                label="آیتم های فاکتور"
              />
              <FormControlLabel
                value="factor"
                control={<Radio />}
                label="فاکتور"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     filterType: getFilterType(state)
//   };
// }

FilterType.propTypes = {
  classes: PropTypes.object.isRequired,
  setFilterType:PropTypes.func.isRequired,
};

export default withStyles(styles)(FilterType);
