import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Footer from './Footer'
import withFooter from '../helper/withFooter'
import Switch from '@material-ui/core/Switch';
const styles = theme => ({
  paper:{
    width: '90%',
    margin: 'auto',
  },
  textField: {
    margin:0,
    display: 'flex',
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    width: '100%',
  },
  formControl: {
    display: 'flex',
    margin: 0,
    width: '100%',
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
  width: '37%',
},
rTableCellFirst:{
  margin:0,
  display: 'inline-block',
  height: 40,
  textAlign: 'center',
  padding: '2%',
  width: '14%',
}
,
flexElement: {
  display: 'flex !important',
},
rTableHead :{
  backgroundColor:'#3f51b5cc',
  color:'white',
  	display: 'inline-block',
  	height: 40,
  	textAlign: 'center',
    padding: '9px 2% 0px 2%',
  	width: '37%',
},
rTableHeadFirst :{
  backgroundColor:'#3f51b5cc',
  color:'white',
  	display: 'inline-block',
  	height: 40,
  	textAlign: 'center',
    padding: '9px 2% 0px 2%',
  	width: '14%',
}
})
class Home extends Component {
  constructor(props) {
    super(props);
    console.log('constructor');
  }
  state={
    nameMale:'',
    nameFemale:'',
  }
  handleChange=name => (event, { newValue }) => {
    this.setState(
      {
        [name]:newValue
      })
  }
  clickBtn=()=>{
    // this.setState({suggestionTitle:'assdsds'})
  }
  render() {
    console.log('render');
    const {classes} = this.props
    return (
      <div>
          <div>
            <Paper className={classes.root}>
              <div className={classes.rTable}>
                  <div className={classes.rTableRow}>
                    <div className={classes.rTableHeadFirst}><strong> مشخصات</strong></div>
                    <div className={classes.rTableHead}><strong>مشخصات مرد</strong></div>
                    <div className={classes.rTableHead}><strong>مشخصات زن</strong></div>
                </div>

                    <div className={classes.rTableRow}  >
                    <div className={classes.rTableCellFirst}>نام</div>
                        <div className={classes.rTableCell}>
                          <TextField
                                    id="standard-number"
                                    value={this.state.nameMale}
                                    onChange={this.handleChange('nameMale')}
                                    type="text"                                    
                                    className={classes.textField}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    inputProps={{
                                      name: 'nameMale',
                                    }}
                                    margin="normal"
                                    classes={{
                                      root: classes.flexElement,
                                    }}
                                  />
                          </div>
                          <div className={classes.rTableCell}>
                          <TextField
                                    id="standard-number"
                                    value={this.state.nameFemale}
                                    onChange={this.handleChange('nameFemale')}
                                    type="text"                                    
                                    className={classes.textField}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    inputProps={{
                                      name: 'nameFemale',
                                    }}
                                    margin="normal"
                                    classes={{
                                      root: classes.flexElement,
                                    }}
                                  />
                          </div>
                      </div>
                
              </div>              
              </Paper>
          </div>
          {/* <div >
          <Button onClick={this.clickBtn} >click me</Button>
          </div> */}
          {/* <Footer show={true}/> */}
        </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default  withStyles(styles)(Home)

