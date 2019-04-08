import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Table from 'material-ui/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableCell from 'material-ui/Table/TableCell';
import TableHead from 'material-ui/Table/TableHead';
import TableRow from 'material-ui/Table/TableRow';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton'
import AddCircle  from 'material-ui-icons/AddCircle'
import RemoveCircle  from 'material-ui-icons/RemoveCircle'
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import NewProduct from '../../product/NewProduct'
import { connect } from 'react-redux';
import { fetchProducts,addProductRequest } from '../../product/productActions';
import { getProducts } from '../../product/productReducer';
import {numberWithoutCommas} from '../../helper/persianNumber'

const styles = theme => ({
  table: {    
    minWidth: 700,
    textAlign: 'center'
  },
  addProduct:{
    width: '25%',
  },
  row: {
    textAlign: 'center',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 100,
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 220,
  },
  rTable :{
  	display: 'block',
  	width: '100%',
},
rTableHeading:{
  clear: 'both',
}
, rTableBody:{
  clear: 'both',
}
, rTableFoot:{
  clear: 'both',
}, 
rTableRow:{
  	clear: 'both',
},
rTableHead:{
  backgroundColor:'#DDD',
  	// font: bold;
}, rTableFoot:{
  backgroundColor:'#DDD',
  	// font: bold;
},
rTableCell:{
  border: '1px solid #999999',
  display: 'inline-block',
  height: 17,
  overflow: 'hidden',
  padding: '3 1.8%',
  width: '32%',
}, rTableHead :{
  	border: '1px solid #999999',
  	display: 'inline-block',
  	height: 17,
  	overflow: 'hidden',
  	padding: '3 1.8%',
  	width: '32%',
}
// .rTable:after {
//   	visibility: hidden;
//   	display: block;
//   	font-size: 0;
//   	content: " ";
//   	clear: both;
//   	height: 0;
// }
})
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
class InvoiceItems extends Component {
  state={
    rows:[],
    selectedProduct:'',
    productAdded:false,
  }
  componentDidMount = () => {
    this.props.dispatch(fetchProducts());
    const firstRow={
      productId:'0',
      productName:'',
      count:1,
      price:null,
      totalPrice:null}
      if (this.props.rows.length===0) {
      this.state.rows.push(firstRow);         
      } else{
        this.setState({rows: this.props.rows });
      }            
  }
  handlepProductIdChange = productId => {
    this.state.selectedProduct=productId.toString();
  };
  getIndex = productId => {
    const index= this.state.rows.findIndex(x=>x.productId=== productId);
    return index;
  };
  handleProductChange = name => event => {
    const value=event.target.value;
    const index= this.state.rows.findIndex(x=>x.productId=== name);
    const ifExist= this.state.rows.findIndex(x=>x.productId=== value);
    if (ifExist!==-1) {
      return;
    }
    this.setState({ [name]: value });
    this.state.rows[index].productId=value;
    this.state.rows[index].productName=this.props.products.find(x=>x._id===value).name;
    this.state.rows[index].price=this.props.products.find(x=>x._id===value).price;
    this.state.rows[index].totalPrice=this.state.rows[index].price * this.state.rows[index].count;
    this.setState({rows: this.state.rows });
    this.props.updateTableDate(this.state.rows)
    this.handleClickNewRow();
  };
  selectedRowProductChange = (product) => {
    let addedProduct;
    this.setState({productAdded: true });
   this.props.dispatch(addProductRequest(product)).then(res=>{
    this.setState({productAdded: false });
    addedProduct=res.product;
    const index= this.state.rows.findIndex(x=>x.productId=== this.state.selectedProduct); 
    this.setState({ [index]: addedProduct._id });
    this.state.rows[index].productName=addedProduct.name;
    this.state.rows[index].productId=addedProduct._id;
    this.state.rows[index].price=addedProduct.price;
    this.state.rows[index].totalPrice=this.state.rows[index].price * this.state.rows[index].count;
    this.setState({rows: this.state.rows });
    this.props.updateTableDate(this.state.rows);
    this.handleClickNewRow();
   });
  };
  handleCountChange = name => event => {
    const index= this.state.rows.findIndex(x=>x.productId=== name);
    const value=event.target.value;
    if (value<1) {
      return
    }
    this.setState({ [name]: event.target.value });
    this.state.rows[index].count=value;
    this.state.rows[index].totalPrice=this.state.rows[index].price * this.state.rows[index].count;
  };
   handleClickNewRow = () => {
    const productId=this.state.rows[this.state.rows.length-1].productId;
    const newRow={
      productId:productId+0,
      productName:'',
      count:1,
      price:null,
      totalPrice:null};
      this.state.rows.push(newRow); 
      this.setState({rows: this.state.rows });
      this.props.updateTableDate(this.state.rows)

  }

