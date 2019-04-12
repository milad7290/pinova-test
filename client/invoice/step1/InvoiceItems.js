import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton'
import AddCircle  from '@material-ui/icons/AddCircle'
import RemoveCircle  from '@material-ui/icons/RemoveCircle'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import NewProduct from '../../product/NewProduct'
import { connect } from 'react-redux';
import { fetchProducts,addProductRequest } from '../../product/productActions';
import { getProducts } from '../../product/productReducer';
import SimpleSnackbar from '../../helper/SimpleSnackbar'
import {numberWithoutCommas} from '../../helper/persianNumber'

const styles = theme => ({
  table: {    
    minWidth: 700,
    textAlign: 'center'
  },
  addProduct:{
    display:'-webkit-inline-box',
  },
  row: {
    textAlign: 'center',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  textField: {
    margin:0,
    display: 'flex',
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    width: 100,
  },
  formControl: {
    display: 'flex',
    margin: 0,
    width: 120,
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
  borderBottom: '1px solid rgba(224, 224, 224, 1)',
  backgroundColor: '#fafafa'
},
rTableHead:{
  backgroundColor:'#DDD',
}, rTableFoot:{
  backgroundColor:'#DDD',
},
rTableCell:{
  margin:0,
  display: 'inline-block',
  height: 40,
  textAlign: 'center',
  padding: '2%',
  width: '16%',
}
,
flexElement: {
  display: 'flex !important',
},
rTableHead :{
  backgroundColor:'black',
  color:'white',
  	display: 'inline-block',
  	height: 40,
  	textAlign: 'center',
    padding: '9px 0px 0px 0px',
  	width: '20%',
}
})
class InvoiceItems extends PureComponent {
  state={
    rows:[],
    selectedProduct:'',
    productAdded:false,
    open:false,
    message:'',
    messageType:'',
  }
  componentDidMount = () => {
    this.props.dispatch(fetchProducts());
    const firstRow={
      productId:'0',
      productName:'',
      count:1,
      countRef:React.createRef(),
      price:null,
      totalPrice:null}
      if (this.props.rows.length===0) {
        let rows=[...this.state.rows]
        rows.push(firstRow);       
        this.setState({rows: rows });
      } else{
        this.setState({rows: this.props.rows });
      }            
  }
  handlepProductIdChange = productId => {
    this.state.selectedProduct=productId.toString();
  };
  handleClose = () => {
    this.setState({
      open:false,
    });
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
      this.setState(
        {
          open:true,
          message:'این کالا قبلا انتخاب شده است!',
          messageType:'war',
        });
      return;
    }
    this.setState({ [name]: value });
    let rows=[...this.state.rows]
    rows[index].productId=value;
    rows[index].productName=this.props.products.find(x=>x._id===value).name;
    rows[index].price=this.props.products.find(x=>x._id===value).price;
    rows[index].totalPrice=rows[index].price * rows[index].count;
    this.setState({rows: rows });
    this.props.updateTableDate(this.state.rows);
    console.log(this.state.rows,this.state.rows[index].countRef.current);
    this.state.rows[index].countRef.current.focus();
    if (index===this.state.rows.length-1) {  
    this.handleClickNewRow();
  }
  };
  selectedRowProductChange = (product) => {
    let addedProduct;
    this.setState({productAdded: true });
   this.props.dispatch(addProductRequest(product)).then(res=>{
    this.setState(
      {productAdded: false ,
        open:true,
        message:'محصول با موفقیت اضافه شد',
        messageType:'suc',
      });
    addedProduct=res.product;
    const index= this.state.rows.findIndex(x=>x.productId=== this.state.selectedProduct); 
    this.setState({ [index]: addedProduct._id });
    let rows=[...this.state.rows]
    rows[index].productName=addedProduct.name;
    rows[index].productId=addedProduct._id;
    rows[index].price=addedProduct.price;
    rows[index].totalPrice=rows[index].price * rows[index].count;
    this.setState({rows: rows });
    this.props.updateTableDate(this.state.rows);
      if (index===this.state.rows.length-1) {  
        this.handleClickNewRow();
      }
   });
  };
  handleCountChange = name => event => {
    const index= this.state.rows.findIndex(x=>x.productId=== name);
    const value=event.target.value;
    if (value<1) {
      return
    }
    this.setState({ [name]: event.target.value });
    let rows=[...this.state.rows]
    rows[index].count=value;
    rows[index].totalPrice=rows[index].price * rows[index].count;
    this.setState({rows: rows });
  };
   handleClickNewRow = () => {
    const productId=this.state.rows[this.state.rows.length-1].productId;
    if (!this.state.rows[this.state.rows.length-1].price) {
      this.setState(
        {
          open:true,
          message:'برای اضافه کردن سطر جدید، اطلاعات ردیف را کامل کنید',
          messageType:'war',
        });
      return;
    }
    const newRow={
      productId:productId+0,
      productName:'',
      count:1,
      countRef:React.createRef(),
      price:null,
      totalPrice:null};
      let rows=[...this.state.rows]
      rows.push(newRow); 
      this.setState({rows: rows });
      this.props.updateTableDate(this.state.rows)

  }

  handleClickRemoveRow = productId => {
    let rows=[...this.state.rows]
    const index= rows.findIndex(x=>x.productId=== productId); 
    rows.splice(index,1);
    this.setState({rows: rows });
    this.props.updateTableDate(this.state.rows)
   }
  render() {
    const {classes} = this.props
    return (
          <div>
            <Paper className={classes.root}>


                 <div className={classes.rTable}>
                      <div className={classes.rTableRow}>
                      <div className={classes.rTableHead}><strong>محصول</strong></div>
                      <div className={classes.rTableHead}><strong>تعداد</strong></div>
                      <div className={classes.rTableHead}><strong>قیمت</strong></div>
                      <div className={classes.rTableHead}><strong>قیمت کل</strong></div>
                      <div className={classes.rTableHead}><strong>اضافه و پاک</strong></div>
                 </div>
                     {this.state.rows.map(row => (
                       <div className={classes.rTableRow} onClick={() =>this.handlepProductIdChange(row.productId.toString())} key={row.productId}>
                              <div className={classes.rTableCell}>
                              <div 
                              className={classes.addProduct} 
                               >
                                <div >
                                <NewProduct isLoading={this.state.productAdded}  selectedRowChange={this.selectedRowProductChange} />
                                </div>
                                <div >
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

                                </div>                         
                              </div>                         
                              </div>
                              <div className={classes.rTableCell}>
                              <TextField
                                        id="standard-number"
                                        label="تعداد"
                                        value={this.state.count}
                                        onChange={this.handleCountChange(row.productId.toString())}
                                        type="number"
                                        inputRef={row.countRef} 
                                        defaultValue={1}
                                        className={classes.textField}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        inputProps={{
                                          name: row.productId.toString(),
                                        }}
                                        margin="normal"
                                        classes={{
                                          root: classes.flexElement,
                                        }}
                                      />
                              </div>
                              <div className={classes.rTableCell}>{ numberWithoutCommas(row.price)}</div>
                              <div className={classes.rTableCell}>{ numberWithoutCommas(row.totalPrice)}</div>
                              <div className={classes.rTableCell}>
                              <div className={classes.addProduct}  >
                                
                                { (this.state.rows.length-1===this.getIndex(row.productId) )?    
                                                        
                                  (<div >  
                                      <IconButton onClick={this.handleClickNewRow} aria-label="اضافه کردن ردیف" >
                                    <AddCircle />
                                  </IconButton>
                                  </div>):
                                  (<div >  
                                    </div> )
                                }
                                { (0!==this.getIndex(row.productId) || this.state.rows.length>1)?                           
                                    <div >
                                  <IconButton onClick={() =>this.handleClickRemoveRow(row.productId.toString())} aria-label="پاک کردن ردیف" >
                                      <RemoveCircle />
                                  </IconButton>
                                  </div>   :
                                  (<div >  
                                    </div> )
                                }                         
                                     <div>
                                            <SimpleSnackbar open={this.state.open} close={this.handleClose}
                                            message={this.state.message} messageType={this.state.messageType}/>
                                     </div>               
                              </div>
                      
                              </div>
                          </div>
                    ))}
              </div>              
       </Paper>
     </div> 
    )}
}
InvoiceItems.need = [() => { return fetchProducts(); }];
function mapStateToProps(state) {
  return {
    products: (getProducts(state))?getProducts(state):[],
  };
}
InvoiceItems.propTypes = {
  classes: PropTypes.object.isRequired,
  products: PropTypes.array,
  updateTableDate: PropTypes.func.isRequired,
  rows:PropTypes.array.isRequired,
}

export default connect(mapStateToProps)( withStyles(styles)(InvoiceItems))
