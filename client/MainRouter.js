import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Menu from './core/Menu'
import InvoiceReport from './invoice/report/InvoiceReport'
import NewInvoiceStepper from './invoice/NewInvoiceStepper'

class MainRouter extends Component {
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    return (<div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/invoice/addInvoice" component={NewInvoiceStepper}/>
        <Route path="/invoice/report" component={InvoiceReport}/>
      </Switch>
      {/* <Footer show={true}/> */}
    </div>)
  }
}

export default MainRouter
