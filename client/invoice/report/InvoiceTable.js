import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import moment from "moment-jalaali";
import { persianNumber, numberWithoutCommas } from "../../helper/persianNumber";

const styles = theme => ({
  noItem: {
    flexGrow: 1,
    margin: 30,
    textAlign: "center"
  },
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  rTable: {
    display: "block",
    width: "100%"
  },
  rTableHeading: {
    clear: "both"
  },
  rTableBody: {
    clear: "both"
  },
  rTableFoot: {
    clear: "both"
  },
  rTableRow: {
    clear: "both",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    backgroundColor: "#fafafa"
  },
  rTableHead: {
    backgroundColor: "#DDD"
  },
  rTableFoot: {
    backgroundColor: "#DDD"
  },
  rTableCell1: {
    display: "inline-block",
    height: 40,
    textAlign: "center",
    padding: "10px",
    width: "25%"
  },
  rTableHead1: {
    backgroundColor: "#3f51b5cc",
    color: "white",
    display: "inline-block",
    height: 40,
    textAlign: "center",
    padding: "9px 0px 0px 0px",
    width: "25%"
  },
  rTableCell2: {
    display: "inline-block",
    height: 40,
    textAlign: "center",
    padding: "10px",
    width: "20%"
  },
  rTableHead2: {
    backgroundColor: "#3f51b5cc",
    color: "white",
    display: "inline-block",
    height: 40,
    textAlign: "center",
    padding: "9px 0px 0px 0px",
    width: "20%"
  }
});
class InvoiceTable extends React.Component {
  state = {};
  componentDidMount = () => {
    moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
  };

  render() {
    const { classes } = this.props;
    if (this.props.invoices.length === 0) {
      return (
        <Typography className={classes.noItem} type="title" color="inherit">
          رکوردی ثبت نشده!
        </Typography>
      );
    } else {
      return (
        <Paper className={classes.root}>
          {this.props.filterType !== "factorItems" ? (
            <div className={classes.rTable}>
              <div className={classes.rTableRow}>
                <div className={classes.rTableHead1}>
                  <strong>نام خریدار</strong>
                </div>
                <div className={classes.rTableHead1}>
                  <strong>مبلغ</strong>
                </div>
                <div className={classes.rTableHead1}>
                  <strong>شماره فاکتور</strong>
                </div>
                <div className={classes.rTableHead1}>
                  <strong>زمان تحویل</strong>
                </div>
              </div>
              {this.props.invoices.map(row => (
                <div className={classes.rTableRow} key={row._id}>
                  <div className={classes.rTableCell1}>
                    {row.invoiceCustomer}
                  </div>
                  <div className={classes.rTableCell1}>
                    {numberWithoutCommas(row.totalPrice)}
                  </div>
                  <div className={classes.rTableCell1}>
                    {persianNumber(row.invoiceNumber)}
                  </div>
                  <div className={classes.rTableCell1}>
                    {moment(row.deliveryDate).format(
                      "dddd jDo jMMMM ساعت hh:mm"
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={classes.rTable}>
              <div className={classes.rTableRow}>
                <div className={classes.rTableHead2}>
                  <strong>نام خریدار</strong>
                </div>
                <div className={classes.rTableHead2}>
                  <strong>نام محصول</strong>
                </div>
                <div className={classes.rTableHead2}>
                  <strong>قیمت محصول</strong>
                </div>
                <div className={classes.rTableHead2}>
                  <strong>تعداد</strong>
                </div>
                <div className={classes.rTableHead2}>
                  <strong>شماره فاکتور</strong>
                </div>
              </div>
              {this.props.invoices.map(row => (
                <div className={classes.rTableRow} key={row._id}>
                  <div className={classes.rTableCell2}>
                    {row.invoiceCustomer}
                  </div>
                  <div className={classes.rTableCell2}>{row.productName}</div>
                  <div className={classes.rTableCell2}>
                    {numberWithoutCommas(row.price)}
                  </div>
                  <div className={classes.rTableCell2}>
                    {persianNumber(row.count)}
                  </div>
                  <div className={classes.rTableCell2}>
                    {persianNumber(row.invoiceNumber)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Paper>
      );
    }
  }
}

InvoiceTable.propTypes = {
  classes: PropTypes.object.isRequired,
  filterType: PropTypes.string.isRequired,
  invoices: PropTypes.array.isRequired
};

export default withStyles(styles)(InvoiceTable);
