import React  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import  jmoment from 'moment-jalaali';
import JalaliUtils from "@date-io/jalaali";
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from "material-ui-pickers";
import { connect } from 'react-redux';
import { setDate } from '../../invoice/invoiceActions';
import { getFromDate,getToDate } from '../../invoice/invoiceReducer';

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
  componentDidMount = () => {
    jmoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });
  }
    handleChange = name => event => {
      if (event) {
        const value = event._d
        this.props.dispatch(setDate(new Date(event._d) ,name));
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
                            value={this.props.fromDate}
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
                            value={this.props.toDate}
                            onChange={this.handleChange('toDate')}
                            animateYearScrolling={false}
                          />
                        </div>

                      </MuiPickersUtilsProvider>
                </form>
        </div>
  );
}
    }

    function mapStateToProps(state) {
      return {
        fromDate: getFromDate(state),
        toDate: getToDate(state),
      };
    }
TimeFilter.propTypes = {
  classes: PropTypes.object.isRequired,
  // fromDate: PropTypes.instanceOf(Date),
  // toDate: PropTypes.instanceOf(Date),
  classes: PropTypes.object.isRequired,
};

export default  connect(mapStateToProps) (withStyles(styles)(TimeFilter));