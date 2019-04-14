import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Test from './core/Test'
import Menu from './core/Menu'
import InvoiceReport from './invoice/report/InvoiceReport'
import NewInvoiceStepper from './invoice/NewInvoiceStepper'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SimpleSnackbar from './helper/SimpleSnackbar'
import { 
 getSnackInfo,
 } from './helper/helperReducer';
 import { 
  hideSnack,
  } from './helper/helperActions';
class MainRouter extends Component {
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }
  handleClose = () => {
    this.props.dispatch(hideSnack());
  };

  render() {
    return (
    <div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/invoice/addInvoice" component={NewInvoiceStepper}/>
        <Route path="/invoice/report" component={InvoiceReport}/>
      </Switch>
      {/* <SimpleSnackbar open={this.props.snackInfo.open} close={this.handleClose}
         message={this.props.snackInfo.message} messageType={this.props.snackInfo.type}/> */}
    </div>)
  }
}
// function mapStateToProps(state) {
//   return {
//     snackInfo: getSnackInfo(state),
//   };
// }
// MainRouter.propTypes = {
//   snackInfo: PropTypes.object,
// }
// export default connect(mapStateToProps)( MainRouter)
export default  MainRouter
