import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
const styles = theme => ({
  card: {
    flexGrow: 1,
    margin: 30,
    textAlign: 'center',
  }
})
class Home extends Component {
  state={
    suggestionTitle: "Latest Products",
  }
  componentDidMount = () => {

  }
  render() {
    const {classes} = this.props
    return (
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
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
