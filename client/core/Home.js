import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import withFooter from '../helper/withFooter'
import Switch from '@material-ui/core/Switch';
const styles = theme => ({
  card: {
    flexGrow: 1,
    margin: 30,
    textAlign: 'center',
  }
})
class Home extends Component {
  constructor(props) {
    super(props);
    console.log('constructor');
  }
  state={
    suggestionTitle: "Latest Products",
  }
  
  componentWillMount = () => {
    console.log('componentWillMount');
  }
  componentDidMount = () => {
    console.log('componentDidMount');

  }
  componentWillReceiveProps = () => {
    console.log('componentWillReceiveProps');

  }
  shouldComponentUpdate  = () => {
    console.log('shouldComponentUpdate');
      return true;
  }
  componentWillUpdate  = () => {
    console.log('componentWillUpdate');

  }
  componentDidUpdate  = () => {
    console.log('componentDidUpdate');

  }
  componentWillUnmount  = () => {
    console.log('componentWillUnmount');

  }
  // getSnapshotBeforeUpdate=(prevProps, prevState)=>{
  //   console.log('getSnapshotBeforeUpdate',prevProps,prevState);
  //   return null

  // }
  // static getDerivedStateFromProps=(props, state)=>{
  //   console.log('getDerivedStateFromProps',props,state);
  //   return null

  // }
  render() {
    console.log('render');
    const {classes} = this.props
    return (
      <div>
      <div>
      <Card className={classes.card}>
        <Grid  container spacing={0}>
          <Grid item xs={6} sm={6}>
                    <Link to="/invoice/addInvoice">
          <Button >ثبت فاکتور جدید</Button>
        </Link>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Link to="/invoice/report">
          <Button >گزارش فروش</Button>
        </Link>
          </Grid>
        </Grid>
        </Card>
      </div>
        {/* <footer>{(this.props.checked)?this.props.footerMessage:'vanished!'}
        <Switch
          checked={this.state.checkedB}
          onChange={this.props.change}
          value={this.props.checked}
          color="primary"
        />
        </footer> */}
        <footer>
     <div>
       <div>1</div>
       <div>2</div>
       <div>3</div>
     </div>
        </footer>
        </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withFooter( withStyles(styles)(Home))
