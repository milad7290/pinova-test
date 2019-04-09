import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'
import {
  mdb
} from '../server'
import assert from 'assert';

const List = (req, res) => {
  const search = req.params.search;  
  let customers = [];
  var regex = new RegExp(".*" + search + ".*", "g");
  mdb.collection('customers').find({name: regex})
    .each((err, customer) => {
      assert.equal(null, err);

      if (!customer) { // no more customers
        res.send({
          customers
        });
        return;
      }

      customers.push(
        {'label': customer.name
        ,'value':customer._id});
    });
}


export default {
  List,
}