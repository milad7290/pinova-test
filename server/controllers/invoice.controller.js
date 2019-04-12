import _ from 'lodash'
import assert from 'assert';
// var ObjectID = require('mongodb').ObjectID;
import {
  ObjectID
} from 'mongodb'
import config from '../../config/config'
import errorHandler from './../helpers/dbErrorHandler'
import {
  mdb
} from '../server'
import * as fs from 'fs';


const iranStates = (req, res) => {
  fs.readFile('./server/assets/iranstates.json', 'utf8', (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send({
        iranStates: JSON.parse(data),
      })
    }
  });
}
const create = (req, res) => {
  const invoiceNumber = req.body.invoiceNumber;
  const invoiceCustomer = req.body.invoiceCustomer;
  const invoiceCustomerId = req.body.invoiceCustomerId;
  const invoiceRows = req.body.invoiceRows;
  const address = req.body.address;
  const postType = req.body.postType;
  const deliveryDate = req.body.deliveryDate;
  const totalPrice = req.body.totalPrice;
  const now = new Date();
  const timeAmount = parseInt(deliveryDate.timeAmount, 10);
  switch (deliveryDate.timeType) {
    case 'ساعت':
      now.setHours(now.getHours() + timeAmount);
      break;
    case 'روز':
      now.setDate(now.getDate() + timeAmount);
      break;
    case 'ماه':
      now.setMonth(now.getMonth() + timeAmount);
      break;

    default:
      break;
  }
  console.log('invoiceCustomerId', invoiceCustomerId)
  if (invoiceCustomerId && invoiceCustomerId !== '') {
    mdb.collection('invoices').insertOne({
      customerId: new ObjectID(invoiceCustomerId),
      invoiceNumber: invoiceNumber,
      invoiceCustomer: invoiceCustomer,
      invoiceRows: invoiceRows,
      totalPrice: totalPrice,
      address: address,
      postType: postType,
      deliveryDate: now,
      createdDate: new Date()
    }, (err, response) => {
      if (err) {
        console.error(err);
        res.status(404).send({
          error: 'Bad Request'
        });
      } else {
        res.send({
          addedInvoice: response.ops[0],
        })
      }
    })
  } else {
    mdb.collection('customers').insertOne({
        name: invoiceCustomer,
        createdDate: new Date()
      }).then(result => {
        mdb.collection('invoices').insertOne({
          customerId: result.ops[0]._id,
          invoiceNumber: invoiceNumber,
          invoiceCustomer: invoiceCustomer,
          invoiceRows: invoiceRows,
          totalPrice: totalPrice,
          address: address,
          postType: postType,
          deliveryDate: now,
          createdDate: new Date()
        }, (err, response) => {
          if (err) {
            console.error(err);
            res.status(404).send({
              error: 'Bad Request'
            });
          } else {
            res.send({
              addedInvoice: response.ops[0],
            })
          }
        })
      })
      .catch(error => {
        console.error(error);
        res.status(404).send('Bad Request');
      });
  }
}

const ListWithFilter = (req, res) => {
  const page = parseInt(req.params.page, 10);
  const offset = parseInt(req.params.offset, 10);
  let invoices = [];
  if (req.params.from === 'notSet' && req.params.to === 'notSet') {
    mdb.collection('invoices').find({})
      .skip(page * offset).limit(offset)
      .each((err, invoice) => {


        if (!invoice) {
          console.log('page', page, 'offset', offset)
          res.send({
            invoices
          });
          return;
        }
        invoices.push(invoice);
      });
  } else {
    const fromDate = new Date(req.params.from);
    const toDate = new Date(req.params.to);
    mdb.collection('invoices').find({
        createdDate: {
          $gte: fromDate,
          $lt: toDate,
        },
      }).skip(page * offset).limit(offset)
      .each((err, invoice) => {
        if (!invoice) {
          res.send({
            invoices
          });
          return;
        }
        invoices.push(invoice);
      });
  }
}
const List = (req, res) => {
  let invoices = [];
  mdb.collection('invoices').find({})
    .each((err, invoice) => {


      if (!invoice) {
        res.send({
          invoices
        });
        return;
      }
      invoices.push(invoice);
    });

}
const getNextInvoiceNumber = (req, res) => {
  let order = 1;
  mdb.collection('invoices')
    .find({})
    .sort({
      invoiceNumber: -1
    }).limit(1)
    .each((err, invoice) => {

      order = (invoice) ?
        invoice.invoiceNumber + 1 :
        res.send({
          order
        });

    });
  // .aggregate({
  //   $group: {
  //     _id: null,
  //     max: {
  //       $max: '$invoiceNumber'
  //     },
  //   },
  // }).next().
  // then(result => {
  // console.log('result', result);
  //   queryRes = result;
  // }).catch(err => {
  //   console.log(err);
  // });
  // const order = (queryRes) ? queryRes.max + 1 : 100100;
  // console.log('order', order, queryRes);
  // return res.send({
  //   order
  // });
}

const read = (req, res) => {
  return res.json(req.invoice)
}

export default {
  create,
  List,
  ListWithFilter,
  read,
  getNextInvoiceNumber,
  iranStates
}