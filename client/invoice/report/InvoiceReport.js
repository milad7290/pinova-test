import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import TimeFilter from "./TimeFilter";
import FilterType from "./FilterType";
import InvoiceTable from "./InvoiceTable";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchInvoices,
  setReportDrwer,
  setReportPage
} from "../../invoice/invoiceActions";
import {
  getInvoices,
  getFilterType,
  getFilterTypeSearch,
  getFromDate,
  getToDate,
  getDrwerStatus,
  getReportPage
} from "../../invoice/invoiceReducer";
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  button: {
    margin: theme.spacing.unit,
    position: "absolute",
    bottom: 0,
    width: "90%",
    backgroundColor: "#3f51b5",
    color: "black"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 12,
    marginLeft: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  }
});

class InvoiceReport extends React.Component {
  now = new Date();
  state = {
    open: false,
    pageNumber: 0
  };

  componentDidMount = () => {
    window.addEventListener("scroll", this.handleOnScroll);
    const params = {
      from: "notSet",
      to: "notSet",
      page: 0,
      offset: this.props.filterType === "factorItems" ? 20 : 25
    };
    this.props.dispatch(fetchInvoices(params));
  };

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleOnScroll);
  };

  handleOnScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      const page = this.props.pageNumber;
      this.props.dispatch(setReportPage(page + 1));
      this.loadMore();
    }
  };

  handleDrawerOpen = () => {
    this.props.dispatch(setReportDrwer());
  };

  handleDrawerClose = () => {
    this.props.dispatch(setReportDrwer());
  };

  handleSearch = () => {
    this.props.dispatch(setReportPage(0));
    const params = {
      from: this.props.fromDate,
      to: this.props.toDate,
      page: 0,
      offset: this.props.filterType === "factorItems" ? 20 : 25
    };
    this.props.dispatch(fetchInvoices(params));
  };
  invoiceItems = () => {
    let items = [];
    this.props.invoices.map(invoice => {
      invoice.invoiceRows.map(row => {
        const item = {
          _id: invoice._id + row.productName + invoice.invoiceNumber,
          invoiceCustomer: invoice.invoiceCustomer,
          productName: row.productName,
          price: row.price,
          count: row.count,
          invoiceNumber: invoice.invoiceNumber
        };
        items.push(item);
      });
    });
    return items;
  };

  loadMore = () => {
    const params = {
      from: "notSet",
      to: "notSet",
      page: this.props.pageNumber,
      offset: this.props.filterType === "factorItems" ? 20 : 25
    };
    this.props.dispatch(fetchInvoices(params));
  };

  render() {
    const { classes, theme, open } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography color="inherit" noWrap>
              گزارش فروش
            </Typography>
            <Link to="/">
              <IconButton aria-label="Home">
                <HomeIcon />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <TimeFilter />
          <Divider />
          <FilterType />
          <Divider />
          <Button onClick={this.handleSearch} className={classes.button}>
            <SearchIcon
              className={classNames(classes.leftIcon, classes.iconSmall)}
            />
            جستجو
          </Button>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <InvoiceTable
            filterType={this.props.filterTypeSearch}
            invoices={
              this.props.filterTypeSearch === "factorItems"
                ? this.invoiceItems()
                : this.props.invoices
            }
          />
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    invoices: getInvoices(state),
    filterType: getFilterType(state),
    filterTypeSearch: getFilterTypeSearch(state),
    fromDate: getFromDate(state),
    toDate: getToDate(state),
    pageNumber: getReportPage(state),
    open: getDrwerStatus(state)
  };
}

InvoiceReport.propTypes = {
  invoices: PropTypes.array,
  filterType: PropTypes.string,
  filterTypeSearch: PropTypes.string,
  pageNumber: PropTypes.number,
  open: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(InvoiceReport)
);
