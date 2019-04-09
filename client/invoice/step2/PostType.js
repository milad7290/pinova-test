import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class PostType extends React.Component {
  state = {
    value: 'normal',
  };
  componentDidMount = () => {
    this.setState({ value: this.props.step2.postType});
  }
  handleChange = event => {
    this.setState({ value: event.target.value });
    this.props.postTypeChange(event.target.value );
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
      <CardHeader
       title="نوع پست"          
     />
     <CardContent>
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend"></FormLabel>
          <RadioGroup
            aria-label=""
            name="gender1"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
            row
          >
           <FormControlLabel value="normal" control={<Radio />} label="عادی" />
           <FormControlLabel value="pishtaz" control={<Radio />} label="پیشتاز" />
          </RadioGroup>
        </FormControl>
      </div>
      <div >
      </div>
        </CardContent>
    </Card>
    );
  }
}
PostType.propTypes = {
  classes: PropTypes.object.isRequired,
  postTypeChange: PropTypes.func.isRequired,
  step2:PropTypes.object.isRequired,
}

export default withStyles(styles)(PostType)