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
import { fetchProducts, addProductRequest } from "../../product/productActions";
import { showSnack, hideSnack } from "../../helper/helperActions";
import { updateRow, setSelectedProduct } from "../step1/step1Actions";
import { getProducts } from "../../product/productReducer";
import { getRows, getSelectedProduct } from "../step1/step1Reducer";
import SimpleSnackbar from "../../helper/SimpleSnackbar";
import { numberWithoutCommas } from "../../helper/persianNumber";

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
  rTableCell: {
    margin: 0,
    display: "inline-block",
    height: 40,
    textAlign: "center",
    padding: "2%",
    width: "16%"
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
    this.props.dispatch(fetchProducts());
    const firstRow = {
      productId: "0",
      productName: "",
      count: 1,
      countRef: React.createRef(),
      price: null,
      totalPrice: null
    };
    if (this.props.rows.length === 0) {
      let rows = [...this.props.rows];
      rows.push(firstRow);
      this.props.dispatch(updateRow(rows));
    }
  };

  handlepProductIdChange = productId => {
    this.props.dispatch(setSelectedProduct(productId.toString()));
  };

  getIndex = productId => {
    const index = this.props.rows.findIndex(x => x.productId === productId);
    return index;
  };

  handleProductChange = name => event => {
    const value = event.target.value;
    const index = this.props.rows.findIndex(x => x.productId === name);
    const ifExist = this.props.rows.findIndex(x => x.productId === value);
    if (ifExist !== -1) {
      this.props.dispatch(showSnack("این کالا قبلا انتخاب شده است!", "war"));
      return;
    }
    let rows = [...this.props.rows];
    rows[index].productId = value;
    rows[index].productName = this.props.products.find(
      x => x._id === value
    ).name;
    rows[index].price = this.props.products.find(x => x._id === value).price;
    rows[index].totalPrice = rows[index].price * rows[index].count;
    this.props.dispatch(updateRow(rows));
    this.props.rows[index].countRef.current.focus();
    if (index === this.props.rows.length - 1) {
      this.handleClickNewRow();
    }
  };

  selectedRowProductChange = product => {
    let addedProduct;
    this.props.dispatch(addProductRequest(product)).then(res => {
      this.props.dispatch(showSnack("محصول با موفقیت اضافه شد", "suc"));
      addedProduct = res.product;
      const index = this.props.rows.findIndex(
        x => x.productId === this.props.selectedProduct
      );
      let rows = [...this.props.rows];
      rows[index].productName = addedProduct.name;
      rows[index].productId = addedProduct._id;
      rows[index].price = addedProduct.price;
      rows[index].totalPrice = rows[index].price * rows[index].count;
      this.props.dispatch(updateRow(rows));
      if (index === this.props.rows.length - 1) {
        this.handleClickNewRow();
      }
    });
  };

  handleCountChange = name => event => {
    const index = this.props.rows.findIndex(x => x.productId === name);
    const value = event.target.value;
    if (value < 1) {
      return;
    }
    let rows = [...this.props.rows];
    rows[index].count = value;
    rows[index].totalPrice = rows[index].price * rows[index].count;
    this.props.dispatch(updateRow(rows));
  };

  handleClickNewRow = () => {
    const productId = this.props.rows[this.props.rows.length - 1].productId;
    if (!this.props.rows[this.props.rows.length - 1].price) {
      this.props.dispatch(
        showSnack("برای اضافه کردن سطر جدید، اطلاعات ردیف را کامل کنید", "war")
      );
      return;
    }
    const newRow = {
      productId: productId + 0,
      productName: "",
      count: 1,
      countRef: React.createRef(),
      price: null,
      totalPrice: null
    };
    let rows = [...this.props.rows];
    rows.push(newRow);
    this.props.dispatch(updateRow(rows));
  };

  handleClickRemoveRow = productId => {
    let rows = [...this.props.rows];
    const index = rows.findIndex(x => x.productId === productId);
    rows.splice(index, 1);
    this.props.dispatch(updateRow(rows));
  };

  handleClose = () => {
    this.props.dispatch(hideSnack());
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
            {this.props.rows.map(row => (
              <div
                className={classes.rTableRow}
                onClick={() =>
                  this.handlepProductIdChange(row.productId.toString())
                }
                key={row.productId}
              >
                <div className={classes.rTableCell}>
                  <div className={classes.addProduct}>
                    <div>
                      <NewProduct
                        selectedRowChange={this.selectedRowProductChange}
                      />
                    </div>
                    <div>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="product-native-simple" />
                        <Select
                          native
                          value={row.productId.toString()}
                          onChange={this.handleProductChange(
                            row.productId.toString()
                          )}
                          inputProps={{
                            name: row.productId.toString(),
                            id: "product-native-simple"
                          }}
                        >
                          <option value="" />
                          {this.props.products.map(product => (
                            <option key={product._id} value={product._id}>
                              {product.name}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
                <div className={classes.rTableCell}>
                  <TextField
                    id="standard-number"
                    label="تعداد"
                    onChange={this.handleCountChange(row.productId.toString())}
                    type="number"
                    inputRef={row.countRef}
                    defaultValue={1}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }} // TODO syntax wrong ??
                    inputProps={{
                      name: row.productId.toString()
                    }}
                    margin="normal"
                    classes={{
                      root: classes.flexElement
                    }}
                  />
                </div>
                <div className={classes.rTableCell}>
                  {numberWithoutCommas(row.price)}
                </div>
                <div className={classes.rTableCell}>
                  {numberWithoutCommas(row.totalPrice)}
                </div>
                <div className={classes.rTableCell}>
                  <div className={classes.addProduct}>
                    {this.props.rows.length - 1 ===
                    this.getIndex(row.productId) ? (
                      <div>
                        <IconButton
                          onClick={this.handleClickNewRow}
                          aria-label="اضافه کردن ردیف"
                        >
                          <AddCircle />
                        </IconButton>
                      </div>
                    ) : (
                      <div />
                    )}
                    {0 !== this.getIndex(row.productId) ||
                    this.props.rows.length > 1 ? (
                      <div>
                        <IconButton
                          onClick={() =>
                            this.handleClickRemoveRow(row.productId.toString())
                          }
                          aria-label="پاک کردن ردیف"
                        >
                          <RemoveCircle />
                        </IconButton>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: getProducts(state) ? getProducts(state) : [],
    rows: getRows(state),
    selectedProduct: getSelectedProduct(state)
  };
}

InvoiceItems.propTypes = {
  classes: PropTypes.object.isRequired,
  products: PropTypes.array,
  rows: PropTypes.array,
  selectedProduct: PropTypes.string
};

export default connect(mapStateToProps)(withStyles(styles)(InvoiceItems));