  handleClickRemoveRow = productId => {
    const index= this.state.rows.findIndex(x=>x.productId=== productId); 
    this.state.rows.splice(index,1);
    this.setState({rows: this.state.rows });
    this.props.updateTableDate(this.state.rows)
   }
  render() {
    const {classes} = this.props
    return (
          <div>
            <Paper className={classes.root}>
                  {/* <Table className={classes.table}>
                   <TableHead>
                     <TableRow>
                      <CustomTableCell >محصول</CustomTableCell>
                      <CustomTableCell align="center">تعداد</CustomTableCell>
                      <CustomTableCell align="center">قیمت</CustomTableCell>
                      <CustomTableCell align="center">قیمت کل</CustomTableCell>
                      <CustomTableCell align="center">اضافه و پاک</CustomTableCell>
                    </TableRow>
                 </TableHead>
                 <TableBody>
                     {this.state.rows.map(row => (
                       <TableRow onClick={() =>this.handlepProductIdChange(row.productId.toString())} className={classes.row} key={row.productId}>
                          <CustomTableCell >

                          <Grid 
                          className={classes.addProduct} 
                           container spacing={8}>
                            <Grid item xs={6} sm={6}>
                            <NewProduct isLoading={this.state.productAdded}  selectedRowChange={this.selectedRowProductChange} />
                            </Grid>
                            <Grid item xs={6} sm={6}>
                              <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="product-native-simple"></InputLabel>
                                <Select
                                  native
                                  value={row.productId.toString()}
                                  onChange={this.handleProductChange(row.productId.toString())}
                                  inputProps={{
                                    name: row.productId.toString(),
                                    id: 'product-native-simple',
                                  }}
                                >
                                  <option value="" />
                                  {this.props.products.map(product => (
                                        <option key={product._id} value={product._id} >
                                          {product.name}
                                        </option>
                                  ))}
                                </Select>
                              </FormControl>

                            </Grid>                         
                          </Grid>                         
                          </CustomTableCell>
                          <CustomTableCell align="center">
                          <TextField
                                    id="standard-number"
                                    label="Count"
                                    value={this.state.count}
                                    onChange={this.handleCountChange(row.productId.toString())}
                                    type="number"
                                    defaultValue={1}
                                    className={classes.textField}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    inputProps={{
                                      name: row.productId.toString(),
                                    }}
                                    margin="normal"
                                  />
                          </CustomTableCell>
                          <CustomTableCell align="center">{ numberWithoutCommas(row.price)}</CustomTableCell>
                          <CustomTableCell align="center">{ numberWithoutCommas(row.totalPrice)}</CustomTableCell>
                          <CustomTableCell align="center">
                          <Grid container spacing={24}>
                            
                            { (this.state.rows.length-1===this.getIndex(row.productId) )?    
                                                     
                               (<Grid item xs={6} sm={6}>  
                                  <IconButton onClick={this.handleClickNewRow} aria-label="اضافه کردن ردیف" >
                                <AddCircle />
                               </IconButton>
                               </Grid>):
                               (<Grid item xs={6} sm={6}>  
                                </Grid> )
                            }
                            { (0!==this.getIndex(row.productId) || this.state.rows.length>1)?                           
                                <Grid item xs={6} sm={6}>
                               <IconButton onClick={() =>this.handleClickRemoveRow(row.productId.toString())} aria-label="پاک کردن ردیف" >
                                  <RemoveCircle />
                               </IconButton>
                              </Grid>   :
                               (<Grid item xs={6} sm={6}>  
                                </Grid> )
                            }                         
                                                
                          </Grid>
                  
                          </CustomTableCell>
                        </TableRow>
                    ))}
                  </TableBody>
              </Table> */}



<h2>Phone numbers</h2>
<div className={classes.rTable}>
<div className={classes.rTableRow}>
<div className={classes.rTableHead}><strong>Name</strong></div>
<div className={classes.rTableHead}><span >Telephone</span></div>
<div className={classes.rTableHead}>&nbsp;</div>
</div>
<div className={classes.rTableRow}>
<div className={classes.rTableCell}>John</div>
<div className={classes.rTableCell}><a href="tel:0123456785">0123 456 785</a></div>
<div className={classes.rTableCell}><img src="images/check.gif" alt="checked" /></div>
</div>
<div className={classes.rTableRow}>
<div className={classes.rTableCell}>Cassie</div>
<div className={classes.rTableCell}><a href="tel:9876532432">9876 532 432</a></div>
<div className={classes.rTableCell}><img src="images/check.gif" alt="checked" /></div>
</div>
</div>



       </Paper>
     </div> 
    )}
}
InvoiceItems.need = [() => { return fetchProducts(); }];
function mapStateToProps(state) {
  return {
    products: getProducts(state),
  };
}
InvoiceItems.propTypes = {
  classes: PropTypes.object.isRequired,
  products: PropTypes.array,
  updateTableDate: PropTypes.func.isRequired,
  rows:PropTypes.array.isRequired,
}

export default connect(mapStateToProps)( withStyles(styles)(InvoiceItems))
