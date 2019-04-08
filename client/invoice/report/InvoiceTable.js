import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table from 'material-ui/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableCell from 'material-ui/Table/TableCell';
import TableHead from 'material-ui/Table/TableHead';
import TableRow from 'material-ui/Table/TableRow';
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper';
import  moment from 'moment-jalaali';
import {persianNumber,numberWithoutCommas} from '../../helper/persianNumber'
const styles = theme => ({
  noItem:{
    flexGrow: 1,
    margin: 30,
    textAlign: 'center',
  },
  root: {
    // width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign:'center'
  },
  body: {
    fontSize: 14,
    textAlign:'center'

  },
}))(TableCell);
class InvoiceTable extends React.Component {
  state={
  }
  componentDidMount = () => {
    moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });
  }
 

  render() {
    const { classes } = this.props;
    if (this.props.invoices.length===0) {
      return ( 
         <Typography className={classes.noItem} type="title" color="inherit">
             رکوردی ثبت نشده!  
      </Typography>)
    } else {
       return (
    <Paper className={classes.root}>
      
       {(this.props.filterType!=='factorItems')?(
         <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>نام خریدار</CustomTableCell>
            <CustomTableCell align="right">مبلغ</CustomTableCell>
            <CustomTableCell align="right">شماره فاکتور</CustomTableCell>
            <CustomTableCell align="right">زمان تحویل</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.invoices.map(row => (
            <TableRow key={row._id}>
              <CustomTableCell component="th" scope="row">
                {row.invoiceCustomer}
              </CustomTableCell>
              <CustomTableCell align="right">{numberWithoutCommas(row.totalPrice)}</CustomTableCell>
              <CustomTableCell align="right">{persianNumber(row.invoiceNumber)}</CustomTableCell>
              <CustomTableCell align="right">{moment(row.deliveryDate).format('dddd jDo jMMMM  hh a') }</CustomTableCell>
            </TableRow>
          ))}
        </TableBody></Table>)
        :(<Table className={classes.table}>
        <TableHead>
        <TableRow>
          <CustomTableCell>نام خریدار</CustomTableCell>
          <CustomTableCell align="center">نام محصول</CustomTableCell>
          <CustomTableCell align="center">شماره فاکتور</CustomTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {this.props.invoices.map(row => 
          <TableRow key={row._id}>
            <CustomTableCell component="th" scope="row">
              {row.invoiceCustomer}
            </CustomTableCell>
            <CustomTableCell align="center">{row.productName}</CustomTableCell>
            <CustomTableCell align="center">{persianNumber(row.invoiceNumber)}</CustomTableCell>
          </TableRow>
        )}
      </TableBody>
      </Table>
       )}   
    </Paper>
  );
    }
 
}
}
InvoiceTable.propTypes = {
  classes: PropTypes.object.isRequired,
  filterType:PropTypes.string.isRequired,
  invoices: PropTypes.array.isRequired,
};

export default withStyles(styles)(InvoiceTable);