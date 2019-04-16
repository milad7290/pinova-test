import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Footer from "./Footer";
import withFooter from "../helper/withFooter";
import Switch from "@material-ui/core/Switch";
const styles = theme => ({
  card: {
    flexGrow: 1,
    margin: 30,
    textAlign: "center"
  }
});
class Home extends Component {
  constructor(props) {
    super(props);
    // console.log('constructor');
  }

  // componentWillMount = () => {
  //   console.log('componentWillMount');
  // }
  // componentDidMount = () => {
  //   console.log('componentDidMount');

  // }
  // componentWillReceiveProps = () => {
  //   console.log('componentWillReceiveProps');

  // }
  // shouldComponentUpdate  = () => {
  //   console.log('shouldComponentUpdate');
  //     return true;
  // }
  // componentWillUpdate  = () => {
  //   console.log('componentWillUpdate');

  // }
  // componentDidUpdate  = () => {
  //   console.log('componentDidUpdate');

  // }
  // componentWillUnmount  = () => {
  //   console.log('componentWillUnmount');

  // }
  render() {
    // console.log('render');
    const { classes } = this.props;
    return (
      <div>
        <div>
          <Card className={classes.card}>
            <Grid container spacing={0}>
              <Grid item xs={6} sm={6}>
                <Link to="/invoice/add">
                  <Button>ثبت فاکتور جدید</Button>
                </Link>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Link to="/invoice/report">
                  <Button>گزارش فروش</Button>
                </Link>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);

// import React, {Component} from 'react'
// import PropTypes from 'prop-types'
// import {withStyles} from '@material-ui/core/styles'
// import Grid from '@material-ui/core/Grid'
// import Card from '@material-ui/core/Card';
// import {Link} from 'react-router-dom'
// import Button from '@material-ui/core/Button'
// import { connect } from 'react-redux';
// import { getSaved } from '../invoice/invoiceReducer'
// import { setSaved } from '../invoice/invoiceActions';
// import SimpleSnackbar from '../helper/SimpleSnackbar'
// const styles = theme => ({
//   card: {
//     flexGrow: 1,
//     margin: 30,
//     textAlign: 'center',
//   }
// })
// class Home extends Component {
//   constructor(props) {
//     super(props);
//     console.log('constructor');
//   }
//   state={
//     suggestionTitle: "Latest Products",
//     messageType:'suc',
//     message:'فاکتور با موفقیت اضافه شد',
//   }

//   componentWillMount = () => {
//     console.log('componentWillMount');
//   }
//   componentDidMount = () => {
//     console.log('componentDidMount');

//   }
//   componentWillReceiveProps = () => {
//     console.log('componentWillReceiveProps');

//   }
//   // shouldComponentUpdate  = () => {
//   //   console.log('shouldComponentUpdate');
//   //     return true;
//   // }
//   componentWillUpdate  = () => {
//     console.log('componentWillUpdate');

//   }
//   componentDidUpdate  = () => {
//     console.log('componentDidUpdate');

//   }
//   componentWillUnmount  = () => {
//     console.log('componentWillUnmount');

//   }
//   // getSnapshotBeforeUpdate=(prevProps, prevState)=>{
//   //   console.log('getSnapshotBeforeUpdate',prevProps,prevState);
//   //   return null

//   // }
//   // static getDerivedStateFromProps=(props, state)=>{
//   //   console.log('getDerivedStateFromProps',props,state);
//   //   return null

//   // }
//   handleClose=()=>{
//     this.props.dispatch(setSaved());
//   }
//   render() {
//     console.log('render');
//     const {classes} = this.props
//     return (
//       <div>
//             <div>
//             <Card className={classes.card}>
//               <Grid  container spacing={0}>
//                 <Grid item xs={6} sm={6}>
//                           <Link to="/invoice/addInvoice">
//                 <Button >ثبت فاکتور جدید</Button>
//               </Link>
//                 </Grid>
//                 <Grid item xs={6} sm={6}>
//                   <Link to="/invoice/report">
//                 <Button >گزارش فروش</Button>
//               </Link>
//                 </Grid>
//               </Grid>
//               </Card>
//             </div>
//             <SimpleSnackbar open={this.props.isSaved} close={this.handleClose}
//             message={this.state.message} messageType={this.state.messageType}/>
//         </div>
//     )
//   }
// }
// function mapStateToProps(state) {
//   return {
//     isSaved: getSaved(state),
//   };
// }
// Home.propTypes = {
//   classes: PropTypes.object.isRequired,
//   isSaved:PropTypes.bool,
// }

// export default connect(mapStateToProps)( withStyles(styles)(Home))
