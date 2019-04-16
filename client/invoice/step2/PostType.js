import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { connect } from "react-redux";
import { updatePostType } from "./redux/step2Actions";
import { getPostType } from "./redux/step2Reducer";
const styles = theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

class PostType extends React.PureComponent {

  handleChange = event => {
    const value = event.target.value;
    this.props.updatePostType(value);
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader title="نوع پست" />
        <CardContent>
          <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend" />
              <RadioGroup
                aria-label=""
                name="gender1"
                className={classes.group}
                value={this.props.postType}
                onChange={this.handleChange}
                row
              >
                <FormControlLabel
                  value="normal"
                  control={<Radio />}
                  label="عادی"
                />
                <FormControlLabel
                  value="pishtaz"
                  control={<Radio />}
                  label="پیشتاز"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div />
        </CardContent>
      </Card>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     postType: getPostType(state)
//   };
// }

PostType.propTypes = {
  classes: PropTypes.object.isRequired,
  postType: PropTypes.string.isRequired,
  updatePostType:PropTypes.func.isRequired,
};

export default withStyles(styles)(PostType);
