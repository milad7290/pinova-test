import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { DateTimeRangePicker} from "react-advance-jalaali-datepicker";
const styles = theme => ({
    box:{
        margin:theme.spacing.unit
     },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class TimeFilterV2 extends React.Component{
    change(unix, formatted){
      console.log(unix) // returns timestamp of the selected value, for example.
          console.log(formatted) // returns the selected value in the format you've entered, forexample, "تاریخ: 1396/02/24 ساعت: 18:30".
     }
     changeTimeDate(unix, formatted){
      console.log(unix) // returns timestamp of the selected value, for example.
          console.log(formatted) // returns the selected value in the format you've entered, forexample, "تاریخ: 1396/02/24 ساعت: 18:30".
     }
   render() {
   const { classes } = this.props;
   return (
        <div className={classes.box}>
                <Typography  color="inherit" noWrap>
                بازه زمانی
                </Typography>
               
                <DateTimeRangePicker
                placeholderStart="تاریخ و ساعت شروع"
                placeholderEnd="تاریخ و ساعت پایان"
                format="تاریخ: jYYYY/jMM/jDD ساعت: HH:mm"
                onChangeStart={this.change}
                onChangeEnd={this.changeTimeDate}
                idStart="rangePickerStart"
                idEnd="rangePickerEnd" />
        </div>
        );
      }
          }
TimeFilterV2.propTypes = {
  classes: PropTypes.object.isRequired,
  filterTimeChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(TimeFilterV2);