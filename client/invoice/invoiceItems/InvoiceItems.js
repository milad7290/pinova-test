import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import AddCircle from "@material-ui/icons/AddCircle";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import NewProduct from "../../product/NewProduct";
import { connect } from "react-redux";
import {
  fetchProducts,
  addProductRequest
} from "../../product/redux/productActions";
import { showSnack, hideSnack } from "../../helper/redux/helperActions";
import { updateRow, setSelectedProduct } from "../step1/redux/step1Actions";
import { getProducts } from "../../product/redux/productReducer";
import { getRows, getSelectedProduct } from "../step1/redux/step1Reducer";
import SimpleSnackbar from "../../helper/SimpleSnackbar";
import { numberWithoutCommas } from "../../helper/persianNumber";
import InvoiceItem from "./InvoiceItem";

const styles = theme => ({
  table: {
    minWidth: 700,
    textAlign: "center"
  },
  addProduct: {
    display: "-webkit-inline-box"
  },
  row: {
    textAlign: "center",
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  textField: {
    margin: 0,
    display: "flex",
    width: 100
  },
  formControl: {
    display: "flex",
    margin: 0,
    width: 120
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
  flexElement: {
    display: "flex !important"
  },
  rTableHead: {
    backgroundColor: "#3f51b5cc",
    color: "white",
    display: "inline-block",
    height: 40,
    textAlign: "center",
    padding: "9px 0px 0px 0px",
    width: "20%"
  }
});
// TODO this is wrong
//onClick={() =>this.handlepProductIdChange(row.productId.toString())} key={row.productId}
// create ROWITEM component instead of these componnents
class InvoiceItems extends PureComponent {
  state = {
    selectedProduct: ""
  };

  componentDidMount = () => {
    this.props.fetchProducts();
    const firstRow = {
      productId: "0",
      productName: "",
      count: 1,
      price: null,
      totalPrice: null
    };
    if (this.props.invoiceRows.length === 0) {
      let rows = [...this.props.invoiceRows];
      rows.push(firstRow);
      this.props.updateRow(rows);
    }
  };

  handlepProductIdChange = productId => {
    // this.props.setSelectedProduct(productId.toString());
    this.setState({
      selectedProduct: productId.toString()
    });
  };

  getIndex = productId => {
    const index = this.props.invoiceRows.findIndex(
      x => x.productId === productId
    );
    return index;
  };

  handleProductChange = name => event => {
    const value = event.target.value;
    const index = this.props.invoiceRows.findIndex(x => x.productId === name);
    const ifExist = this.props.invoiceRows.findIndex(
      x => x.productId === value
    );
    if (ifExist !== -1) {
      this.props.showSnack("این کالا قبلا انتخاب شده است!", "war");
      return;
    }
    let rows = [...this.props.invoiceRows];
    rows[index].productId = value;
    rows[index].productName = this.props.products.find(
      x => x._id === value
    ).name;
    rows[index].price = this.props.products.find(x => x._id === value).price;
    rows[index].totalPrice = rows[index].price * rows[index].count;
    this.props.updateRow(rows);
    if (index === this.props.invoiceRows.length - 1) {
      this.handleClickNewRow();
    }
  };

  selectedRowProductChange = product => {
        let rows = [...this.props.invoiceRows];
    this.props.addProductRequest(product, rows,this.state.selectedProduct);
    // this.props.showSnack("محصول با موفقیت اضافه شد", "suc");
    // addedProduct = this.props.products[this.props.products.length];
    // const index = this.props.invoiceRows.findIndex(
    //   x => x.productId === this.state.selectedProduct
    // );
    // rows[index].productName = addedProduct.name;
    // rows[index].productId = addedProduct._id;
    // rows[index].price = addedProduct.price;
    // rows[index].totalPrice = rows[index].price * rows[index].count;
    // this.props.updateRow(rows);
    // if (index === this.props.invoiceRows.length - 1) {
    //   this.handleClickNewRow();
    // }
  };

  handleCountChange = name => event => {
    const index = this.props.invoiceRows.findIndex(x => x.productId === name);
    const value = event.target.value;
    if (value < 1) {
      return;
    }
    let rows = [...this.props.invoiceRows];
    rows[index].count = value;
    rows[index].totalPrice = rows[index].price * rows[index].count;
    this.props.updateRow(rows);
  };

  handleClickNewRow = () => {
    const productId = this.props.invoiceRows[this.props.invoiceRows.length - 1]
      .productId;
    if (!this.props.invoiceRows[this.props.invoiceRows.length - 1].price) {
      this.props.showSnack(
        "برای اضافه کردن سطر جدید، اطلاعات ردیف را کامل کنید",
        "war"
      );

      return;
    }
    const newRow = {
      productId: productId + 0,
      productName: "",
      count: 1,
      price: null,
      totalPrice: null
    };
    let rows = [...this.props.invoiceRows];
    rows.push(newRow);
    this.props.updateRow(rows);
  };

  handleClickRemoveRow = productId => {
    let rows = [...this.props.invoiceRows];
    const index = rows.findIndex(x => x.productId === productId);
    rows.splice(index, 1);
    this.props.updateRow(rows);
  };

  handleClose = () => {
    this.props.hideSnack();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <div className={classes.rTable}>
            <div className={classes.rTableRow}>
              <div className={classes.rTableHead}>
                <strong>محصول</strong>
              </div>
              <div className={classes.rTableHead}>
                <strong>تعداد</strong>
              </div>
              <div className={classes.rTableHead}>
                <strong>قیمت</strong>
              </div>
              <div className={classes.rTableHead}>
                <strong>قیمت کل</strong>
              </div>
              <div className={classes.rTableHead}>
                <strong>اضافه و پاک</strong>
              </div>
            </div>
            {this.props.invoiceRows.map(row => (
              <InvoiceItem
                key={row.productId}
                products={this.props.products}
                invoiceRows={this.props.invoiceRows}
                row={row}
                ProductIdChange={this.handlepProductIdChange}
                ProductChange={this.handleProductChange}
                CountChange={this.handleCountChange}
                ClickRemoveRow={this.handleClickRemoveRow}
                ClickNewRow={this.handleClickNewRow}
                getIndex={this.getIndex}
                isLoadingProduct={this.props.isLoadingProduct}
                selectedRowProductChange={this.selectedRowProductChange}
              />
            ))}
          </div>
        </Paper>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     products: getProducts(state) ? getProducts(state) : [],
//     rows: getRows(state),
//     selectedProduct: getSelectedProduct(state)
//   };
// }

InvoiceItems.propTypes = {
  classes: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  invoiceRows: PropTypes.array.isRequired,
  // selectedProduct: PropTypes.string.isRequired,
  updateRow: PropTypes.func.isRequired,
  // setSelectedProduct: PropTypes.func.isRequired,
  showSnack: PropTypes.func.isRequired,
  addProductRequest: PropTypes.func.isRequired,
  hideSnack: PropTypes.func.isRequired
};

export default withStyles(styles)(InvoiceItems);
