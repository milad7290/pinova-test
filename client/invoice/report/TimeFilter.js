import React , { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import  jmoment from 'moment-jalaali';
import moment from "moment";
import JalaliUtils from "@date-io/jalaali";
import {
  TimePicker,
  DateTimePicker,
  DatePicker,
  MuiPickersUtilsProvider,
} from "material-ui-pickers";
// const [selectedDate, handleDateChange] = useState(moment());

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

class TimeFilter extends React.Component{
  state = {
    fromDate:moment(),
    toDate:moment()
  };
  componentDidMount = () => {
    jmoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });
  }
    handleChange = name => event => {
      if (event) {
              console.log('event.target.value',event._d,name);
        const value = event._d
        this.setState({ [name]: value })
        this.props.filterTimeChange(new Date(event._d) ,name);
      }
      }
   render() {
   const { classes } = this.props;

   return (
        <div className={classes.box}>
                <Typography  color="inherit" noWrap>
                بازه زمانی
                </Typography>
                <form className={classes.container} noValidate>
                     <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
                        <div className="picker">
                          <DatePicker
                            clearable
                            okLabel="تأیید"
                            cancelLabel="لغو"
                            clearLabel="پاک کردن"
                            labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                            value={this.state.fromDate}
                            onChange={this.handleChange('fromDate')}
                            animateYearScrolling={false}
                          />
                        </div>

                      </MuiPickersUtilsProvider>

                      <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
                        <div className="picker">
                          <DatePicker
                            clearable
                            okLabel="تأیید"
                            cancelLabel="لغو"
                            clearLabel="پاک کردن"
                            labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                            value={this.state.toDate}
                            onChange={this.handleChange('toDate')}
                            animateYearScrolling={false}
                          />
                        </div>

                      </MuiPickersUtilsProvider>

                     {/* <TextField
                      id="date"
                      label="از تاریخ"
                      type="date"
                      defaultValue="2017-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={this.handleChange('fromDate')}
                    />
                       <TextField
                      id="date"
                      label="تا تاریخ"
                      type="date"
                      defaultValue={moment(new Date()).format('YYYY-MM-DD')}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={this.handleChange('toDate')}
                    /> */}
                </form>
        </div>
  );
}
    }
TimeFilter.propTypes = {
  classes: PropTypes.object.isRequired,
  filterTimeChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(TimeFilter);