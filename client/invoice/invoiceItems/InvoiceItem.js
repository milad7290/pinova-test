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
class InvoiceItem extends PureComponent {

  render() {
    const { classes } = this.props;
    return (
      <div
        className={classes.rTableRow}
        onClick={() => this.props.ProductIdChange(this.props.row.productId.toString())}
        
      >
        <div className={classes.rTableCell}>
          <div className={classes.addProduct}>
            <div>
              <NewProduct 
              selectedRowChange={this.props.selectedRowProductChange}
              isLoading={this.props.isLoadingProduct}
               />
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="product-native-simple" />
                <Select
                  native
                  value={this.props.row.productId.toString()}
                  onChange={this.props.ProductChange(this.props.row.productId.toString())}
                  inputProps={{
                    name: this.props.row.productId.toString(),
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
            onChange={this.props.CountChange(this.props.row.productId.toString())}
            type="number"
            defaultValue={1}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }} // TODO syntax wrong ??
            inputProps={{
              name: this.props.row.productId.toString()
            }}
            margin="normal"
            classes={{
              root: classes.flexElement
            }}
          />
        </div>
        <div className={classes.rTableCell}>
          {numberWithoutCommas(this.props.row.price)}
        </div>
        <div className={classes.rTableCell}>
          {numberWithoutCommas(this.props.row.totalPrice)}
        </div>
        <div className={classes.rTableCell}>
          <div className={classes.addProduct}>
            {this.props.invoiceRows.length - 1 ===
            this.props.getIndex(this.props.row.productId) ? (
              <div>
                <IconButton
                  onClick={this.props.ClickNewRow}
                  aria-label="اضافه کردن ردیف"
                >
                  <AddCircle />
                </IconButton>
              </div>
            ) : (
              <div />
            )}
            {0 !== this.props.getIndex(this.props.row.productId) ||
            this.props.invoiceRows.length > 1 ? (
              <div>
                <IconButton
                  onClick={() =>
                    this.props.ClickRemoveRow(this.props.row.productId.toString())
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
    );
  }
}
InvoiceItem.propTypes = {
  classes: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  ProductIdChange:PropTypes.func.isRequired,
  ProductChange:PropTypes.func.isRequired,
  CountChange:PropTypes.func.isRequired,
  ClickRemoveRow:PropTypes.func.isRequired,
  ClickNewRow:PropTypes.func.isRequired,
  getIndex:PropTypes.func.isRequired,
  row:PropTypes.object.isRequired,
  isLoadingProduct:PropTypes.bool.isRequired,
  selectedRowProductChange:PropTypes.func.isRequired,
};

export default withStyles(styles)(InvoiceItem);
