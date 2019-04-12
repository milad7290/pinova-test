import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
// import { getSaved } from '../invoice/invoiceReducer';
import withFooter from '../helper/withFooter'
import Switch from '@material-ui/core/Switch';
const styles = theme => ({
  card: {
    flexGrow: 1,
    margin: 30,
    textAlign: 'center',
  }
})
class Footer extends React.PureComponent {

    render() {
      const { show } = this.props;
  
      if (show) {
          return (
        <footer>
          <h6>this is footer</h6>
          {/* <span>{ Math.round(score / total * 100) }%</span> */}
        </footer>
      )
      } 
    }
  
  }
// function mapStateToProps(state) {
//   return {
//     isSaved: getSaved(state),
//   };
// }
Footer.propTypes = {
    show:PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
}

// export default connect(mapStateToProps)( withStyles(styles)(Footer))
export default  withStyles(styles)(Footer)
